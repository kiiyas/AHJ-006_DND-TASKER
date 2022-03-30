/* eslint-disable no-multiple-empty-lines */

import DOMhandler from './DOMHandler';

const binder = new DOMhandler();
// подстановка из LocalStorage
try {
  binder.solveBoards();
} catch (e) {
  throw new Error(e);
}

// активация кнопок добавления карточек
binder.activateAddButtons();

// сохранение в LocalStorage
window.addEventListener('beforeunload', () => {
  binder.mapingForSave();
});
