/* eslint-disable no-multiple-empty-lines */

import DOMhandler from './DOMHandler';
// import Moving from './dnd';

const binder = new DOMhandler();
// const moving = new Moving();
// подстановка из LocalStorage
if (localStorage.length > 0) {
  binder.solveBoards();
}


// активация кнопок добавления карточек
binder.activateAddButtons();
// moving.init();

// сохранение в LocalStorage
window.addEventListener('beforeunload', () => {
  binder.mapingForSave();
});
