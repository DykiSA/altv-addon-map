import * as alt from "alt-client";
import * as native from "natives";

console.log('The addon-map-zoom client script has been loaded');

const player = alt.Player.local;
const radarZoomLevel = 1100;
let tickInterval;

// update map zoom level
setMapZoomDataLevel('ZOOM_LEVEL_0', 0.96, 0.9, 0.08, 0.0, 0.0);
setMapZoomDataLevel('ZOOM_LEVEL_1', 1.6, 0.9, 0.08, 0.0, 0.0);
setMapZoomDataLevel('ZOOM_LEVEL_2', 8.6, 0.9, 0.08, 0.0, 0.0);
setMapZoomDataLevel('ZOOM_LEVEL_3', 12.3, 0.9, 0.08, 0.0, 0.0);
setMapZoomDataLevel('ZOOM_LEVEL_4', 22.3, 0.9, 0.08, 0.0, 0.0);
setMapZoomDataLevel('ZOOM_LEVEL_GOLF_COURSE', 55.0, 0.0, 0.1, 2.0, 1.0);
setMapZoomDataLevel('ZOOM_LEVEL_INTERIOR', 450.0, 0.0, 0.1, 1.0, 1.0);
setMapZoomDataLevel('ZOOM_LEVEL_GALLERY', 4.5, 0.0, 0.0, 0.0, 0.0);
setMapZoomDataLevel('ZOOM_LEVEL_GALLERY_MAXIMIZE', 11.0, 0.0, 0.0, 2.0, 3.0);

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
}, 1);


/**
 * setMapZoomDataLevel used to modify map zoom level
 * @param {string} level 
 * @param {number} zoomScale 
 * @param {number} zoomSpeed 
 * @param {number} scrollSpeed 
 * @param {number} tilesX 
 * @param {number} tilesY 
 */
function setMapZoomDataLevel(level, zoomScale, zoomSpeed, scrollSpeed, tilesX, tilesY) {
  const zoomData = alt.MapZoomData.get(level);
  zoomData.fZoomScale = zoomScale;
  zoomData.fZoomSpeed = zoomSpeed;
  zoomData.fScrollSpeed = scrollSpeed;
  zoomData.vTilesX = tilesX;
  zoomData.vTilesY = tilesY;
}

/**
 * updateRadarZoomLevel used to update radar/minimap zoom level
 */
function updateRadarZoomLevel() {
  const insideVehicle = native.isPedInAnyVehicle(player, false);
  const onFoot = native.isPedOnFoot(player);

  // set radar zoom
  if (onFoot || insideVehicle) {
    native.setRadarZoom(radarZoomLevel);
  }
}
