function renderAuthBlock(container) {
    
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Введите никнейм');
    input.classList.add('input', 'font');
    container.appendChild(input);

    const button = document.createElement('button');
    button.textContent = 'Войти';
    button.classList.add('button', 'font');

    button.addEventListener('click', () => {
        request({
            url: `${HOST}/login`,
            params: {
                login: input.value,
            },
            onSuccess: (response) => {
                if (response.status === 'ok') {
                    const { token } = response;
                    window.application.token = token;

                    request({
                        url: `${HOST}/player-status`,
                        params: {
                            token: token,
                        },
                        onSuccess: (response) => {
                            if (response.status === 'ok') {
                                if (response['player-status'].status === 'lobby') {
                                    window.application.renderScreen('lobby');
                                } else {
                                    window.application.renderScreen('play');
                                }
                            } else {
                                console.warn('Не удалось получить статус');
                            }
                        }
                    })

                } else {
                    console.warn('Не удалось авторизоваться');
                }

            }
        });
    });

    container.appendChild(button);

}

window.application.blocks['auth'] = renderAuthBlock;



function renderAuthScreen() {
    const div = document.createElement('div');
    div.classList.add('main');

    const title = document.createElement('h1');
    title.textContent = 'Камень, ножницы, бумага';
    title.classList.add('head', 'font');
    div.appendChild(title);

    const img = document.createElement('img');
    img.setAttribute('src', './img/Mask\ group.png');
    div.appendChild(img);

    window.application.renderBlock('auth', div);

    APP_CONTAINER.appendChild(div);
}
window.application.screens['auth'] = renderAuthScreen;

window.application.renderScreen('auth');