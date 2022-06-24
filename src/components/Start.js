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
            <img className="start__blob-yellow" src={blobYellow} alt="yellow blob" />
            <img className="start__blob-purple" src={blobPurple} alt="purple blob" />
        </div>
    )
}