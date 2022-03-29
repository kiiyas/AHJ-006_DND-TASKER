/* eslint-disable no-multiple-empty-lines */

/*
в локалсторэдж - данные инпута, живой массив созданных и не удаленных тасков
(если даблклик на элемент - открыть редактирование popover, переделать --> класс DOMHandler)

*/
import DOMhandler from './DOMHandler';

const binder = new DOMhandler();
// подстановка из LocalStorage
try {
  binder.solveBoards();
} catch (e) {
  console.error(e);
}

binder.activateAddButtons();


// сохранение в LocalStorage
window.addEventListener('beforeunload', () => {
  binder.mapingForSave();
});
