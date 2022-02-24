function getTasks() {
  let tasks;
  console.log("not using mock");
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  } else {
    localStorage.setItem("tasks", "");
    tasks = [];
  }
  return tasks;
}
exports.getTasks = getTasks;
