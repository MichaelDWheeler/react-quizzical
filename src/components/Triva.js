import React from 'react'
import '../styles/trivia.scss';

function Trivia(props) {



  return (
    <div className="trivia">
      {props.html}
      <button className='trivia__btn-check' type="button" onClick={props.checkAnswers}>Check answers</button>
    </div>
  )
}

export default Trivia