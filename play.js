function renderPlayBlock(container) {

    const wrapRock = document.createElement('div');
    wrapRock.classList.add('wrap');

    const imgRock = document.createElement('img');
    imgRock.classList.add('img-rock');
    imgRock.setAttribute('src', './img/rock.png');

    wrapRock.appendChild(imgRock);

    const btnRock = document.createElement('button');
    btnRock.textContent = 'Камень';
    btnRock.classList.add('button', 'font');
    wrapRock.appendChild(btnRock);

    btnRock.addEventListener('click', () => {
        handleMove('rock');
    });

    container.appendChild(wrapRock);

    const wrapScissors = document.createElement('div');
    wrapScissors.classList.add('wrap');

    const imgScissors = document.createElement('img');
    imgScissors.classList.add('img-scissors');
    imgScissors.setAttribute('src', './img/scissors.png');

    wrapScissors.appendChild(imgScissors);

    const btnScissors = document.createElement('button');
    btnScissors.textContent = 'Ножницы';
    btnScissors.classList.add('button', 'font');
    wrapScissors.appendChild(btnScissors);

    btnScissors.addEventListener('click', () => {
        handleMove('scissors');
    });

    container.appendChild(wrapScissors);

    const wrapPaper = document.createElement('div');
    wrapPaper.classList.add('wrap');

    const imgPaper = document.createElement('img');
    imgPaper.classList.add('img-paper');
    imgPaper.setAttribute('src', './img/paper.png');

    wrapPaper.appendChild(imgPaper);

    const btnPaper = document.createElement('button');
    btnPaper.textContent = 'Бумага';
    btnPaper.classList.add('button', 'font');
    wrapPaper.appendChild(btnPaper);

    btnPaper.addEventListener('click', () => {
        handleMove('paper');
    });

    container.appendChild(wrapPaper);

    function handleMove(move) {
        request({
            url: `${HOST}/play`,
            params: {
                token: window.application.token,
                id: window.application.gameId,
                move: move,
            },
            onSuccess: (response) => {
                if (response.status === 'ok') {
                    const status = response['game-status'].status;
                    switch (status) {
                        case 'waiting-for-enemy-move':
                            window.application.renderScreen('wait-enemy-move');
                            break;
                        case 'lose':
                            window.application.renderScreen('lose');
                            break;
                        case 'win':
                            window.application.renderScreen('win');
                            break;
                        default:
                            console.log('Ничья, делаем ход заново');
                            window.application.renderScreen('wait-enemy-move');
                            break;
                    }
                } else {
                    console.warn(response.message);
                    window.application.renderScreen('auth');
                }
            }
        })
    }
}

window.application.blocks['play'] = renderPlayBlock;


function renderPlayScreen() {
    const h1 = document.createElement('h1');
    h1.textContent = 'Игра';
    h1.classList.add('head', 'font');

    const div = document.createElement('div');
    div.classList.add('main');

    window.application.renderBlock('play', div);

    APP_CONTAINER.appendChild(h1);
    APP_CONTAINER.appendChild(div);
}

window.application.screens['play'] = renderPlayScreen;