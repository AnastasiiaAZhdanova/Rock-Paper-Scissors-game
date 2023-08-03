function renderWaitEnemyMoveBlock(container) {
    const h2 = document.createElement('h2');
    h2.textContent = 'Ожидаем ход соперника...';
    h2.classList.add('subtitle');
    container.appendChild(h2);

    const intervalId = setInterval(() => {
        request({
            url: `${HOST}/game-status`,
            params: {
                token: window.application.token,
                id: window.application.gameId,
            },
            onSuccess: (response) => {
                if (response.status === 'ok') {
                    const status = response['game-status'].status;
                    switch (status) {
                        case 'waiting-for-your-move':
                            window.application.renderScreen('play');
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
                }
            }
        })
    }, 500)

    window.application.timers.push(intervalId);
}
window.application.blocks['wait-enemy-move'] = renderWaitEnemyMoveBlock;




function renderWaitEnemyMoveScreen() {
    const h1 = document.createElement('h1');
    h1.textContent = 'Игра';
    h1.classList.add('head', 'font');

    const div = document.createElement('div');
    div.classList.add('main');

    const img = document.createElement('img');
    img.setAttribute('src', './img/waiting.png');
    div.appendChild(img);

    window.application.renderBlock('wait-enemy-move', div);
    
    APP_CONTAINER.appendChild(h1);
    APP_CONTAINER.appendChild(div);
}

window.application.screens['wait-enemy-move'] = renderWaitEnemyMoveScreen;