import React from 'react';
import smallBlobYellow from '../images/blob-sm-yellow.png'
import smallBlobPurple from '../images/blob-sm-purple.png'
import '../styles/questions.scss';

export default function Questions(props) {
    return (
        <div className="questions">
            <div className="questions__inner">
                {props.html}
                <div className="questions__status">
                    {!props.questionsChecked && <button className='questions__inner-btn-check' type="button" onClick={props.checkAnswers}>Check answers</button>}
                    {props.questionsChecked && <p className="questions__score">You scored {props.correctAnswers()} / {props.question.length} correct answers</p>}
                    {props.questionsChecked && <button className='questions__inner-btn-check' type="button" onClick={props.playAgain}>Play again</button>}
                </div>
            </div>
            <img className='questions__blob-yellow' src={smallBlobYellow} alt="small yellow blob" width='162' height='187' />
            <img className='questions__blob-purple' src={smallBlobPurple} alt="small purple blob" width='65' height='62' />
        </div>
    )
}
