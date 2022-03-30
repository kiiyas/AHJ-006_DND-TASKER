export default class Moving {
  constructor() {
    this.draggedEl = null;
    this.ghostEl = null;
    // this.itemsEl = document.querySelectorAll('.todo-list');
    this.container = document.querySelector('.container');
    // this.down = this.down.bind(this);
    // this.move = this.move.bind(this);
    // this.up = this.up.bind(this);
    // this.leave = this.leave.bind(this);
  }

  init() {
    document.addEventListener('mousedown', this.down);
    document.addEventListener('mousemove', this.move);
    document.addEventListener('mouseup', this.up);
    document.querySelector('.container').addEventListener('mouseleave', this.leave);
  }

  // mousedown - фиксация начала перемещения элемента
  // eslint-disable-next-line class-methods-use-this
  down(evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains('todo-task')) {
      return;
    }
    this.draggedEl = evt.target;
    this.ghostEl = evt.target.cloneNode(true);
    this.draggedEl.classList.add('selected');
    this.ghostEl.classList.add('dragged');
    // this.ghostEl.style.width = this.draggedEl.style.width;
    // this.ghostEl.style.height = this.draggedEl.style.height;
    document.body.appendChild(this.ghostEl);
    this.ghostEl.style.left = `${evt.pageX - this.ghostEl.offsetWidth / 2}px`;
    this.ghostEl.style.top = `${evt.pageY - this.ghostEl.offsetHeight / 2}px`;
  }

  // mousemove - установка top / left элемента
  // eslint-disable-next-line class-methods-use-this
  move(evt) {
    evt.preventDefault(); // не даём выделять элементы
    if (!this.draggedEl) {
      return;
    }
    this.ghostEl.style.left = `${evt.pageX - this.ghostEl.offsetWidth / 2}px`;
    this.ghostEl.style.top = `${evt.pageY - this.ghostEl.offsetHeight / 2}px`;
  }

  // mouseup - принятие решение о итоговом местоположении
  // eslint-disable-next-line class-methods-use-this
  up(evt) {
    if (!this.draggedEl) {
      return;
    }
    const closest = document.elementFromPoint(evt.clientX, evt.clientY);
    // console.log(closest); // список, куда перемещаем
    // if (closest.classList.contains('todo-list')) {}
    closest.appendChild(this.draggedEl);
    document.body.removeChild(this.ghostEl);
    this.draggedEl.classList.remove('selected');
    this.ghostEl = null;
    this.draggedEl = null;
  }

  leave() {
    // при уходе курсора за границы контейнера - отменяем перенос
    if (!this.draggedEl) {
      return;
    }
    document.body.removeChild(this.ghostEl);
    this.ghostEl = null;
    this.draggedEl = null;
  }
}
