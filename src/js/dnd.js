export default class Moving {
  constructor() {
    this.draggedEl = null;
    this.ghostEl = null;
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
    if (evt.target.classList.contains('todo-task')) {
      this.draggedEl = evt.target;
      this.ghostEl = this.draggedEl.cloneNode(true);
      this.draggedEl.classList.add('selected');
      this.ghostEl.classList.add('dragged');
      document.body.appendChild(this.ghostEl);
    }
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
    // eslint-disable-next-line max-len
    closest.appendChild(this.draggedEl); // evt.currentTarget.insertBefore(this.draggedEl, closest);
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
