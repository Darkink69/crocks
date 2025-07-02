import { makeAutoObservable } from "mobx";

class Store {
  steps = JSON.parse(localStorage.getItem("crocks") || "{}").steps || 0;
  coins = 999;
  user: any;
  start = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSteps(steps: number) {
    this.steps = steps;
  }

  setCoins(coins: number) {
    this.coins = coins;
  }

  setStart(start: boolean) {
    this.start = start;
  }

  setUser(user: any) {
    this.user = user;
  }
}

export default new Store();
