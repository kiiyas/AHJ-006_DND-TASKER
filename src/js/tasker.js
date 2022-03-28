import CreateTask from './task';

export default class Tasker {
  constructor(params) {
    this.params = params;
    this.board = null;
    this.value = null;
    this.createTask = new CreateTask(board, value);
  }

  init() {

    this.createTask.create();
  }




}
