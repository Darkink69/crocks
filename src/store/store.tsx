import { makeAutoObservable } from "mobx";

class Store {
  steps = JSON.parse(localStorage.getItem("crocks") || "{}").steps || 0;
  coins = 999;
  tonBalance = 0;
  user: any;
  start = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSteps(steps: number) {
    this.steps = steps;
  }

  setTons(tons: number) {
    // this.tonBalance = tons / 1000000000;
    this.tonBalance = Number("0." + String(tons).substring(0, 3));
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
