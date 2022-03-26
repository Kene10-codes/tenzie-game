import { useEffect, useState } from 'react'
import './App.css'
import Die from './components/Die'
import Confetti from 'react-confetti'
import { nanoid } from 'nanoid'

function App() {
  const [dice, setDice] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    console.log("tenzies changes")
      const allHeldDice = dice.every(die => die.isHeld)
      const firstDiceValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstDiceValue)
      if(allHeldDice && allSameValue) {
        setTenzies(true)
        console.log("You won the game")
      }
  }, [dice])

  function generateNewDie() {
      return {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
      }
  }

  function allNewDice() {
    const allNewDice = []
    for (let i = 0; i <= 10; i++) {
          allNewDice.push(generateNewDie())
      }
    return allNewDice
  }

  function holdDice(id) {
    console.log(id)
    setDice(oldDice => {
      console.log(oldDice)
      return oldDice.map(die => {
        console.log(die)
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      })
    })
  }

  
  const diceElement = dice.map(die =>  <Die holdDice={() => holdDice(die.id)} isHeld={die.isHeld} key={die.id} value={die.value} />)

  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => die.isHeld ? die : generateNewDie()
      ))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  
}
  return (
       <main>
         { tenzies  && <Confetti
         /> }
            <h1 className="dice--title">Tenzies</h1>
            <p className="dice--instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='dice--container'>
              {diceElement}
            </div>
           <button onClick={rollDice} className='dice--roll'>{tenzies ? "New Game" : "Roll"}</button>
       </main>
  );
}

export default App;
