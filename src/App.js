import { useEffect, useState } from 'react'
import './App.css'
import Die from './components/Die'
import Confetti from 'react-confetti'
import { nanoid } from 'nanoid'

function App() {
  const [dice, setDice] = useState(allNewDice)
  const [time, setTime] = useState("")
  const [tenzies, setTenzies] = useState(false)
  const [num, setNumber] = useState({
    number: 0
  })

  useEffect(() => {
      const allHeldDice = dice.every(die => die.isHeld)
      const firstDiceValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstDiceValue)
      if(allHeldDice && allSameValue) {
        setTenzies(true)
      }
  }, [dice])

  useEffect(() => {
       setNumber(num => {
         return {
           ...num,
           number: num.number + 1
         }
       })
  }, [dice])


  useEffect(() => { 
    console.log("changed")
    setTimeout(function() {
      const today = new Date();
      // let h = today.getHours();
      let m = today.getMinutes();
      let s = today.getSeconds();
      setTime(m + " " + s)
    }, 1000);      

    
  }, [tenzies])

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
    setDice(oldDice => {
      return oldDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      })
    })
  }

  
  const diceElement = dice.map(die =>  <Die holdDice={() => holdDice(die.id)} isHeld={die.isHeld} key={die.id} value={die.value} />)

  function rollDice() {
    if(!tenzies) {
      // startTime()
      // setTime(time)
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
            <span>Time of game: {time}</span>
            <p className="dice--instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <p className='dice--rolltext' >No of rolls: <span className='dice-rollnumber'>{num.number}</span></p>
            <div className='dice--container'>
              {diceElement}
            </div>
           <button onClick={rollDice} className='dice--roll'>{tenzies ? "New Game" : "Roll"}</button>
       </main>
  );
}

export default App;
