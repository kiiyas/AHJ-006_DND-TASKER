/* eslint-disable no-multiple-empty-lines */


/*
в локалсторэдж - данные инпута, живой массив созданных и не удаленных тасков

класс DOMHandler
класс Tasker
класс Task


onload - добавление клика на document,
  * определить, где инпут и его значение, кнопка, форма и пр --> класс DOMHandler
  если event.target - кнопка submit, то
    взять в этой форме input.value и создать элемент task на его основе  --> класс Task
      (в классе Task создать разметку элемента, поведение крестика, нажатий и пр)
      (если создан - поставить в DOM --> класс DOMHandler)
      (если крестик - удалить из DOM --> класс DOMHandler)
      (если клик на элемент - удалить из туду, поставить в дан --> класс DOMHandler)
      (если даблклик на элемент - открыть редактирование popover, переделать --> класс DOMHandler)
    если туду-тасков больше 7, то скроллить этот div --> класс Tasker, DOMHandler
    если дан-тасков больше 6, то удалять нижний (в посл.в архив?) --> класс Tasker, DOMHandler


onload - добавление энтера на кнопку submit
.......
*/
import DOMhandler from './DOMHandler';

const binder = new DOMhandler();
binder.activateAddButtons();



