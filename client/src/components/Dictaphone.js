import React from 'react';
import {useState, useEffect} from 'react'
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const appId = 'c5e1f482-5caf-4444-a437-cfda656d5a36';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);


const Dictaphone = () => {
  const [colored, setColored] = useState('white')
  const [fail, setFail] = useState(false)
 
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  console.log(transcript)

 
  const badWords = ['LIKE', 'UH', 'UM', 'AH']

  let tryAgain = () => {
   if (transcript.split(' ').some(i => badWords.includes(i))) {
    return (
        <h1>TRY AGAIN</h1>
    )
  }
}

console.log(transcript.split(' '))

  return (
    <>
    <div style={{ backgroundColor: colored }}>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      >Hold to talk</button>
      <p style={{color: 'black', zIndex: 1}}>{transcript}</p>
      
    </div>
    {tryAgain()}
    </>
  );
};
export default Dictaphone;