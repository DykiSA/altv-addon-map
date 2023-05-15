import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';
import { CommandConstants, EventConstants } from '../shared/constants';
import { PluginConfig } from '../shared/config';

// register a command to update the radar zoom level
Athena.systems.messenger.commands.register(
    CommandConstants.RADAR_ZOOM_CMD,
    CommandConstants.RADAR_ZOOM_CMD_DESCRIPTION,
    PluginConfig.permissions.RADAR_ZOOM_CMD,
    (player: alt.Player, level: string) => {
        // inform client to update the radar zoom level
        alt.emitClient(player, EventConstants.RADAR_ZOOM_EVENT, level)
    }
);

// register this plugin to Athena
Athena.systems.plugins.registerPlugin(PluginConfig.NAME, () => {
    const pluginAutors = PluginConfig.AUTHORS.length > 1
        ? `${PluginConfig.AUTHORS.splice(0, -1).join(', ')} and ${PluginConfig.AUTHORS.splice(-1)}`
        : PluginConfig.AUTHORS[0];
    alt.log(`[PLUGIN]: The ~lg~${PluginConfig.NAME} v${PluginConfig.VERSION} ~w~by ~lg~${pluginAutors} ~w~has been loaded!`);
});