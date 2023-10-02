import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css'
import image from './img/nine.png';
import image2 from './img/setting-2.png';
import image3 from './img/close-circle.png';
import image4 from './img/monitor.png';
import image5 from './img/copy.png';
import image6 from './img/video.png';
import image7 from './img/microphone.png';
import image8 from './img/_Toggle base.png';

function App() {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isCameraOn, setIsCameraOn] = useState(false);

  useEffect(() => {
    const toggleCamera = () => {
      setIsCameraOn(!isCameraOn);
    };

    const toggleButton = document.getElementById("toggle-button");
    toggleButton.addEventListener("click", toggleCamera);

    return () => {
      // Clean up event listener when the component unmounts
      toggleButton.removeEventListener("click", toggleCamera);
    };
  }, [isCameraOn]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const mediaRecorderInstance = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorderInstance);

      mediaRecorderInstance.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks([...recordedChunks, event.data]);
        }
      };

      mediaRecorderInstance.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        // You can now do something with the recorded video URL, e.g., send it to an API
        console.log('Recording stopped. Video URL:', url);
      };

      mediaRecorderInstance.start();
      setRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.pause();
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.resume();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };
  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  return (
    <div className="App">
      <div className='main'>
        <div className='screen'>
          <div className='part1'>
            {/* ... (rest of your JSX code) */}
            <div className='layer1'>
              <div className='helpme1'>
                <img src={image} />
                <h1>HelpMeOut</h1>
              </div>
              <div className='helpme2'>
                <img src={image2} className='helpme-img'/>
                <img src={image3}/>
              </div>
            </div>
          <p>This extension helps you record and share help videos with ease.</p>
          </div>

          <div className='part2'>
            {/* ... (rest of your JSX code) */}
            <div className='layer2'>
              <div className='monitor'>
                <img src={image4}/>
                  <p>Full screen</p>
              </div>
              <div className='copy'>
                <img src={image5}/>
                <p>Current Tab</p>
              </div>
          </div>
          <div className='layer3'>
            <div className='layer3-items'>
              <img src={image6}/>
              <p>Camera</p>
            </div>
            <div
              className={`toggle-button ${isCameraOn ? 'on' : 'off'}`}
              onClick={toggleCamera}
            >
              <div className="toggle-button-circle"></div>
            </div>
          </div>
          <div className='layer3'>
            <div className='layer3-items'>
              <img src={image7}/>
              <p>Audio</p>
            </div>          
    
          

            <div className={`toggle-button ${isCameraOn ? 'on' : 'off'}`} onClick={toggleCamera}>
              <button id="toggle-button" className={isCameraOn ? "on" : "off"}>
              </button>
              
            </div>
          </div>   
            <div className="recording-controls">
              <button onClick={recording ? pauseRecording : startRecording} className='record'>
                {recording ? 'Pause Recording' : 'Start Recording'}
              </button>
              {recording && (
                <>
                  <button onClick={resumeRecording}>Resume Recording</button>
                  <button onClick={stopRecording}>Stop Recording</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
