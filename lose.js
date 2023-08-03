function renderLoseBlock(container) {
    const img = document.createElement('img');
    img.setAttribute('src', './img/lose.png');
    container.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = 'Вы проиграли!';
    h2.classList.add('font');
    container.appendChild(h2);
}

window.application.blocks['lose'] = renderLoseBlock;

function renderToLobbyBlock(container) {
    const button = document.createElement('button');
    button.textContent = 'В лобби';
    button.classList.add('button', 'font');

    button.addEventListener('click', () => {
        window.application.renderScreen('lobby');
    });

    container.appendChild(button);
}

window.application.blocks['to-lobby'] = renderToLobbyBlock;

function renderLoseScreen() {
    const h1 = document.createElement('h1');
    h1.textContent = 'Игра';
    h1.classList.add('head', 'font');

    const div = document.createElement('div');
    div.classList.add('main');

    window.application.renderBlock('lose', div);
    window.application.renderBlock('to-lobby', div);
    window.application.renderBlock('start-button', div);

    APP_CONTAINER.appendChild(h1);
    APP_CONTAINER.appendChild(div);
}

window.application.screens['lose'] = renderLoseScreen;