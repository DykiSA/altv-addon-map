# altV: Addon Map

Enable custom map and minimap with postal code for altV server.

This is a port of the FiveM resource: https://forum.cfx.re/t/free-release-postal-code-map-minimap-fixed/4882127

## Requirements

1. alt:V Server 12.11 (release)

## Installation

Download this repository.

### 1. Standard altV Server

1. Copy `resources/addon-map` and `resources/addon-map-zoom` into `resources` folder on your server.

2. Add this resources to your `server.cfg` like below:
    ```cfg
    # ...other config
    resources: [
        # ...other resources
        'addon-map'
        'addon-map-zoom'
    ]
    ```

3. Enjoy!


### 2. With Athena Roleplay Framework

Since the Athena framework has a different approach to managing the altV server, the streamable and script resources are placed separately.

1. Copy `resources/addon-map` to the `resources/mods` folder
2. Register the mod to the configuration located in `configs` folder (`dev|devtest|prod.json`), e.g.
    ```json
    "resources": [
        // ...other mods
        "mods/addon-map",
        "webviews",
        "core"
    ],
    ```
3. Copy `athena-plugin/addon-map-zoom` to the `src/core/plugins`
4. Enjoy!

## Athena Framework Command

The `addon-map-zoom` plugin for Athena contains a command to adjust the zoom level of the radar. This command is used for testing and debugging puprose only.

1. Open the command box (default is **T** on keyboard)
2. Type `/radarzoom [level]` (the value of level ranges from 0 to 1400 e.g. `/radarzoom 1200`. See https://natives.altv.mp/#/0x096EF57A0C999BBA)

## Issues

1. Sometimes the radar/minimap does not shows the custom map correctly due to the known bug here: https://github.com/altmp/altv-issues/issues/956

## Credits
- [[FREE] [Release] Postal Code Map & Minimap FIXED](https://forum.cfx.re/t/free-release-postal-code-map-minimap-fixed/4882127)
- [[Release] Postal Code Map & Minimap - New & Improved - v1.3](https://forum.cfx.re/t/release-postal-code-map-minimap-new-improved-v1-3/147458)
- [FiveM Forum](https://forum.cfx.re/)

## Links

- [Athena Framework](https://athenaframework.com/)
- [altV - GTA V Modification](https://altv.mp)
