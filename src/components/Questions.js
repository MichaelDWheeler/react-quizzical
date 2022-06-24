import React from 'react';
import Trivia from './Triva';
import smallBlobYellow from '../images/blob-sm-yellow.png'
import smallBlobPurple from '../images/blob-sm-purple.png'
import '../styles/questions.scss';

export default function Questions(props) {

    return (
        <div className="questions">
            <Trivia html={props.html} />
            <img className='questions__blob-yellow' src={smallBlobYellow} alt="small yellow blob" width='162' height='187' />
            <img className='questions__blob-purple' src={smallBlobPurple} alt="small purple blob" width='65' height='62' />
        </div>
    )
}
