import React from 'react';
import '../styles/questions.scss';
import Trivia from '../services/Triva';

export default function Questions(props){

    return (
        <div className="questions">
            <Trivia/>
        </div>
    )
}
