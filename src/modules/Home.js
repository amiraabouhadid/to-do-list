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
    container.style.position = "";
    container.classList = " container-fluid p-5 ";
    const tasksContainer = document.createElement("div");
    tasksContainer.classList = "  container text-center p-5";
    ////header
    const header = document.createElement("div");
    header.classList =
      "d-flex justify-content-between border p-3 position-static ";
    const title = document.createElement("h3");
    title.innerHTML = "Today's To Do";

    const refreshButton = document.createElement("button");
    refreshButton.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i>`;
    refreshButton.classList = "rounded border-0 bg-white";
    refreshButton.onclick = (e) => {
      window.location.reload();
    };

    header.appendChild(title);
    header.appendChild(refreshButton);

    ////addTask

    const addTaskContainer = document.createElement("div");
    addTaskContainer.classList =
      "d-flex position-static container  justify-content-between border p-3";

    const addTaskInput = document.createElement("input");
    addTaskInput.classList = "border-0  w-100";

    addTaskInput.placeholder = "Add to your list..";
    addTaskInput.type = "text";

    addTaskInput.onchange = this.addTask;
    const addTaskButton = document.createElement("button");
    addTaskButton.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    addTaskButton.classList = "border-0 bg-white";
    addTaskButton.onclick = this.addTask;
    addTaskContainer.appendChild(addTaskInput);
    addTaskContainer.appendChild(addTaskButton);
    //clear tasks
    const incomptasks = document.createElement("div");
    incomptasks.classList = "position-relative container-fluid  ";
    const clearButton = document.createElement("button");
    clearButton.innerHTML = "Clear all completed";
    clearButton.classList =
      "  border p-3 container text-center text-secondary position-absolute ";
    clearButton.style.left = "0";
    clearButton.onclick = (e) => {
      tasks = tasks.filter((el) => !el.complete);
      tasks.map((el, i) => (el.index = i));
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.displayHome();
    };
    ///display incomplete tasks
    const incompleteTasks = document.createElement("div");
    incompleteTasks.innerHTML = "";

    incompleteTasks.classList = " w-100 ";
    incompleteTasks.style.height = (tasks.length * 60).toString() + "px";

    tasks.map((task, i) => {
      const incompleteTask = document.createElement("div");
      incompleteTask.style.cursor = "move";
      incompleteTask.style.left = "0";
      incompleteTask.style.zIndex = "1";
      incompleteTask.style.top = (task.index * 60).toString() + "px";

      incompleteTask.style.height = "60px";
      let diffInPositions = 0,
        startingPosition = 0;
      incompleteTask.ondblclick = (e) => {
        incompleteTask.style.zIndex = "10";
        e.preventDefault();
        startingPosition = e.clientY;

        incompleteTask.onmousemove = (e) => {
          e.preventDefault();
          diffInPositions = startingPosition - e.clientY;
          startingPosition = e.clientY;

          incompleteTask.style.top =
            incompleteTask.offsetTop - diffInPositions + "px";
          incompleteTask.style.left = "0";
        };
        incompleteTask.onmouseup = (e) => {
          // if(incompleteTask.style.top < incompleteTasks.style.height)
          e.preventDefault();
          task.index =
            Math.abs(incompleteTask.offsetTop) < Math.abs(container.offsetTop)
              ? tasks.length - 1
              : Math.floor(Math.abs(incompleteTask.offsetTop / 60));
          console.log(task.index);
          tasks.splice(i, 1);
          tasks.splice(task.index, 0, task);
          tasks.map((el, i) => (el.index = i));
          localStorage.setItem("tasks", JSON.stringify(tasks));

          this.displayHome();
        };
      };

      incompleteTask.classList =
        " d-flex border p-3 container justify-content-between align-items-baseline bg-white position-absolute  ";
      const taskContainerDesc = document.createElement("div");
      taskContainerDesc.classList =
        "d-flex align-items-baseline justify-content-between ";
      const incompleteTaskCheck = document.createElement("input");
      incompleteTaskCheck.type = "checkbox";
      incompleteTaskCheck.onclick = (e) => {
        e.preventDefault();
        if (task.complete === true) {
          //true
          task.complete = false;
        } else {
          //false
          task.complete = true;
        }
        tasks.map((el, i) => {
          if (el == task) {
            el.complete = task.complete;
          }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));

        this.displayHome();
      };
      incompleteTaskCheck.style.marginRight = "1rem";
      const incompleteTaskDescription = document.createElement("p");
      incompleteTaskDescription.innerHTML = task.description;
      if (task.complete == true) {
        incompleteTaskDescription.style.textDecoration = "line-through";
        incompleteTaskCheck.checked = true;
      }

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
    ///add footer
    const footer = document.createElement("div");
    footer.classList =
      "bg-light border text-center text-secondary fixed-bottom";

    const footerText = document.createElement("p");
    footerText.innerHTML =
      'Copyrights <i class="fas fa-copyright"></i> Amira Abouhadid';
    footer.appendChild(footerText);
    ///add all elements
    incomptasks.appendChild(incompleteTasks);
    incomptasks.appendChild(clearButton);
    tasksContainer.appendChild(header);
    tasksContainer.appendChild(addTaskContainer);
    tasksContainer.appendChild(incomptasks);

    container.appendChild(tasksContainer);
    container.appendChild(footer);
  };
}
