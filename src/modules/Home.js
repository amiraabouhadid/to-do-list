import Task from "./Task";

let tasks = [
  { description: "wash the dishes", complete: false, index: 0 },
  { description: "homework", complete: false, index: 1 },
];
export default class Home {
  static addTask = (e) => {
    const task = new Task(e.target.value, false, tasks.length);
    tasks.push(task);
    console.log(tasks);
    this.displayHome();
  };
  static clearTasks = (e) => {
    tasks = [];
    this.displayHome;
  };
  static checkTask = (e) => {
    e.target.value = true;
    console.log(e.target.value);
    console.log(tasks);
  };
  static displayHome = () => {
    const container = document.getElementById("home-container");
    container.innerHTML = "";
    container.classList = "container-fluid p-5";
    const tasksContainer = document.createElement("div");
    tasksContainer.classList = "text-center p-5";
    ////header
    const header = document.createElement("div");
    header.classList = "d-flex justify-content-between border p-3";
    const title = document.createElement("h3");
    title.innerHTML = "Today's To Do";

    const refreshButton = document.createElement("button");
    refreshButton.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i>`;
    refreshButton.classList = "rounded border-0 bg-white";

    header.appendChild(title);
    header.appendChild(refreshButton);

    ////addTask

    const addTaskContainer = document.createElement("div");
    addTaskContainer.classList = "d-flex justify-content-between border p-3";

    const addTaskInput = document.createElement("input");
    addTaskInput.classList = "border-0";
    addTaskInput.placeholder = "Add to your list..";
    addTaskInput.type = "text";
    addTaskInput.onchange = this.addTask;
    const addTaskButton = document.createElement("button");
    addTaskButton.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    addTaskButton.classList = "border-0 bg-white";
    addTaskContainer.appendChild(addTaskInput);
    addTaskContainer.appendChild(addTaskButton);
    //clear tasks

    const clearButton = document.createElement("button");
    clearButton.innerHTML = "Clear all completed";
    clearButton.classList = "text-secondary border p-3 w-100";
    clearButton.onclick = this.clearTasks;
    ///display incomplete tasks
    const incompleteTasks = document.createElement("div");

    tasks.map((task, i) => {
      const incompleteTask = document.createElement("div");
      incompleteTask.classList =
        "border p-3 d-flex flex-nowrap justify-content-between align-items-baseline ";
      const taskContainerDesc = document.createElement("div");
      taskContainerDesc.classList =
        "d-flex align-items-baseline justify-content-between";
      const incompleteTaskCheck = document.createElement("input");
      incompleteTaskCheck.type = "checkbox";
      incompleteTaskCheck.onchange = this.checkTask;
      incompleteTaskCheck.style.marginRight = "1rem";
      const incompleteTaskDescription = document.createElement("p");
      incompleteTaskDescription.innerHTML = task.description;
      incompleteTaskDescription.classList = "";

      taskContainerDesc.appendChild(incompleteTaskCheck);
      taskContainerDesc.appendChild(incompleteTaskDescription);

      const editTask = document.createElement("i");
      editTask.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`;
      editTask.style.marginRight = "0.75rem";
      editTask.classList = "border-0 bg-white";
      incompleteTask.appendChild(taskContainerDesc);
      incompleteTask.appendChild(editTask);
      incompleteTasks.appendChild(incompleteTask);
    });
    ///add all elements
    tasksContainer.appendChild(header);
    tasksContainer.appendChild(addTaskContainer);
    tasksContainer.appendChild(incompleteTasks);
    tasksContainer.appendChild(clearButton);
    container.appendChild(tasksContainer);
  };
}
