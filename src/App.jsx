import { useEffect, useState } from "react"
import "./App.css"

export const App = () => {
  const [statusDisplay, setStatusDisplay] = useState("")
  const [gameState, setGameState] = useState(["", "", "", "", "", "", "", "", ""])
  const [currentPlayer, setCurrentPlayer] = useState("O")
  const [gameActive, setGameActive] = useState(true)

  const winnings = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ],
    winMessage = () => `El jugador ${currentPlayer} ha ganado!`,
    drawMessage = () => `El juego ha terminado en emptate!`,
    currentPlayerTurn = (currentPlayer) => `Turno del jugador ${currentPlayer}`

  const handleStatusDisplay = (message) => {
    setStatusDisplay(message)
  }

  const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    const newGameState = [...gameState]
    newGameState[clickedCellIndex] = currentPlayer
    setGameState(newGameState)
    clickedCell.innerText = currentPlayer
  }

  const handlePlayerChange = () => {
    console.log("first")

    setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"))
  }

  useEffect(() => {
    handleStatusDisplay(currentPlayerTurn(currentPlayer))
  }, [currentPlayer])

  const restartGameState = () => {
    setGameState(["", "", "", "", "", "", "", "", ""])
  }

  const handleRestartGame = () => {
    setGameActive(true)
    setCurrentPlayer("O")
    restartGameState()
    handleStatusDisplay(currentPlayerTurn(currentPlayer))
    document.querySelectorAll(".game-cell").forEach((cell) => (cell.innerText = ""))
    document.querySelectorAll(".game-cell").forEach((cell) => cell.classList.remove("won"))
    document.querySelectorAll(".game-cell").forEach((cell) => cell.classList.remove("letterX"))
    document.querySelectorAll(".game-cell").forEach((cell) => cell.classList.remove("letterO"))
  }

  useEffect(() => {
    let roundWon = false
    let winningCombination = []
    for (let i = 0; i < winnings.length; i++) {
      const windCondition = winnings[i]
      let position1 = gameState[windCondition[0]],
        position2 = gameState[windCondition[1]],
        position3 = gameState[windCondition[2]]

      if (position1 === "" || position2 === "" || position3 === "") {
        continue
      }

      if (position1 === position2 && position2 === position3) {
        roundWon = true
        winningCombination = windCondition
        break
      }
    }
    if (roundWon) {
      handleStatusDisplay(winMessage())
      const gameCells = document.querySelectorAll(".game-cell")
      winningCombination.forEach((index) => {
        gameCells[index].classList.remove(`letter${currentPlayer}`)
        gameCells[index].classList.add("won")
      })
      setGameActive(false)
      return
    }

    let roundDraw = !gameState.includes("")

    if (roundDraw) {
      handleStatusDisplay(drawMessage())

      setGameActive(false)
      return
    }

    handlePlayerChange()
  }, [gameState])

  const handleCellClick = (clickedEvent) => {
    const clickedCell = clickedEvent.target
    const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return
    }
    currentPlayer === "O" ? clickedCell.classList.add("letterO") : clickedCell.classList.add("letterX")
    handleCellPlayed(clickedCell, clickedCellIndex)
  }

  useEffect(() => {
    handleStatusDisplay(currentPlayerTurn(currentPlayer))
  }, [])

  return (
    <div className='container'>
      <h1 className='title'>Tic tac toe</h1>
      <h2 className='title'>by: jair merlo</h2>
      <div className='game-container'>
        <button className='game-cell' data-index={0} onClick={handleCellClick}></button>
        <button className='game-cell' data-index={1} onClick={handleCellClick}></button>
        <button className='game-cell' data-index={2} onClick={handleCellClick}></button>
        <button className='game-cell' data-index={3} onClick={handleCellClick}></button>
        <button className='game-cell' data-index={4} onClick={handleCellClick}></button>
        <button className='game-cell' data-index={5} onClick={handleCellClick}></button>
        <button className='game-cell' data-index={6} onClick={handleCellClick}></button>
        <button className='game-cell' data-index={7} onClick={handleCellClick}></button>
        <button className='game-cell' data-index={8} onClick={handleCellClick}></button>
      </div>
      <h2 className='game-notification'>{statusDisplay}</h2>
      <button className='game-restart' onClick={handleRestartGame}>
        Restablecer
      </button>
    </div>
  )
}
