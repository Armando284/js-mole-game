import { useEffect, useState } from 'react'
import './App.css'

const BOXES = 9
const GAME_BASE_SPEED = 1500
type GameState = 'stop' | 'play' | 'pause'
const lastBox = () => BOXES - 1

function App() {
  const [points, setPoints] = useState(0)
  const [moleBox, setMoleBox] = useState(lastBox())
  const [currentState, setCurrentState] = useState<GameState>('stop')
  const [difficulty, setDifficulty] = useState(0)
  const [fps, setFPS] = useState(GAME_BASE_SPEED)

  const boxArray = Array.from({ length: BOXES }, () => crypto.randomUUID())

  const hit = (e: React.MouseEvent<HTMLDivElement>): void => {
    const el = e.target as HTMLDivElement
    if (currentState === 'play' && el.classList.contains('mole')) {
      setMoleBox(-1) // Push the mole out of grid
      setPoints(points + 1)
    }
  }

  useEffect(() => {
    let intervalId: number | undefined
    if (currentState === 'play') {
      intervalId = setInterval(() => {
        const boxNumber = Math.floor(Math.random() * 9)
        setMoleBox(boxNumber)
      }, fps)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [currentState, fps])

  const handlePlay = () => {
    if (currentState === 'stop') {
      setPoints(0)
    }
    setCurrentState(currentState === 'play' ? 'pause' : 'play')
  }

  const handleStop = () => {
    setCurrentState('stop')
    setMoleBox(lastBox())
  }

  const getFps = (value: number) => Math.floor(GAME_BASE_SPEED / value)


  const changeDifficulty = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value)
    setDifficulty(value)
    setFPS(getFps(value))
  }

  const rangeStyles = {
    background: `linear-gradient(to right, #000000, red)`,
  };

  return (
    <>
      <div className="main-container">
        <h1>The Mole Game!</h1>
        <h3>Points: {points}</h3>
        <div className="game-grid">
          {
            boxArray.map((id, i) => (<div key={id} className={`box ${moleBox === i ? 'mole' : ''}`} onClick={hit}></div>))
          }
        </div>
        <div className="button-group">
          <button onClick={handlePlay}>{currentState === 'play' ? 'Pause' : 'Play'}</button>
          <button onClick={handleStop} disabled={currentState === 'stop'}>Stop</button>
        </div>
        <div className="input-group">
          <label htmlFor="difficulty">Difficulty {difficulty}
            <input type="range" min="1" max="10" name='difficulty' defaultValue={difficulty} onChange={changeDifficulty} style={rangeStyles} />
          </label>
        </div>
      </div>
    </>
  )
}

export default App
