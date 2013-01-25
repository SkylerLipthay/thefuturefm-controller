chrome.extension.connect({ name: 'thefuture_port' });

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.msg == 'toggle_play') {
    $('#player-container .overlay-controls :visible').click();
  }
});
