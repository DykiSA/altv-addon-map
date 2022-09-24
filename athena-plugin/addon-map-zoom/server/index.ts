import * as alt from 'alt-server';
import ChatController from '../../../server/systems/chat';
import { PluginSystem } from "../../../server/systems/plugins";
import { PERMISSIONS } from '../../../shared/flags/permissionFlags';
import { MapZoomEvent } from '../shared/events';

const PLUGIN_NAME = 'Addon Map Zoom';

// register a command to update the radar zoom level
ChatController.addCommand('radarzoom', '/radarzoom [level]', PERMISSIONS.ADMIN, (player: alt.Player, level: string) => {
    // inform client to update the radar zoom level
    alt.emitClient(player, MapZoomEvent.RADAR_ZOOM, level)
});

PluginSystem.registerPlugin(PLUGIN_NAME, () => {
    alt.log(`~lg~${PLUGIN_NAME} was Loaded`);
});