import { useState } from 'react'
import './App.css'
import Die from './components/Die'

function App() {
  const [dice, setDice] = useState(allNewDice)

  function allNewDice() {
    const allNewDice = []
    for (let i = 0; i <= 10; i++) {
          allNewDice.push(Math.floor(Math.random() * 6) + 1)
    }
    return allNewDice
  }

  const diceElement = dice.map(die => <Die value={die} />)

  function rollDice() {
      setDice(allNewDice())
  }
  return (
       <main>
          <div className='dice--container'>
            {diceElement}
          </div>
           <button onClick={rollDice} className='dice--roll'>Roll</button>
       </main>
  );
}

export default App;
