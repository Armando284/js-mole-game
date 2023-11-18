import { useEffect, useState } from 'react'
import './App.css'

const BOXES = 9
const GAME_BASE_SPEED = 1500

function App() {
  const [points, setPoints] = useState(0)
  const [moleBox, setMoleBox] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [difficulty, setDifficulty] = useState(0)
  const [fps, setFPS] = useState(GAME_BASE_SPEED)

  const boxArray = Array.from({ length: BOXES }, () => crypto.randomUUID())

  const hit = (e: React.MouseEvent<HTMLDivElement>): void => {
    const el = e.target as HTMLDivElement
    if (isActive && el.classList.contains('mole')) {
      setMoleBox(-1) // Push the mole out of grid
      setPoints(points + 1)
    }
  }

  useEffect(() => {
    let intervalId: number | undefined
    if (isActive) {
      intervalId = setInterval(() => {
        const boxNumber = Math.floor(Math.random() * 9)
        setMoleBox(boxNumber)
      }, fps)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [isActive, fps])

  const handlePlay = () => {
    setIsActive(!isActive)
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
        <button onClick={handlePlay}>{isActive ? 'Stop' : 'Play'}</button>

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
