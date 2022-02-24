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

describe("adds, deletes, edits, checks and clears completed task", () => {
  beforeEach(() => {
    localStorage.removeItem("tasks");
    let tasks = [];
  });
  test("adds task", () => {
    const e = { target: { value: "buy food" } };
    let tasks = [];
    Home.addTask(e);
    tasks = JSON.parse(localStorage.getItem("tasks"));
    expect(tasks).toHaveLength(1);
  });
  test("deletes task and updates tasks array", () => {
    let tasks = [
      { description: "buy batteries", complete: false, index: 0 },
      { description: "buy shoes", complete: false, index: 1 },
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tasks = JSON.parse(localStorage.getItem("tasks"));
    Home.deleteTask(tasks, tasks[0]);
    tasks = JSON.parse(localStorage.getItem("tasks"));
    expect(tasks).toHaveLength(1);
  });
  test("deletes the right task from the tasks array", () => {
    let tasks = [
      { description: "buy batteries", complete: false, index: 0 },
      { description: "buy shoes", complete: false, index: 1 },
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tasks = JSON.parse(localStorage.getItem("tasks"));
    Home.deleteTask(tasks, tasks[0]);
    tasks = JSON.parse(localStorage.getItem("tasks"));
    expect(tasks[0].description).toMatch("buy shoes");
  });
  test("edits the right task from the tasks array", () => {
    let tasks = [
      { description: "buy batteries", complete: false, index: 0 },
      { description: "buy shoes", complete: false, index: 1 },
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tasks = JSON.parse(localStorage.getItem("tasks"));
    let updatedDescription = "buy socks";
    Home.editTask(tasks, tasks[0], updatedDescription);
    tasks = JSON.parse(localStorage.getItem("tasks"));
    expect(tasks[0].description).toMatch("buy socks");
  });
  test("updates task's complete status when checked", () => {
    let tasks = [
      { description: "buy batteries", complete: false, index: 0 },
      { description: "buy shoes", complete: false, index: 1 },
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tasks = JSON.parse(localStorage.getItem("tasks"));
    Home.checkTask(tasks, tasks[0]);
    tasks = JSON.parse(localStorage.getItem("tasks"));
    expect(tasks[0].complete).toBeTruthy();
  });
  test("clears all completed tasks", () => {
    let tasks = [
      { description: "buy batteries", complete: true, index: 0 },
      { description: "buy shoes", complete: false, index: 1 },
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tasks = JSON.parse(localStorage.getItem("tasks"));
    Home.clearCompletedTasks(tasks);
    tasks = JSON.parse(localStorage.getItem("tasks"));
    expect(tasks).toHaveLength(1);
  });
  test("clears the right completed tasks", () => {
    let tasks = [
      { description: "buy batteries", complete: true, index: 0 },
      { description: "buy shoes", complete: false, index: 1 },
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tasks = JSON.parse(localStorage.getItem("tasks"));
    Home.clearCompletedTasks(tasks);
    tasks = JSON.parse(localStorage.getItem("tasks"));
    expect(tasks[0].description).toMatch("buy shoes");
  });
});
