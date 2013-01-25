chrome.browserAction.disable();

var tabIds = [];

function sendTogglePlay() {
  for (var index in tabIds) {
    chrome.tabs.sendMessage(tabIds[index], { msg: 'toggle_play' });
  }
}

chrome.browserAction.onClicked.addListener(function(tab) {
  sendTogglePlay();
});

chrome.extension.onConnect.addListener(function(port) {
  if (port.name != "thefuture_port") {
    return;
  }

  var tabId = port.sender.tab.id;

  tabIds.push(tabId);
  if (tabIds.length > 0) {
    chrome.browserAction.enable();
  }

  port.onDisconnect.addListener(function() {
    tabIds.splice(tabIds.indexOf(tabId), 1);
    if (tabIds.length == 0) {
      chrome.browserAction.disable();
    }
  });
});

chrome.commands.onCommand.addListener(function(command) {
  if (command == "toggle_play") {
    sendTogglePlay();
  }
});
