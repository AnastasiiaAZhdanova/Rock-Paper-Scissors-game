function renderWaitGameBlock(container) {
    const h2 = document.createElement('h2');
    h2.textContent = 'Ожидаем подключение соперника...';
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
                    if (response['game-status'].status !== 'waiting-for-start') {
                        window.application.renderScreen('play');
                    }
                } else {
                    console.warn(response.message);
                }
            }
        })
    }, 500)

    window.application.timers.push(intervalId);

}

window.application.blocks['wait-game'] = renderWaitGameBlock;



function renderWaitGameScreen() {
    const h1 = document.createElement('h1');
    h1.textContent = 'Игра';
    h1.classList.add('head', 'font');

    const div = document.createElement('div');
    div.classList.add('main');

    const img = document.createElement('img');
    img.setAttribute('src', './img/waiting.png');
    div.appendChild(img);

    window.application.renderBlock('wait-game', div);
    
    APP_CONTAINER.appendChild(h1);
    APP_CONTAINER.appendChild(div);
}

window.application.screens['wait-game'] = renderWaitGameScreen;