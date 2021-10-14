import React from 'react';
import { useState } from 'react'
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const appId = 'c5e1f482-5caf-4444-a437-cfda656d5a36';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Dictaphone = () => {
    const [colored, setColored] = useState('white')

    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({ continuous: true });

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const badWords = [
        'LIKE',
        'UH',
        'UM',
        'AH'
    ]

    const questions = [
        'Where do you see yourself in five years?',
        'What is a React Hook?',
        'Describe an instance where you overcame adversity.',
        'How would you loop through an array in Javascript to create a new array?',
        'What is a linked list?',
        'How do you see yourself contributing to our work culture?',
        'How would you reverse a string?',
        'What is a palindrome string?',
        'How to calculate the number of vowels and consonants in a string?'
    ]

    function randomQuestion() {
        return questions[Math.floor(Math.random()*questions.length)]
    }

        let tryAgain = () => {
            if (transcript.split(' ').some(i => badWords.includes(i))) {
                return (
                    <h1>TRY AGAIN</h1>
                )
            }
        }

    return (
        <>
            <div style={{ backgroundColor: colored, textAlign: 'center' }}>
                <Typography variant='h1'>Interview Trainer</Typography>
                <Typography variant='h3'>Rules<Typography variant="h5">Respond to the prompt without using 'like', 'um', 'uh', or 'ah'</Typography></Typography>
                <h4>{randomQuestion()}</h4>
                <p>Microphone: {listening ? 'on' : 'off'}</p>
                <Button
                    variant="outlined"
                    onTouchStart={startListening}
                    onMouseDown={startListening}
                    onTouchEnd={SpeechRecognition.stopListening}
                    onMouseUp={SpeechRecognition.stopListening}
                >Hold to talk</Button>
                <p style={{ color: 'black', zIndex: 1 }}>{transcript}</p>

            </div>
            {tryAgain()}
        </>
    );
};
export default Dictaphone;