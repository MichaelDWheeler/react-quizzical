import React from 'react';
import '../styles/start.scss';
import blobYellow from '../images/blobs.png';
import blobPurple from '../images/blobs-purple.png';

export default function Start(props) {
    return (
        <div className="start">
            <h1 className="start__title">Quizzical</h1>
            <p className="start__desc">Test your knowledge with random trivia questions.</p>
            {props.html.length === 5 ? <button className="start__btn" type="button" onClick={props.startQuiz}><span className="flip-out-hor-top">Loading...</span><span className="flip-in-hor-bottom">Start quiz</span></button> :
                <button className="start__btn" type="button">Loading...</button>}
            <div className="start__width-full">
                <p className="start__desc start__challenge">This app was a <a href="https://www.figma.com/file/E9S5iPcm10f0RIHK8mCqKL/Quizzical-App?node-id=0%3A1" target="_blank" rel="noreferrer">Scrimba Challenge</a>. The only direction given was the Figma file itself, the rest was up to the me to code. After checking your answers, you can change your answers to the correct answers. Getting all the answers correct will show a confetti celebration. <a href="https://github.com/MichaelDWheeler/react-quizzical" target="_blank" rel="noreferrer">Source</a>.</p>
            </div>
            <img className="start__blob-yellow" src={blobYellow} alt="yellow blob" />
            <img className="start__blob-purple" src={blobPurple} alt="purple blob" />
        </div>
    )
}