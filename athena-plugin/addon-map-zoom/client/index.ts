import * as alt from "alt-client";
import * as native from "natives";
import { MapZoomEvent } from "../shared/events";

let radarZoomLevel: number = 1100;
let tickInterval: number;
const player = alt.Player.local;

class AddonMapZoomClient {

  /**
   * initialization of the instance goes here
   */
  constructor() { }

  /**
   * initilization of the client script
   */
  static init(): void {

    this.setMapZoomDataLevel('ZOOM_LEVEL_0', 0.96, 0.9, 0.08, 0.0, 0.0);
    this.setMapZoomDataLevel('ZOOM_LEVEL_1', 1.6, 0.9, 0.08, 0.0, 0.0);
    this.setMapZoomDataLevel('ZOOM_LEVEL_2', 8.6, 0.9, 0.08, 0.0, 0.0);
    this.setMapZoomDataLevel('ZOOM_LEVEL_3', 12.3, 0.9, 0.08, 0.0, 0.0);
    this.setMapZoomDataLevel('ZOOM_LEVEL_4', 22.3, 0.9, 0.08, 0.0, 0.0);
    this.setMapZoomDataLevel('ZOOM_LEVEL_GOLF_COURSE', 55.0, 0.0, 0.1, 2.0, 1.0);
    this.setMapZoomDataLevel('ZOOM_LEVEL_INTERIOR', 450.0, 0.0, 0.1, 1.0, 1.0);
    this.setMapZoomDataLevel('ZOOM_LEVEL_GALLERY', 4.5, 0.0, 0.0, 0.0, 0.0);
    this.setMapZoomDataLevel('ZOOM_LEVEL_GALLERY_MAXIMIZE', 11.0, 0.0, 0.0, 2.0, 3.0);

    tickInterval = alt.setInterval(() => {
      try {
        // update radar zoom level on every tick
        this.updateRadarZoomLevel();
      } catch (e) {
        console.error(e);
        // stop the interval if there is an error
        alt.clearInterval(tickInterval);
      }
    }, 1);

    // listen event from server
    alt.onServer(MapZoomEvent.RADAR_ZOOM, this.setRadarZoomLevel);
  }

  /**
  * setMapZoomDataLevel used to modify map zoom level
  */
  private static setMapZoomDataLevel(level: string, zoomScale: number, zoomSpeed: number, scrollSpeed: number, tilesX: number, tilesY: number) {
    const zoomData = alt.MapZoomData.get(level);
    zoomData.fZoomScale = zoomScale;
    zoomData.fZoomSpeed = zoomSpeed;
    zoomData.fScrollSpeed = scrollSpeed;
    zoomData.vTilesX = tilesX;
    zoomData.vTilesY = tilesY;
  }

  private static setRadarZoomLevel(level: string) {
    const [ok, intLevel] = native.stringToInt(level);
    if (ok) {
      radarZoomLevel = intLevel;
    } else {
      console.log('invalid zoom level');
    }
  }

  private static updateRadarZoomLevel() {
    const insideVehicle = native.isPedInAnyVehicle(player, false);
    const onFoot = native.isPedOnFoot(player);

    // set radar zoom
    if (onFoot || insideVehicle) {
      native.setRadarZoom(radarZoomLevel);
    }
  }
}

AddonMapZoomClient.init();
