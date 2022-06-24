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

  function mixQuestionsOrder(correct, incorrect, id) {
    const questionArr = [];

    questionArr.push({
      parentId: id,
      answer: correct,
      selected: false,
      id: nanoid()
    });

    incorrect.forEach(element => {
      questionArr.push({
        parentId: id,
        answer: element,
        selected: false,
        id: nanoid()
      });
    });

    questionArr.sort(() => Math.random() - 0.5);

    return questionArr;
  }



  function setAnswer(id, parentId) {
    setQuestion(prevQuestion => {
      return prevQuestion.map(item => {
        item.allQuestions.forEach(itemProps => {
          // only allow one selection per question
          if (itemProps.parentId === parentId) {
            itemProps.selected = false;
          }
          // toggle selected property
          if (itemProps.id === id) {
            itemProps.selected = !itemProps.selected;
            itemProps.answer === item.correct_answer ? item.answeredCorrectly = true : item.answeredCorrectly = false;
            itemProps.selected ? item.attemptedToAnswer = true : item.attemptedToAnswer = false;
            return itemProps
          }
        })

        return {
          ...item
        }
      })
    })
  }



  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(data => setQuestion(data.results))
      .then(() => {
        setQuestion(prevQuestion => {
          return prevQuestion.map((item => {
            const parentId = nanoid();
            return {
              ...item,
              id: parentId,
              allQuestions: mixQuestionsOrder(item.correct_answer, item.incorrect_answers, parentId),
              answeredCorrectly: false,
              attemptedToAnswer: false,
              checked: false
            }
          }))
        })
      })
  }, [])

  useEffect(() => {

    function button(answers) {
      const answerArr = answers.allQuestions.map((item) => {
        return (<button className={`trivia__btn${item.selected ? ' trivia__selected' : ''}`} key={item.id} onClick={(event) => {
          event.preventDefault();
          setAnswer(item.id, item.parentId);
        }}>{he.decode(item.answer)}</button>);
      });
      return answerArr
    }

    setHtml(() => {
      return (
        question.map((item => {
          return (
            <div key={item.id}>
              <p className=
                {`trivia__title${item.attemptedToAnswer ? ' attempted' : ' not__attempted'}${item.checked ? ' checked' : ''}`}>
                {he.decode(item.question)}
              </p>
              {button(item)}
            </div>
          )
        }))
      )
    });

    // console.log(html);

  }, [question])

  function startQuiz() {
    setTimeout(() => {
      if (html.length === 5) {
        setStage(2);
      }
    }, 200);

  }

  function showResults() {
    console.log('Showing the results');
  }
  function checkAnswers() {
    // changed checked state to true
    // style using .checked.not__attempted vs .checked.attempted
    // .checked.not__attempted will have red heading
    setQuestion(prevQuestion => {
      return prevQuestion.map(item => {
        return {
          ...item,
          checked: true
        }
      })
    })
    const allQuestionsAttempted = question.every(item => item.attemptedToAnswer);
    // if attemptedToAnswer is true for every state, proceed
    // if attemptedToAnswer = false for any state, do not proceed

    if (allQuestionsAttempted)
      showResults()
  }

  return (
    <div className="App">
      {stage === 1 && <Start startQuiz={startQuiz} html={html} />}
      {stage === 2 && <Questions checkAnswers={checkAnswers} html={html} />}
    </div>
  );
}

export default App;
