import { useEffect, useState } from 'react'
import './App.css'
import { Button, LetterBox } from './components/'
import { words } from './data'

const options = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

function checkSelectedOptions (optionsSelected: string[], splitedWord: string[]) {
  if (optionsSelected.length === 0 || splitedWord.length === 0) return false

  const sortedOptionsSelected = optionsSelected.sort()
  const sortedSplitedWord = splitedWord.sort()

  for (let i = 0; i < sortedSplitedWord.length; i++) {
    if (!sortedOptionsSelected.includes(sortedSplitedWord[i].toUpperCase())) {
      return false
    }
  }
  return true
}

function App () {
  const [gameStarted, setGameStarted] = useState(false)
  const [hiddenWord, setHiddenWord] = useState('')
  const [wordCategory, setWordCategory] = useState<string | null>()
  const [optionsSelected, setOptionsSelected] = useState<string[]>([])
  const [wordGuessed, setWordGuessed] = useState(false)
  const [attemptsLeft, setAttemptsLeft] = useState(3)
  const [gameEnded, setGameEnded] = useState(false)
  const [points, setPoints] = useState(0)

  const changeSelectedWord = () => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    setHiddenWord(word)
    setWordCategory(category)
    setOptionsSelected([])
    setWordGuessed(false)
  }

  const onChangeWordClick = () => {
    if (points !== 0) {
      setPoints(points - 50)
    }
    changeSelectedWord()
  }

  const onOptionClick = (option: string) => {
    setOptionsSelected((prevOptions) => [...prevOptions, option])
    if (!hiddenWord.includes(option.toLowerCase())) {
      setAttemptsLeft((prevAttempts) => prevAttempts - 1)
    }
  }

  const onRetryClick = () => {
    setGameEnded(false)
    setGameStarted(true)
    setAttemptsLeft(3)
    changeSelectedWord()
  }

  useEffect(() => {
    if (wordGuessed) {
      setPoints((prevPoints) => prevPoints + 100)
      setAttemptsLeft(3)
      changeSelectedWord()
    }
  }, [wordGuessed])

  useEffect(() => {
    if (checkSelectedOptions(optionsSelected, hiddenWord!.split(''))) {
      setWordGuessed(true)
    } else if (attemptsLeft === 0) {
      setGameEnded(true)
    }
  }, [optionsSelected, hiddenWord, attemptsLeft])

  return (
    <>
      <h1>Secret Word Game</h1>
      {!gameStarted && (
        <Button
          onClick={() => {
            setGameStarted(true)
            changeSelectedWord()
          }}
        >
          Start Game
        </Button>
      )}
      {gameStarted && !gameEnded && (
        <>
          <div className='container header'>
            <span className='header-text'>Total points: <span className='points'>{points}</span></span>
            <span className='header-text'>Attempts left: {attemptsLeft}</span>
          </div>
          <h2>Tip: {wordCategory}</h2>
          <div className='container'>
            {hiddenWord?.split('').map((char, index) => (
              <LetterBox
                key={index}
                character={char}
                display={optionsSelected.includes(char.toUpperCase())}
              />
            ))}
          </div>
          <div className='container'>
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => onOptionClick(option)}
                disabled={optionsSelected.includes(option)}
              >
                {option}
              </Button>
            ))}
          </div>
          <div className='container'>
            <Button onClick={onChangeWordClick}>
              Change word (-50 points)
            </Button>
          </div>
        </>
      )}
      {gameEnded && (
        <div>
          <h2>No more attempts left!</h2>
          <h2 className='header-text'>Your total score: <span className='points'>{points}</span></h2>
          <Button
            onClick={onRetryClick}
          >
            Try again
          </Button>
        </div>
      )}
    </>
  )
}

export default App
