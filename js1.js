const HOST = 'https://skypro-rock-scissors-paper.herokuapp.com';
const APP_CONTAINER = document.querySelector('.app');

window.application = {
  blocks: {},
  screens: {},
  renderScreen: function(screenName) {
    window.application.timers.forEach(id=>{
      clearInterval(id);
    })
    if (window.application.screens[screenName]){
      APP_CONTAINER.innerHTML = '';
      window.application.screens[screenName]();
    } else {
      console.warn(`Экрана ${screenName} не существует!`)
    }
  },
  renderBlock: function(blockName, container) {
    if (window.application.blocks[blockName]){
      window.application.blocks[blockName](container);
    } else {
      console.warn(`Блока ${blockName} не существует!`)
    }
  },
  timers: []
}

