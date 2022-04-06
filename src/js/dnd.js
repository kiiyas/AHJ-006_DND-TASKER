// import CreateTask from './task';

export default class Moving {
  constructor() {
    this.draggedEl = null;
    this.ghostEl = null;
    // this.field = document.querySelectorAll('.list');
    // this.taskSetter = new CreateTask();
  }

  init() {
    // for (const item of this.field) {}
    document.addEventListener('mousedown', this.down);
    document.addEventListener('mousemove', this.move);
    document.addEventListener('mouseup', this.up);
    // document.querySelector('.container').addEventListener('mouseleave', this.leave);
  }

  // mousedown - фиксация начала перемещения элемента
  // eslint-disable-next-line class-methods-use-this
  down(evt) {
    if (evt.target.classList.contains('todo-task')) {
      document.body.style.cursor = 'grabbing';
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
    evt.preventDefault();
    if (!this.draggedEl) {
      return;
    }
    this.ghostEl.style.left = `${evt.pageX - this.ghostEl.offsetWidth / 2}px`;
    this.ghostEl.style.top = `${evt.pageY - this.ghostEl.offsetHeight / 2}px`;

    // планировка места под карточку
    if (document.querySelector('.ghosted')) {
      document.querySelector('.ghosted').remove();
    }

    const targetElement = document.elementFromPoint(evt.clientX, evt.clientY);
    if (targetElement.classList.contains('selected')) {
      return;
    }
    const planned = document.createElement('li');
    planned.style.height = `${this.draggedEl.offsetHeight}px`;
    planned.className = 'todo-task ghosted';

    if (!targetElement.classList.contains('todo-task') && targetElement.closest('.todo-list')) {
      return;
    }

    if (targetElement.classList.contains('todo-task')) {
      const { top } = targetElement.getBoundingClientRect();
      if (evt.pageY > window.scrollY + top + targetElement.offsetHeight / 2) {
        targetElement.closest('.todo-list').insertBefore(planned, targetElement.nextElementSibling);
      } else {
        targetElement.closest('.todo-list').insertBefore(planned, targetElement);
      }
    }

    if (!targetElement.classList.contains('todo-task') && !targetElement.closest('.todo-list') && targetElement.closest('.tasker')) {
      targetElement.closest('.tasker').querySelector('.todo-list').appendChild(planned);
    }
  }

  // mouseup - принятие решение о итоговом местоположении
  // eslint-disable-next-line class-methods-use-this
  up(evt) {
    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('mouseup', this.up);

    const targetElement = document.elementFromPoint(evt.clientX, evt.clientY);

    if (targetElement.classList.contains('todo-task')) {
      const { top } = targetElement.getBoundingClientRect();
      if (evt.pageY > window.scrollY + top + targetElement.offsetHeight / 2) {
        targetElement.closest('.todo-list').insertBefore(this.ghostEl, targetElement.nextElementSibling);
      } else {
        targetElement.closest('.todo-list').insertBefore(this.ghostEl, targetElement);
      }
    }

    this.ghostEl.classList.remove('dragged');

    // this.taskSetter.addCloseButton();
    this.task = document.querySelectorAll('.todo-task');
    // console.log(this.task);
    for (let i = 0; i < this.task.length; i += 1) {
      const closeCross = this.task[i].querySelector('.close-task');
      this.task[i].addEventListener('mouseover', () => {
        closeCross.style.display = 'block';
        // console.log(this.task[i]);
        this.task[i].querySelector('.close').addEventListener('click', () => {
          this.task[i].remove();
        });
      });

      this.task[i].addEventListener('mouseout', () => {
        closeCross.style.display = 'none';
      });
    }

    document.querySelector('.selected').remove();
    document.querySelector('.ghosted').remove();

    this.ghostEl = null;
    this.draggedEl = null;
    document.body.style.cursor = 'auto';
  }

  // leave() {
  //   // при уходе курсора за границы контейнера - отменяем перенос
  //   if (!this.draggedEl) {
  //     return;
  //   }
  //   document.body.removeChild(this.ghostEl);
  //   this.ghostEl = null;
  //   this.draggedEl = null;
  // }
}
