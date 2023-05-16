import * as alt from "alt-client";
import * as native from "natives";
import * as Athena from '@AthenaClient/api';
import { EventConstants } from "../shared/constants";
import { PluginConfig, zoomDataLevels } from "../shared/config";
import { MapZoomConfig } from "../shared/types/MapZoomConfig";

const pluginAutors = PluginConfig.AUTHORS.length > 1
  ? `${PluginConfig.AUTHORS.splice(0, -1).join(', ')} and ${PluginConfig.AUTHORS.splice(-1)}`
  : PluginConfig.AUTHORS[0];
alt.log(`[PLUGIN]: The ~lg~${PluginConfig.NAME} v${PluginConfig.VERSION} ~w~by ~lg~${pluginAutors} ~w~has been loaded!`);

let radarZoomLevel: number = 1100;
let tickInterval: number;
const player = alt.Player.local;

/**
 * initilization of the client script goes here
 */
function init(): void {
  // set map zoom level
  zoomDataLevels.forEach(setMapZoomDataLevel);

  tickInterval = alt.setInterval(() => {
    try {
      // update radar zoom level on every tick
      updateRadarZoomLevel();
    } catch (e) {
      console.error(e);
      // stop the tickInterval if there is an error
      alt.clearInterval(tickInterval);
    }
  }, 100);

  // listen event from server
  alt.onServer(EventConstants.RADAR_ZOOM_EVENT, setRadarZoomLevel);
}

/**
 * setMapZoomDataLevel used to modify map zoom level
 * @param zoomDataConfig 
 */
function setMapZoomDataLevel(zoomDataConfig: MapZoomConfig): void {
  const zoomData = alt.MapZoomData.get(zoomDataConfig.level);
  zoomData.fZoomScale = zoomDataConfig.zoomScale;
  zoomData.fZoomSpeed = zoomDataConfig.zoomSpeed;
  zoomData.fScrollSpeed = zoomDataConfig.scrollSpeed;
  zoomData.vTilesX = zoomDataConfig.tilesX;
  zoomData.vTilesY = zoomDataConfig.tilesY;
}

/**
 * setRadarZoomLevel used set the level of radar zoom variable
 * @param level level applied to radar zoom
 */
function setRadarZoomLevel(level: string): void {
  const [ok, intLevel] = native.stringToInt(level);
  if (ok && intLevel >= 0 && intLevel <= 1400) {
    radarZoomLevel = intLevel;
  } else {
    const msg = `Invalid zoom level parameter! Required integer between 0 to 1400, given '${level}'`;
    console.error(msg);
    Athena.systems.messenger.emit(msg);
  }
}

/**
 * updateRadarZoomLevel used to update radar/minimap zoom level
 */
function updateRadarZoomLevel(): void {
  const insideVehicle = native.isPedInAnyVehicle(player, false);
  const onFoot = native.isPedOnFoot(player);

  // set radar zoom
  if (onFoot || insideVehicle) {
    native.setRadarZoom(radarZoomLevel);
  }
}

// trigger script initialization
init();