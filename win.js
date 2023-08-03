function renderWinBlock(container) {
    const img = document.createElement('img');
    img.setAttribute('src', './img/win.png');
    container.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = 'Вы выиграли!';
    h2.classList.add('font');
    container.appendChild(h2);
}

window.application.blocks['win'] = renderWinBlock;

function renderWinScreen() {
    const h1 = document.createElement('h1');
    h1.textContent = 'Игра';
    h1.classList.add('head', 'font');

    const div = document.createElement('div');
    div.classList.add('main');

    window.application.renderBlock('win', div);
    window.application.renderBlock('to-lobby', div);
    window.application.renderBlock('start-button', div);

    APP_CONTAINER.appendChild(h1);
    APP_CONTAINER.appendChild(div);
}

window.application.screens['win'] = renderWinScreen;