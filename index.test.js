import { getTasks } from "./src/modules/getTasks";
import Home from "./src/modules/Home";
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
let window;
beforeEach(() => {
  localStorage.clear();
});

describe("add and delete task", () => {
  test("adds task", () => {
    console.log("starting first test...");
    let tasks;
    const e = { target: { value: "buy food" } };

    Home.addTask(e);
    tasks = getTasks();
    expect(tasks).toHaveLength(1);
  });
  test("deletes task", () => {
    console.log("starting second test...");
    let initialTasks = [
      { complete: "true", description: "buy batteries", index: "0" },
      { complete: "false", description: "buy batteries", index: "1" },
    ];
    localStorage.setItem("tasks", JSON.stringify(initialTasks));

    Home.deleteTask(initialTasks[0]);
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    expect(tasks).toHaveLength(1);
  });
});
