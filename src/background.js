// background.js

let mediaRecorder;



function startScreenRecording() {
  // Code to start screen recording using MediaRecorder
  // Ensure you have the necessary permissions and setup for screen recording
  // Example:
  navigator.mediaDevices.getDisplayMedia({ video: true })
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      const recordedChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        // Create a Blob from the recorded chunks
        const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });

        // Send the recordedBlob to your server or handle it as needed
        sendRecordingToEndpoint(recordedBlob);
      };

      mediaRecorder.start();
    })
    .catch((error) => {
      console.error('Error starting screen recording:', error);
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'content_script_ready') {
      // Start screen recording
      startScreenRecording();
    }
  });

function sendRecordingToEndpoint(recordedBlob) {
  // Code to send the recording to your server or perform other actions
  // Example:
  const endpointUrl = 'https://your-api-endpoint.com/upload';

  const formData = new FormData();
  formData.append('video', recordedBlob, 'screen_capture.webm');

  fetch(endpointUrl, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log('Recording uploaded successfully');
      } else {
        console.error('Error uploading recording:', response.statusText);
      }
    })
    .catch((error) => {
      console.error('Error uploading recording:', error);
    });
}
