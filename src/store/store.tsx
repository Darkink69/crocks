import { makeAutoObservable } from "mobx";

class Store {
  steps = JSON.parse(localStorage.getItem("crocks") || "{}").steps || 0;
  mo = 0

  start = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSteps(steps: number) {
    this.steps = steps;
  }
  setMo(mo: number) {
    this.mo = mo;
  }

  setStart(start: boolean) {
    this.start = start;
  }
}

export default new Store();
