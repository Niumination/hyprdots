import GLib from 'gi://GLib';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js'
import userOverrides from '../../user_options.js';

// Default options.
// Add overrides in ~/.config/ags/user_options.js
let configOptions = {
    // General stuff
    'ai': {
        'defaultGPTProvider': "openai",
        'defaultTemperature': 0.9,
        'enhancements': true,
        'useHistory': true,
        'safety': true,
        'writingCursor': " ...", // Warning: Using weird characters can mess up Markdown rendering
        'proxyUrl': null, // Can be "socks5://127.0.0.1:9050" or "http://127.0.0.1:8080" for example. Leave it blank if you don't need it.
    },
    'animations': {
        'choreographyDelay': 35,
        'durationSmall': 110,
        'durationLarge': 180,
    },
    'appearance': {
        'autoDarkMode': { // Turns on dark mode in certain hours. Time in 24h format
            'enabled': false,
            'from': "18:10",
            'to': "6:10",
        },
        'keyboardUseFlag': false, // Use flag emoji instead of abbreviation letters
        'layerSmoke': false,
        'layerSmokeStrength': 0.2,
        'barRoundCorners': 1, // 0: No, 1: Yes
        'fakeScreenRounding': 1, // 0: None | 1: Always | 2: When not fullscreen
    },
    'apps': {
        'bluetooth': "blueberry",
        'imageViewer': "loupe",
        'network': "XDG_CURRENT_DESKTOP=\"gnome\" gnome-control-center wifi",
        'settings': "XDG_CURRENT_DESKTOP=\"gnome\" gnome-control-center",
        'taskManager': "btop",
        'terminal': "kitty", // This is only for shell actions
    },
//    'battery': {
//        'low': 20,
//        'critical': 10,
//        'warnLevels': [20, 15, 5],
//        'warnTitles': ["Low battery", "Very low battery", 'Critical Battery'],
//        'warnMessages': ["Plug in the charger", "You there?", 'PLUG THE CHARGER ALREADY'],
//        'suspendThreshold': 3,
//    },
    'brightness': {
        // Object of controller names for each monitor, either "brightnessctl" or "ddcutil" or "auto"
        // 'default' one will be used if unspecified
        // Examples
         'eDP-1': "brightnessctl",
        // 'DP-1': "ddcutil",
        'controllers': {
            'default': "auto",
        },
    },
//    'cheatsheet': {
//        'keybinds': {
//            'configPath': "" // Path to hyprland keybind config file. Leave empty for default (~/.config/hypr/hyprland/keybinds.conf)
//        }
//    },
//    'gaming': {
//        'crosshair': {
//            'size': 20,
//            'color': 'rgba(113,227,32,0.9)',
//        },
//    },
    'monitors': {
        'scaleMethod': "division", // Either "division" [default] or "gdk"
    },
//    'music': {
//        'preferredPlayer': "plasma-browser-integration",
//    },
    'onScreenKeyboard': {
        'layout': "qwerty_full", // See modules/onscreenkeyboard/onscreenkeyboard.js for available layouts
    },
//    'overview': {
//        'scale': 0.18, // Relative to screen size
//        'numOfRows': 2,
//        'numOfCols': 5,
//        'wsNumScale': 0.09,
//        'wsNumMarginScale': 0.07,
//    },
    'sidebar': {
        'ai': {
            'extraGptModels': {
                'oxygen3': {
                    'name': 'Oxygen (GPT-3.5)',
                    'logo_name': 'ai-oxygen-symbolic',
                    'description': 'An API from Tornado Softwares\nPricing: Free: 100/day\nRequires you to join their Discord for a key',
                    'base_url': 'https://app.oxyapi.uk/v1/chat/completions',
                    'key_get_url': 'https://discord.com/invite/kM6MaCqGKA',
                    'key_file': 'oxygen_key.txt',
                    'model': 'gpt-3.5-turbo',
                },
            }
        },
        'image': {
            'columns': 2,
            'batchCount': 20,
            'allowNsfw': false,
            'saveInFolderByTags': false,
        },
        'pages': {
            'order': ["apis", "tools"],
            'apis': {
                'order': ["gemini", "gpt", "waifu", "booru"],
            }
        },
    },
    'search': {
        'enableFeatures': {
            'actions': true,
            'commands': true,
            'mathResults': true,
            'directorySearch': true,
            'aiSearch': true,
            'webSearch': true,
        },
        'engineBaseUrl': "https://www.google.com/search?q=",
        'excludedSites': ["quora.com"],
    },
    // Longer stuff
    'icons': {
        // Find the window's icon by its class with levenshteinDistance
        // The file names are processed at startup, so if there
        // are too many files in the search path it'll affect performance
        // Example: ['/usr/share/icons/Tela-nord/scalable/apps']
        'searchPaths': [''],
        'symbolicIconTheme': {
            "dark": "Adwaita",
            "light": "Adwaita",
        },
    },
    'keybinds': {
        // Format: Mod1+Mod2+key. CaSe SeNsItIvE!
        // Modifiers: Shift Ctrl Alt Hyper Meta
        // See https://docs.gtk.org/gdk3/index.html#constants for the other keys (they are listed as KEY_key)
        'sidebar': {
            'apis': {
                'nextTab': "Page_Down",
                'prevTab': "Page_Up",
            },
            'options': { // Right sidebar
                'nextTab': "Page_Down",
                'prevTab': "Page_Up",
            },
            'pin': "Ctrl+p",
            'cycleTab': "Ctrl+Tab",
            'nextTab': "Ctrl+Page_Down",
            'prevTab': "Ctrl+Page_Up",
        },
    },
    'bar': {
        // Array of bar modes for each monitor. Hit Ctrl+Alt+Slash to cycle.
        // Modes: "normal", "focus" (workspace indicator only), "nothing"
        // Example for four monitors: ["normal", "focus", "normal", "nothing"]
        'modes': ["normal"]
    },
}

// Override defaults with user's options
let optionsOkay = true;
function overrideConfigRecursive(userOverrides, configOptions = {}, check = true) {
    for (const [key, value] of Object.entries(userOverrides)) {
        if (configOptions[key] === undefined && check) {
            optionsOkay = false;
        }
        else if (typeof value === 'object' && !(value instanceof Array)) {
            if (key === "substitutions" || key === "regexSubstitutions" || key === "extraGptModels") {
                overrideConfigRecursive(value, configOptions[key], false);
            } else overrideConfigRecursive(value, configOptions[key]);
        } else {
            configOptions[key] = value;
        }
    }
}
overrideConfigRecursive(userOverrides, configOptions);
if (!optionsOkay) Utils.timeout(2000, () => Utils.execAsync(['notify-send',
    'Update your user options',
    'One or more config options don\'t exist',
    '-a', 'ags',
]).catch(print))

globalThis['userOptions'] = configOptions;
export default configOptions;