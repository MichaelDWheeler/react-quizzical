import './App.scss';
import React, {useState, useEffect, useCallback} from 'react'
import Start from './components/Start';
import {nanoid} from 'nanoid';
import he from 'he';
import Questions from './components/Questions';

function App() {
  const [stage, setStage] = React.useState(1);
  const [question, setQuestion] = useState([]);
  const [html, setHtml] = useState([]);
  const [questionsChecked, setQuestionsChecked] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState({game: 1});

  const getTriviaQuestions = useCallback(() => {

    const setQuestions = item => {
            const parentId = nanoid();
            return {
              ...item,
              id: parentId,
              allQuestions: mixQuestionsOrder(item.correct_answer, item.incorrect_answers, parentId),
              answeredCorrectly: false,
              attemptedToAnswer: false,
              checked: false
            }
          };

    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(data => setQuestion(data.results))
      .then(() => {
        setQuestion(prevQuestion => {
          return prevQuestion.map(setQuestions)
        })
      })
  }, [])

  const createHtml = useCallback(()=>{
    function button(answers) {

      const createButton = item => {
        return (<button className={`questions__inner-btn${item.selected ? ' questions__inner-selected' : ''}${questionsChecked ? ' checked' : ''}${questionsChecked && answers.correct_answer === item.answer ? ' correct' : ''}`}
          key={item.id}
          onClick={(event) => {
            event.preventDefault();
            setAnswer(item.id, item.parentId);
          }}>{he.decode(item.answer)}</button>);
      }

      const answerArr = answers.allQuestions.map(createButton);
      return answerArr
    }

    setHtml(() => {

      const createQuestion = item => {
        return (
          <div key={item.id}>
            <p className=
              {`questions__inner-title${item.attemptedToAnswer ? ' attempted' : ' not__attempted'}${item.checked ? ' checked' : ''}`}>
              {he.decode(item.question)}
            </p>
            {button(item)}
          </div>
        )
      };

      return (
        question.map(createQuestion)
      )
    });
  }, [question, questionsChecked])

  useEffect(() => {
    getTriviaQuestions();
  }, [getTriviaQuestions, gamesPlayed])

  useEffect(() => {
    createHtml();
  }, [createHtml, question, questionsChecked])

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

    const toggleAnswers = item => {
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
    }
    setQuestion(prevQuestion => {
      return prevQuestion.map(toggleAnswers)
    })
  }

  function correctAnswers() {
    let count = 0;
    question.forEach(item => {
      if (item.answeredCorrectly) count++;
    })
    return count;
  };

  function startQuiz() {
    setTimeout(() => {
      if (html.length === question.length) {
        setStage(2);
      }
    }, 200);

  }

  function playAgain() {
    setGamesPlayed(prevGame => {
      return {
        game: prevGame.game++
      }
    })
    setQuestionsChecked(false);
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

    // if attemptedToAnswer is true for every state, proceed
    // if attemptedToAnswer = false for any state, do not proceed
    const allQuestionsAttempted = question.every(item => item.attemptedToAnswer);

    if (allQuestionsAttempted) {
      setQuestionsChecked(true);
    }
  }

  return (
    <div className="App">
      {stage === 1 && <Start startQuiz={startQuiz} html={html} />}
      {stage === 2 && <Questions
        checkAnswers={checkAnswers}
        html={html}
        question={question}
        questionsChecked={questionsChecked}
        playAgain={playAgain}
        correctAnswers={correctAnswers} />}
    </div>
  );
}

export default App;
