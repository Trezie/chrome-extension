import React from 'react'
import image from '../img/nine.png'
import image2 from '../img/setting-2.png'
import image3 from '../img/close-circle.png'
import image4 from '../img/monitor.png'
import image5 from '../img/copy.png'
import image6 from '../img/video.png'
import image7 from '../img/microphone.png'
import image8 from '../img/_Toggle base.png'

function ScreenRecord() {
  return (
    <div className='screen'>
      <div className='part1'>
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
          
          <img src={image8}/>
        </div>
        <div className='layer3'>
          <div className='layer3-items'>
            <img src={image7}/>
            <p>Audio</p>
          </div>          
          <img src={image8}/>
        </div>
        <button className='record'>
          <p>Start Recording</p>

        </button>

      </div>
      
    </div>
  )
}

export default ScreenRecord

