export const PluginConfig = {
  NAME: 'Addon Map Zoom',
  VERSION: '1.0.1',
  AUTHORS: ['DykiSA'],
}

/**
 * @type {Array.<import("./types/index").MapZoomConfig>}
 */
export const zoomDataLevels = [
  {
    level: 'ZOOM_LEVEL_0',
    zoomScale: 0.96,
    zoomSpeed: 0.9,
    scrollSpeed: 0.08,
    tilesX: 0.0,
    tilesY: 0.0,
  },
  {
    level: 'ZOOM_LEVEL_1',
    zoomScale: 1.6,
    zoomSpeed: 0.9,
    scrollSpeed: 0.08,
    tilesX: 0.0,
    tilesY: 0.0,
  },
  {
    level: 'ZOOM_LEVEL_2',
    zoomScale: 8.6,
    zoomSpeed: 0.9,
    scrollSpeed: 0.08,
    tilesX: 0.0,
    tilesY: 0.0,
  },
  {
    level: 'ZOOM_LEVEL_3',
    zoomScale: 12.3,
    zoomSpeed: 0.9,
    scrollSpeed: 0.08,
    tilesX: 0.0,
    tilesY: 0.0,
  },
  {
    level: 'ZOOM_LEVEL_4',
    zoomScale: 22.3,
    zoomSpeed: 0.9,
    scrollSpeed: 0.08,
    tilesX: 0.0,
    tilesY: 0.0,
  },
  {
    level: 'ZOOM_LEVEL_GOLF_COURSE',
    zoomScale: 55.0,
    zoomSpeed: 0.0,
    scrollSpeed: 0.1,
    tilesX: 2.0,
    tilesY: 1.0,
  },
  {
    level: 'ZOOM_LEVEL_INTERIOR',
    zoomScale: 450.0,
    zoomSpeed: 0.0,
    scrollSpeed: 0.1,
    tilesX: 1.0,
    tilesY: 1.0,
  },
  {
    level: 'ZOOM_LEVEL_GALLERY',
    zoomScale: 4.5,
    zoomSpeed: 0.0,
    scrollSpeed: 0.0,
    tilesX: 0.0,
    tilesY: 0.0,
  },
  {
    level: 'ZOOM_LEVEL_GALLERY_MAXIMIZE',
    zoomScale: 11.0,
    zoomSpeed: 0.0,
    scrollSpeed: 0.0,
    tilesX: 2.0,
    tilesY: 3.0,
  }
]