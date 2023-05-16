import * as alt from "alt-client";
import * as native from "natives";
import * as chat from 'alt:chat';
import { PluginConfig, zoomDataLevels } from "../shared/config.js";
import { EventConstants } from "../shared/constants.js";

const pluginAutors = PluginConfig.AUTHORS.length > 1
  ? `${PluginConfig.AUTHORS.splice(0, -1).join(', ')} and ${PluginConfig.AUTHORS.splice(-1)}`
  : PluginConfig.AUTHORS[0];
alt.log(`[PLUGIN]: The ~lg~${PluginConfig.NAME} v${PluginConfig.VERSION} ~w~by ~lg~${pluginAutors} ~w~has been loaded!`);

let radarZoomLevel = 1100;
let tickInterval;
const player = alt.Player.local;

// update map zoom level
zoomDataLevels.forEach(setMapZoomDataLevel);

// listen event from server
alt.onServer(EventConstants.RADAR_ZOOM_EVENT, setRadarZoomLevel);

// start interval
tickInterval = alt.setInterval(() => {
  try {
    // update radar zoom level on every tick
    updateRadarZoomLevel();
  } catch (e) {
    console.error(e);
    // stop the interval if there is an error
    alt.clearInterval(tickInterval);
  }
}, 100);


/**
 * setMapZoomDataLevel used to modify map zoom level
 * @param {import("../shared/types/index").MapZoomConfig} mapZoomConfig 
 */
function setMapZoomDataLevel(mapZoomConfig) {
  const zoomData = alt.MapZoomData.get(mapZoomConfig.level);
  zoomData.fZoomScale = mapZoomConfig.zoomScale;
  zoomData.fZoomSpeed = mapZoomConfig.zoomSpeed;
  zoomData.fScrollSpeed = mapZoomConfig.scrollSpeed;
  zoomData.vTilesX = mapZoomConfig.tilesX;
  zoomData.vTilesY = mapZoomConfig.tilesY;
}

/**
 * setRadarZoomLevel used set the level of radar zoom variable
 * @param {string} level level applied to radar zoom
 */
function setRadarZoomLevel(level) {
  const [ok, intLevel] = native.stringToInt(level);
  if (ok && intLevel >= 0 && intLevel <= 1400) {
    radarZoomLevel = intLevel;
  } else {
    const msg = `Invalid zoom level parameter! Required integer between 0 to 1400, given '${level}'`;
    console.error(msg);
    chat.pushMessage(null, msg);
  }
}

/**
 * updateRadarZoomLevel used to update radar/minimap zoom level
 */
function updateRadarZoomLevel() {
  const insideVehicle = native.isPedInAnyVehicle(player, false);
  const onFoot = native.isPedOnFoot(player);

  // set radar zoom
  if (onFoot || insideVehicle) {
    console.log('update radar zoom level to:', radarZoomLevel)
    native.setRadarZoom(radarZoomLevel);
  }
}
