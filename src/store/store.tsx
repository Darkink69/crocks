import { makeAutoObservable } from "mobx";

class Store {
  steps = JSON.parse(localStorage.getItem("crocks") || "{}").steps || 0;
  user: any;
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

  setUser(user: any) {
    this.user = user;
  }
}

export default new Store();
