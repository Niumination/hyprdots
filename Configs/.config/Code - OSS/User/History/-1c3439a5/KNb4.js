const { Gtk, Gdk } = imports.gi;
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
const { Box, Button, CenterBox, Entry, EventBox, Icon, Label, Overlay, Revealer, Scrollable, Stack } = Widget;
const { execAsync, exec } = Utils;
import { setupCursorHover, setupCursorHoverInfo } from './cursorhover.js';
// APIs
import GPTService from './tools/gpt.js';
//import Gemini from '../../services/gemini.js';
//import { geminiView, geminiCommands, sendMessage as geminiSendMessage, geminiTabIcon } from './apis/gemini.js';
import { chatGPTView, chatGPTCommands, sendMessage as chatGPTSendMessage, chatGPTTabIcon } from './apis/chatgpt.js';
//import { waifuView, waifuCommands, sendMessage as waifuSendMessage, waifuTabIcon } from './apis/waifu.js';
//import { booruView, booruCommands, sendMessage as booruSendMessage, booruTabIcon } from './apis/booru.js';
import { enableClickthrough } from "./clickthrough.js";
import { checkKeybind } from './keybind.js';
const TextView = Widget.subclass(Gtk.TextView, "AgsTextView");

//import { widgetContent } from '../sideleft.js';
//import { IconTabContainer } from './tabcontainer.js';

const EXPAND_INPUT_THRESHOLD = 30;
const APILIST = {
//    'gemini': {
//        name: 'Assistant (Gemini Pro)',
//        sendCommand: geminiSendMessage,
//        contentWidget: geminiView,
//        commandBar: geminiCommands,
//        tabIcon: geminiTabIcon,
//        placeholderText: 'Message Gemini...',
//    },
    'gpt': {
        name: 'Assistant (GPTs)',
        sendCommand: chatGPTSendMessage,
        contentWidget: chatGPTView,
        commandBar: chatGPTCommands,
        tabIcon: chatGPTTabIcon,
        placeholderText: 'Message the model...',
    },
//    'waifu': {
//        name: 'Waifus',
//        sendCommand: waifuSendMessage,
//        contentWidget: waifuView,
//        commandBar: waifuCommands,
//        tabIcon: waifuTabIcon,
//        placeholderText: 'Enter tags',
//    },
//    'booru': {
//        name: 'Booru',
//        sendCommand: booruSendMessage,
//        contentWidget: booruView,
//        commandBar: booruCommands,
//        tabIcon: booruTabIcon,
//        placeholderText: 'Enter tags',
//    },
}
//const APIS = userOptions.sidebar.pages.apis.order.map((apiName) => APILIST[apiName]);
//let currentApiId = 0;

function apiSendMessage(textView) {
    // Get text
    const buffer = textView.get_buffer();
    const [start, end] = buffer.get_bounds();
    const text = buffer.get_text(start, end, true).trimStart();
    if (!text || text.length == 0) return;
    // Send
//    APIS[currentApiId].sendCommand(text)
    // Reset
//    buffer.set_text("", -1);
//    chatEntryWrapper.toggleClassName('sidebar-chat-wrapper-extended', false);
//    chatEntry.set_valign(Gtk.Align.CENTER);
//}

//export const chatEntry = TextView({
//    hexpand: true,
//    wrapMode: Gtk.WrapMode.WORD_CHAR,
//    acceptsTab: false,
//    className: 'sidebar-chat-entry txt txt-smallie',
//    setup: (self) => self
//        .hook(App, (self, currentName, visible) => {
//            if (visible && currentName === 'sideleft') {
//                self.grab_focus();
//            }
//        })
//        .hook(GPTService, (self) => {
//            if (APIS[currentApiId].name != 'Assistant (GPTs)') return;
//            self.placeholderText = (GPTService.key.length > 0 ? 'Message the model...' : 'Enter API Key...');
//        }, 'hasKey')
//        .hook(Gemini, (self) => {
//            if (APIS[currentApiId].name != 'Assistant (Gemini Pro)') return;
//            self.placeholderText = (Gemini.key.length > 0 ? 'Message Gemini...' : 'Enter Google AI API Key...');
//        }, 'hasKey')
//        .on("key-press-event", (widget, event) => {
            // Don't send when Shift+Enter
//            if (event.get_keyval()[1] === Gdk.KEY_Return) {
//                if (event.get_state()[1] !== 17) {// SHIFT_MASK doesn't work but 17 should be shift
//                    apiSendMessage(widget);
//                    return true;
//                }
//                return false;
//            }
            // Keybinds
 //           if (checkKeybind(event, userOptions.keybinds.sidebar.cycleTab))
 //               widgetContent.cycleTab();
 //           else if (checkKeybind(event, userOptions.keybinds.sidebar.nextTab))
 //               widgetContent.nextTab();
 //           else if (checkKeybind(event, userOptions.keybinds.sidebar.prevTab))
 //               widgetContent.prevTab();
 //           else if (checkKeybind(event, userOptions.keybinds.sidebar.apis.nextTab)) {
 //               apiWidgets.attribute.nextTab();
 //               return true;
//          }
//            else if (checkKeybind(event, userOptions.keybinds.sidebar.apis.prevTab)) {
//                apiWidgets.attribute.prevTab();
//                return true;
//            }
//        })
//    ,
//});

//
//function switchToTab(id) {
//    apiContentStack.shown.value = id;
//}

//
//const apiWidgets = Widget.Box({
//    attribute: {
//        'nextTab': () => switchToTab(Math.min(currentApiId + 1, APIS.length - 1)),
//        'prevTab': () => switchToTab(Math.max(0, currentApiId - 1)),
//    },
//    vertical: true,
//    className: 'spacing-v-10',
//    homogeneous: false,
//    children: [
//        apiContentStack,
//        apiCommandStack,
//        textboxArea,
//    ],
//});

//export default apiWidgets;
}