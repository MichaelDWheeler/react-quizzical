import './App.scss';
import React, {useState, useEffect} from 'react'
import Start from './components/Start';
import {nanoid} from 'nanoid';
import he from 'he';
import Questions from './components/Questions';

function App() {
  const [stage, setStage] = React.useState(1);
  const [question, setQuestion] = useState([]);
  const [html, setHtml] = useState([]);

  function mixQuestionsOrder(correct, incorrect) {
    const questionArr = [];
    questionArr.push({
      answer: correct,
      selected: false,
      id: nanoid()
    });
    incorrect.forEach(element => {
      questionArr.push({
        answer: element,
        selected: false,
        id: nanoid()
      });
    });
    questionArr.sort(() => Math.random() - 0.5);
    return questionArr;
  }

  function setAnswer(id) {
    // set the question state to reflect that the allQuestions array with the matching id have the
    // selected value as opposite of what it currently is so the user can select/deselect the button
    question.forEach((item) => {
      item.allQuestions.forEach((entry) => {
        if (entry.id === id) {
          console.log(entry.answer) //state needs to change so the entry.selected = !entry.selected
        }
      })
    })
  }

  function button(answers) {
    const answerArr = answers.allQuestions.map((item) => {
      return (<button className="trivia__btn" key={item.id} onClick={() => {
        setAnswer(item.id)
      }}>{he.decode(item.answer)}</button>);
    });
    return answerArr
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(question => setQuestion(question.results))
      .then(() => {
        setQuestion(prevQuestion => {
          return prevQuestion.map((question => {
            return {
              ...question,
              allQuestions: mixQuestionsOrder(question.correct_answer, question.incorrect_answers),
              id: nanoid(),
              answeredCorrectly: false
            }
          }))
        })
      })
  }, [])

  useEffect(() => {
    setHtml(() => {
      return (
        question.map((item => {
          return (
            <div key={item.id}>
              <p className="trivia__title">{he.decode(item.question)}</p>
              {button(item)}
            </div>
          )
        }))
      )
    });
    console.log(JSON.stringify(question, null, 2));
    // console.log(html);

  }, [question])

  function startQuiz(){
    setStage(2);
  }

  return (
    <div className="App">
      {stage === 1 && <Start startQuiz={startQuiz}/>}
      {stage === 2 && <Questions html={html} />}
    </div>
  );
}

export default App;
