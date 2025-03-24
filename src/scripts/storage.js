import createProject from "./project";
import createTodo from "./todo";

export function saveToLocalStorage(project){
    const projectData={
        name: project.name,
        todos: project.getTodos(),
    };

    localStorage.setItem("todoProject", JSON.stringify(projectData));
}


export function loadFromLocalStorage(){
    const data = localStorage.getItem("todoProject");

    if(!data) return null;

    const parsed=JSON.parse(data);

    const project=createProject(parsed.name);

    parsed.todos.forEach((todo)=>{
        const restoredTodo=createTodo(
            todo.title,
      todo.description,
      todo.dueDate,
      todo.priority,
      todo.completed
        );

        project.addTodo(restoredTodo);
    });
    return project;
}