function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  } else {
    localStorage.setItem("tasks", "");
    tasks = [];
  }
  return tasks;
}
exports.getTasks = getTasks;
