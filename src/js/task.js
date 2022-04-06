/**
 * Класс для создания отдельной карточки
 * create() создает карточку в ответ на клик по кнопке добавления карточки;
 * addCloseButton() активирует крестик на каждой карточке при наведении на нее;
*/

export default class CreateTask {
  constructor(board, value) {
    this.board = board;
    this.list = this.board.querySelector('.todo-list');
    this.inputValue = value;
    this.createdTask = null;
    this.closeCross = null;
  }

  create() {
    this.createdTask = document.createElement('li');
    this.createdTask.className = 'todo-task';
    this.createdTask.innerHTML = `<span>${this.inputValue}</span>
    <div class="close">
    <div class="close-task">+</div>
    </div>`;
    this.addCloseButton(this.createdTask);
  }

  insert() {
    this.list.appendChild(this.createdTask);
  }

  // eslint-disable-next-line class-methods-use-this
  addCloseButton(task) {
    document.addEventListener('mouseover', (event) => {
      if (event.target === task || event.target === task.querySelector('span') || event.target === task.querySelector('.close')) {
        this.closeCross = task.querySelector('.close-task');
        this.closeCross.style.display = 'block';
        task.querySelector('.close').addEventListener('click', () => {
          task.remove();
        });
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target === task) {
        this.closeCross.style.display = 'none';
      }
    });
  }
}
