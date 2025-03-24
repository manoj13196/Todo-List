import "../styles/main.css";
import createTodo from "./todo";
import createProject from "./project";
import { renderTodos } from "./dom";
import { loadFromLocalStorage, saveToLocalStorage } from "./storage";


let personal=loadFromLocalStorage();

if(!personal){
    personal=createProject("personal");

    saveToLocalStorage(personal);
}
const contentDiv = document.getElementById("content");
renderTodos(personal, contentDiv);
