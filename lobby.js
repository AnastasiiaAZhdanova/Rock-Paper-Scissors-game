function renderPlayersListBlock(container) {
    const ul = document.createElement('ul');
    ul.classList.add('ul', 'font');
    container.appendChild(ul);

    const idInterval = setInterval(() => {
        request({
            url: `${HOST}/player-list`,
            params: {
                token: window.application.token,
            },
            onSuccess: (response) => {
                if (response.status === 'ok') {
                    ul.replaceChildren();
                    response.list.forEach(item => {
                        console.log('item', item);
                        const li = document.createElement('li');
                        li.classList.add('input', 'font', 'li');
                        li.textContent = item.login;
                        ul.appendChild(li);
                    });
                } else {
                    console.warn('Не удалось получить список игроков');
                }
            }
        })
    }, 1000);

    window.application.timers.push(idInterval);

}

window.application.blocks['players-list'] = renderPlayersListBlock;



function renderStartButtonBlock(container) {
    const button = document.createElement('button');
    button.textContent = 'Играть';
    button.classList.add('button', 'font');

    button.addEventListener('click', () => {
        request({
            url: `${HOST}/start`,
            params: {
                token: window.application.token,
            },
            onSuccess: (response) => {
                if (response.status === 'ok') {
                    window.application.gameId = response['player-status'].game.id;
                    window.application.renderScreen('wait-game');
                } else {
                    console.warn(response.message);
                }
            }
        })
    });
    container.appendChild(button);
}

window.application.blocks['start-button'] = renderStartButtonBlock;



function renderLobbyScreen() {
    const h1 = document.createElement('h1');
    h1.textContent = 'Лобби';
    h1.classList.add('head', 'font');

    const div = document.createElement('div');
    div.classList.add('main');

    window.application.renderBlock('players-list', div);
    window.application.renderBlock('start-button', div);

    APP_CONTAINER.appendChild(h1);
    APP_CONTAINER.appendChild(div);

}

window.application.screens['lobby'] = renderLobbyScreen;

