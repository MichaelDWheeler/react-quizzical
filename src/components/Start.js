import React from 'react';
import '../styles/start.scss';
import blobYellow from '../images/blobs.png';
import blobPurple from '../images/blobs-purple.png';

export default function Start(props) {
    return (
        <div className="start">
            <h1 className="start__title">Quizzical</h1>
            <p className="start__desc">Test your knowledge with random trivia questions.</p>
            <button className="start__btn" type="button" onClick={props.startQuiz}>Start quiz</button>
            <img className="start__blob-yellow" src={blobYellow}/>
            <img className="start__blob-purple" src={blobPurple}/>
        </div>
    )
}