function startScreenCapture() {
    // eslint-disable-next-line no-undef
    chrome.desktopCapture.chooseDesktopMedia(['screen'], (streamId) => {
      if (streamId) {
        const constraints = {
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: streamId,
            },
          },
        };

        navigator.mediaDevices.getUserMedia(constraints)
          .then((stream) => {
            // You now have access to the screen capture stream (stream)
            // Use MediaRecorder or other libraries to record the stream
          })
          .catch((error) => {
            console.error('Error accessing screen capture stream:', error);
          });
      } else {
        console.error('Screen capture permission denied by user');
      }
    });
  }

  // content.js

// Send a message to the background script
chrome.runtime.sendMessage({ type: 'content_script_ready' });

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'content_script_to_extension') {
    // Handle the message from the extension
    // You can send a response back using sendResponse if needed
  }
});
