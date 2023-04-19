import React from "react"
import {useState, useEffect} from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import "./index.css"
import click from "./sounds/click.wav"
import roll from "./sounds/roll.wav"
import error from "./sounds/error.wav"
import click2 from "./sounds/click2.wav"
import win from "./sounds/win.wav"
import Timer from "./components/Timer"
import Modal from "./components/Modal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight as reset, faDice, faPlay} from '@fortawesome/free-solid-svg-icons'


export default function App() {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [modal, setModal] = useState(false)

    useEffect(() => {
        let interval;
        if (isRunning) {
        interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);
    
    if(time===60){
        new Audio(error).play()
    }

    useEffect(() => {
        if (tenzies){
            setIsRunning(false);
            new Audio(win).play()
        } 
    }, [tenzies])

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            setModal(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.floor(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    
    function rollDice() {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
        new Audio(roll).play()
    }

    function resetGame(){
        setDice(oldDice => oldDice.map(die => {
            return generateNewDie()
        }))
        setIsRunning(false)
        setTime(0)
        new Audio(click2).play()
    }

    function startGame(){
        setIsRunning(true)
        rollDice()
    }

    function newGame(){
        setTenzies(false)
        setTime(0)
        setDice(allNewDice())
        setIsRunning(false)
        setModal(false)
        new Audio(click2).play()
    }
    
    function holdDice(id) {
        if(isRunning){ setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))}
        new Audio(click).play()
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    return (
        <>
            {tenzies && <Confetti/>}
            <header>
                <h1 className="title">TENZIES</h1>
                <Timer minutes={minutes} seconds={seconds} run={isRunning} />
            </header>
            <main>
                { tenzies && <Modal newGame={newGame}  time={time} minutes={minutes} seconds={seconds} />}
                { modal && <div className="backdrop"></div>}
                {!tenzies && <div className="dice-container">
                    {diceElements}
                </div>}
                {isRunning && !tenzies && <button  className="roll-dice"  onClick={rollDice}>
                    <FontAwesomeIcon icon={faDice} /> 
                </button>}
                    {!isRunning && !tenzies && <button className="roll-dice" onClick={startGame}>
                        <FontAwesomeIcon icon={faPlay}/>
                    </button>}
            </main>
            {isRunning && <div className="reset-button" onClick={resetGame}><FontAwesomeIcon icon={reset} size='lg'/></div>}
        </>
    )
}

