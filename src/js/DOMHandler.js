import CreateTask from './task';

/**
 * Класс для взаимодействия с DOM
 * activateAddButtons() вешает обработчик на кнопки "Add a new card" внизу каждой доски;
 * createForm() открывает форму добавления карточки внизу каждой доски;
 * controlForm() задает функционал кнопкам добавления и удаления в каждой форме;
 * mapingForSave() собирает данные карточек в хранилище перед уходом со страницы
 * solveBoards() строит карточки на досках по данным из хранилища
*/

/* eslint-disable class-methods-use-this */
export default class DOMhandler {
  constructor() {
    this.createdForm = null;
    this.todoListArray = [];
    this.wipListArray = [];
    this.doneListArray = [];
  }

  activateAddButtons() {
    const addButtons = document.querySelectorAll('.add-task');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < addButtons.length; i += 1) {
      addButtons[i].addEventListener('click', (event) => {
        event.preventDefault();
        const targetBoard = addButtons[i].closest('.tasker');
        this.createForm(targetBoard);
      });
    }
  }

  createForm(board) {
    this.createdForm = document.createElement('form');
    this.createdForm.className = 'task-input-form';
    this.createdForm.innerHTML = `<textarea class="task-input" name="task-input" placeholder="Type your task here..." rows="4" wrap="soft" required></textarea>
        <div class="form-controls">
          <input class="task-btn" type="submit" value="Submit">
          <div class="close-input">+</div>
      </div>`;
    board.appendChild(this.createdForm);
    this.controlForm(board, this.createdForm);
  }

  controlForm(board, form) {
    const formBtn = form.querySelector('.task-btn');
    const input = form.querySelector('.task-input');
    const closeForm = form.querySelector('.close-input');
    formBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (input.value) {
        const createNewTask = new CreateTask(board, input.value);
        // console.log(inputValue);
        createNewTask.create();
        board.removeChild(form);
      }
    });
    closeForm.addEventListener('click', (e) => {
      e.preventDefault();
      board.removeChild(form);
    });
  }

  mapingForSave() {
    // сделать гибчe
    const todoList = [...document.querySelector('#todo').childNodes[3].childNodes[1].children];
    const wipList = [...document.querySelector('#wip').childNodes[3].childNodes[1].children];
    const doneList = [...document.querySelector('#done').childNodes[3].childNodes[1].children];

    for (const item of todoList) this.todoListArray.push(item.firstChild.innerText);
    for (const item of wipList) this.wipListArray.push(item.firstChild.innerText);
    for (const item of doneList) this.doneListArray.push(item.firstChild.innerText);

    localStorage.clear();
    localStorage.setItem('todo', JSON.stringify(this.todoListArray));
    localStorage.setItem('wip', JSON.stringify(this.wipListArray));
    localStorage.setItem('done', JSON.stringify(this.doneListArray));
  }

  solveBoards() {
    // сделать гибчe
    const todoList = JSON.parse(localStorage.getItem('todo'));
    const wipList = JSON.parse(localStorage.getItem('wip'));
    const doneList = JSON.parse(localStorage.getItem('done'));

    const todoBoard = document.querySelector('#todo');
    const wipBoard = document.querySelector('#wip');
    const doneBoard = document.querySelector('#done');

    for (const item of todoList) {
      const createNewTask = new CreateTask(todoBoard, item);
      createNewTask.create();
    }
    for (const item of wipList) {
      const createNewTask = new CreateTask(wipBoard, item);
      createNewTask.create();
    }
    for (const item of doneList) {
      const createNewTask = new CreateTask(doneBoard, item);
      createNewTask.create();
    }
  }
}

// добавить даблклик на элемент - открыть редактирование popover, переделать
