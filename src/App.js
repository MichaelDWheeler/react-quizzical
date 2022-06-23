import './App.scss';
import React from 'react'
import Start from './components/Start';
import Questions from './components/Questions';

function App() {
  const [stage, setStage] = React.useState(1);

  function startQuiz(){
    setStage(2);
  }

  return (
    <div className="App">
      {stage === 1 && <Start startQuiz={startQuiz}/>}
      {stage === 2 && <Questions />}
    </div>
  );
}

export default App;
