import React, {useState} from 'react';


let lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const Board = () => {
    const [square, setSquare] = useState(Array(9).fill(null))
    const [history, setHistory] = useState([])
    let win
    const generateValue = (idx) => {
        if (winner || square[idx] !== null) return
        const corySquares = [...square]
        corySquares[idx] = nextPlayer(square)
        setSquare(corySquares)
        setHistory([...history, `сделал ход ${nextPlayer(square)} по ячейке ${idx + 1}`])
    }

    const nextPlayer = (square) => {
        const countX = square.filter(el => el === 'x').length
        const countY = square.filter(el => el === 'o').length
        return countX <= countY ? 'x' : 'o'
    }

    const detectWinner = (square) => {
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (square[a] && square[a] === square[b] && square[a] === square[c]) {
                win = lines[i]
                return square[a]
            }
        }
        return null
    }

    const finalResult = () => {
        return winner ? `Win: ${winner}` : square.includes(null) ? 'Next step' : 'Draw'
    }

    let winner = detectWinner(square)
    let final = finalResult()

    const resetGame = () => {
        setSquare(Array(9).fill(null))
        setHistory([])
    }

    return (
        <div>
            <div className="board">
                <div className="board-box">
                    {
                        square.map((el, idx) => (
                            <button onClick={() => generateValue(idx)}
                                    className={winner && (win.includes(idx) ? "green" : "red")}>{square[idx]}</button>
                        ))
                    }
                    <div className="result">{final}</div>
                </div>
                <button className="reset" onClick={resetGame}>Reset</button>
            </div>
            <div className="history-board">
                {
                    history.map(el => (
                        <li style={{listStyle: "none"}}>{el}</li>
                    ))
                }
            </div>
        </div>
    );
};

export default Board;