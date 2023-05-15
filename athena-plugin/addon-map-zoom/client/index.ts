import * as alt from "alt-client";
import * as native from "natives";
import { EventConstants } from "../shared/constants";
import { ZoomDataLevels } from "../shared/config";
import { MapZoomConfig } from "../shared/types/MapZoomConfig";

let radarZoomLevel: number = 1100;
let tickInterval: number;
const player = alt.Player.local;

/**
 * initilization of the client script goes here
 */
function init(): void {
  // set map zoom level
  ZoomDataLevels.forEach(setMapZoomDataLevel);

  tickInterval = alt.setInterval(() => {
    try {
      // update radar zoom level on every tick
      updateRadarZoomLevel();
    } catch (e) {
      console.error(e);
      // stop the tickInterval if there is an error
      alt.clearInterval(tickInterval);
    }
  }, 1);

  // listen event from server
  alt.onServer(EventConstants.RADAR_ZOOM_EVENT, setRadarZoomLevel);
}

/**
* setMapZoomDataLevel used to modify map zoom level
*/
function setMapZoomDataLevel(zoomDataConfig: MapZoomConfig): void {
  const zoomData = alt.MapZoomData.get(zoomDataConfig.level);
  zoomData.fZoomScale = zoomDataConfig.zoomScale;
  zoomData.fZoomSpeed = zoomDataConfig.zoomSpeed;
  zoomData.fScrollSpeed = zoomDataConfig.scrollSpeed;
  zoomData.vTilesX = zoomDataConfig.tilesX;
  zoomData.vTilesY = zoomDataConfig.tilesY;
}

function setRadarZoomLevel(level: string): void {
  const [ok, intLevel] = native.stringToInt(level);
  if (ok) {
    radarZoomLevel = intLevel;
  } else {
    console.log(`Invalid zoom level! Required integer between 0 and 1400, received '${level}'`);
  }
}

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