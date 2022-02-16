import Task from "./Task";

let tasks;
export default class Home extends Task {
  state = { tasks };
  static addTask = (e) => {
    const task = new Task(e.target.value, false, tasks.length);
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.displayHome();
  };

  static displayHome = () => {
    if (localStorage.getItem("tasks")) {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    } else {
      localStorage.setItem("tasks", "");
      tasks = [];
    }
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
    refreshButton.onclick = () => {};

    header.appendChild(title);
    header.appendChild(refreshButton);

    ////addTask

    const addTaskContainer = document.createElement("div");
    addTaskContainer.classList = "d-flex justify-content-between border p-3";

    const addTaskInput = document.createElement("input");
    addTaskInput.classList = "border-0  w-100";

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
    clearButton.onclick = (e) => {
      tasks = tasks.filter((el) => !el.complete);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.displayHome();
    };
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
      incompleteTaskCheck.onchange = (e) => {
        e.preventDefault();
        if (task.complete) {
          //true
          task.complete = false;
          taskContainerDesc.style.textDecoration = "none";
          localStorage.setItem("tasks", JSON.stringify(tasks));
        } else {
          //false
          task.complete = true;
          taskContainerDesc.style.textDecoration = "line-through";
          localStorage.setItem("tasks", JSON.stringify(tasks));
        }
      };
      incompleteTaskCheck.style.marginRight = "1rem";
      const incompleteTaskDescription = document.createElement("p");
      incompleteTaskDescription.innerHTML = task.description;
      incompleteTaskDescription.classList = "";

      taskContainerDesc.appendChild(incompleteTaskCheck);
      taskContainerDesc.appendChild(incompleteTaskDescription);

      const editTaskButton = document.createElement("button");
      editTaskButton.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`;
      editTaskButton.style.marginRight = "0.65rem";
      editTaskButton.classList = "border-0 bg-white";
      editTaskButton.onclick = (e) => {
        const editTaskInput = document.createElement("input");
        editTaskInput.type = "text";
        editTaskInput.value = incompleteTaskDescription.innerHTML;
        editTaskInput.classList = "border-0";
        editTaskInput.onchange = (e) => {
          task.description = e.target.value;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          this.displayHome();
        };

        const deleteTaskButton = document.createElement("button");
        deleteTaskButton.classList = "border-0 bg-white";
        deleteTaskButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        deleteTaskButton.onclick = (e) => {
          tasks = tasks.filter((el) => el !== task);
          tasks.map((el, i) => (el.index = i));
          localStorage.setItem("tasks", JSON.stringify(tasks));

          this.displayHome();
        };
        taskContainerDesc.appendChild(editTaskInput);
        incompleteTask.appendChild(deleteTaskButton);
        editTaskButton.style.display = "none";
        incompleteTaskDescription.style.display = "none";
      };
      incompleteTask.appendChild(taskContainerDesc);
      incompleteTask.appendChild(editTaskButton);
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
