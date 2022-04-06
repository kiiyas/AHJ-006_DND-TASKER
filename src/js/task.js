/**
 * Класс для создания отдельной карточки
 * create() создает карточку в ответ на клик по кнопке добавления карточки;
 * addCloseButton() активирует крестик на каждой карточке при наведении на нее;
*/

export default class CreateTask {
  constructor(board, value) {
    this.board = board;
    this.list = this.board.querySelector('.todo-list');
    this.task = null;
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
    // this.addCloseButton(this.createdTask);
  }

  insert() {
    this.list.appendChild(this.createdTask);
  }

  // eslint-disable-next-line class-methods-use-this
  addCloseButton() {
    this.task = document.querySelectorAll('.todo-task');
    // console.log(this.task);
    for (let i = 0; i < this.task.length; i += 1) {
      this.closeCross = this.task[i].querySelector('.close-task');
      this.task[i].addEventListener('mouseover', () => {
        this.closeCross.style.display = 'block';
        // console.log(this.task[i]);
        this.task[i].querySelector('.close').addEventListener('click', () => {
          this.task[i].remove();
        });
      });

      this.task[i].addEventListener('mouseout', () => {
        this.closeCross.style.display = 'none';
      });
    }
  }
}
