import * as alt from 'alt-server';
import * as chat from 'alt:chat';
import { PluginConfig } from '../shared/config.js';
import { EventConstants, CommandConstants } from "../shared/constants.js";

const pluginAutors = PluginConfig.AUTHORS.length > 1
  ? `${PluginConfig.AUTHORS.splice(0, -1).join(', ')} and ${PluginConfig.AUTHORS.splice(-1)}`
  : PluginConfig.AUTHORS[0];
alt.log(`[PLUGIN]: The ~lg~${PluginConfig.NAME} v${PluginConfig.VERSION} ~w~by ~lg~${pluginAutors} ~w~has been loaded!`);


chat.registerCmd(CommandConstants.RADAR_ZOOM_CMD, (player, args) => {
  if (args.length === 0) {
    chat.send(player, `Usage: ${CommandConstants.RADAR_ZOOM_CMD_DESCRIPTION}`);
    return;
  }
  const level = args[0];
  alt.emitClient(player, EventConstants.RADAR_ZOOM_EVENT, level);
});