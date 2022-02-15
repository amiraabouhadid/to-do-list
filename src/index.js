import _ from "lodash";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
let tasks = [];
function addTask() {}
function displayTask() {
  const element = document.createElement("li");
  element.innerHTML = "hey";
  element.style.color = "black";
  return element;
}

document.body.appendChild(displayTask());
