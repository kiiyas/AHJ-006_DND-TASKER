import CreateTask from './task';

/**
 * Класс для взаимодействия с DOM
 * activateAddButtons() вешает обработчик на кнопки "Add a new card" внизу каждой доски;
 * createForm() открывает форму добавления карточки внизу каждой доски;
 * controlForm() задает функционал кнопкам добавления и удаления в каждой форме;
*/

/* eslint-disable class-methods-use-this */
export default class DOMhandler {
  constructor() {
    this.createdForm = null;
  }

  activateAddButtons() {
    const addButtons = document.querySelectorAll('.add-task');
    // console.log(addButtons);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < addButtons.length; i++) {
      addButtons[i].addEventListener('click', (event) => {
        event.preventDefault();
        const targetBoard = addButtons[i].closest('.tasker');
        // console.log(targetBoard);
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
}
