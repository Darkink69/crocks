import { makeAutoObservable } from "mobx";

class Store {
  steps = 0;
  start = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSteps(steps: number) {
    this.steps = steps;
  }

  setStart(start: boolean) {
    this.start = start;
  }
}

export default new Store();
