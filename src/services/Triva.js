import React, {useState, useEffect} from 'react'
// import axios from 'axios';
import { nanoid } from 'nanoid';
import '../styles/trivia.scss';

function Trivia() {
    const [question, setQuestion] = useState([]);
    const [html, setHtml] = useState([]);

    function mixQuestionsOrder(correct, incorrect) {
      const questionArr = [];
      questionArr.push(correct);
      incorrect.forEach(element => {
        questionArr.push(element);
      });
      questionArr.sort(()=> Math.random() - 0.5);
      return questionArr;
    }

    useEffect(()=>{
      fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(question => setQuestion(question.results))
      .then(()=>{
        setQuestion(prevQuestion => {
          return prevQuestion.map((question => {
            return {
              ...question,
              allQuestions : mixQuestionsOrder(question.correct_answer, question.incorrect_answers),
              id: nanoid()
            }
          }))
        })
      })
    }, [])

    useEffect(()=>{
      setHtml(() =>{
        return (
          question.map((item => {
            return(
              <p className="trivia__title" key={item.id}>{item.question}</p>
            )
          }))
        )
      })
    }, [question])


  return (
    <div className="trivia">
      { html }
      <pre>{JSON.stringify(question, null, 2)}</pre>
    </div>
  )
}

export default Trivia