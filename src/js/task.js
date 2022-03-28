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
  }

  create() {
    this.createdTask = document.createElement('li');
    this.createdTask.className = 'todo-task';
    this.createdTask.innerHTML = `<span>${this.inputValue}</span><div class="close-task hidden">+</div>`;
    this.list.appendChild(this.createdTask);
    this.addCloseButton(this.createdTask);
  }

  // eslint-disable-next-line class-methods-use-this
  addCloseButton(task) {
    document.addEventListener('mouseover', (event) => {
      if (event.target === task) {
        // TODO отрисовывать кликабельный крестик абсолютом поверх карточки
        task.children[1].classList.remove('hidden');
        task.children[1].addEventListener('click', () => {
          this.list.removeChild(task);
        });
      }
    });
    document.addEventListener('mouseout', (event) => {
      if (event.target === task) {
        task.children[1].classList.add('hidden');
      }
    });
  }
}
