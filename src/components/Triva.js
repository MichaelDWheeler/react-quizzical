import React from 'react'
import '../styles/trivia.scss';

function Trivia(props) {



  return (
    <div className="trivia">
      {props.html}
    </div>
  )
}

export default Trivia