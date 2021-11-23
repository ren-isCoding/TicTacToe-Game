function startGame() {
    let tiles = Array.from(document.querySelectorAll('.tile'))
    let turnDisplay = document.querySelector('.display-turn')
    let playerDisplay = document.querySelector('.display-player')
    let resultsDisplay = document.querySelector('.display-results')
    let restartButton = document.querySelector('#restart')

    let board = ['', '', '', '', '', '', '', '', '']
    let isGameActive = true
    let currentPlayer = 'X'

    let playerX_Won = 'playerX_Won'
    let playerO_Won = 'playerO_Won'
    let Tie = 'Tie'

    let winningConditions =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function handleResultValidation() {
        let roundWon = false
        for (let i = 0; i <= 7; i++) {
            let winCondtion = winningConditions[i]
            let a = board[winCondtion[0]]
            let b = board[winCondtion[1]]
            let c = board[winCondtion[2]]
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true
                break;
            }
        }

        if (roundWon) {
            isGameActive = false
            turnDisplay.classList.add('hide')
            resultsDisplay.classList.remove('hide')
            announce(currentPlayer === 'X' ? playerX_Won : playerO_Won)
            return;
        }

        if (!board.includes('')) {
            turnDisplay.classList.add('hide')
            resultsDisplay.classList.remove('hide')
            announce(Tie)
        }
    }

    function announce(type) {
        switch(type) {
            case playerO_Won:
                resultsDisplay.innerHTML = 'Player <span class="playerO">O</span> has won!'
                break
            case playerX_Won:
                resultsDisplay.innerHTML = 'Player <span class="playerX">X</span> has won!'
                break
            case Tie:
                resultsDisplay.innerHTML = "It's a tie!"
        }
    }

    function isTileFree(tile) {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        } 
        return true;
    }

    function updateBoard(index) {
        board[index] = currentPlayer
    }

    function changePlayer() {
        playerDisplay.classList.remove(`player${currentPlayer}`)
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        playerDisplay.innerText = currentPlayer
        playerDisplay.classList.add(`player${currentPlayer}`)
    }

    function userAction(tile, index) {
        if (isTileFree(tile) && isGameActive) {
            tile.innerText = currentPlayer
            tile.classList.add(`player${currentPlayer}`)
            updateBoard(index)
            handleResultValidation()
            changePlayer()
        }
    }

    let resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', '']
        resultsDisplay.classList.add('hide')
        turnDisplay.classList.remove('hide')
        isGameActive = true
        
        if (currentPlayer === 'O') {
            changePlayer()
        }

        tiles.forEach(tile => {
            tile.innerText = ''
            tile.classList.remove('playerX')
            tile.classList.remove('playerO')
        })

    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index))
    })

    
    restartButton.addEventListener('click', resetBoard)
}
startGame()