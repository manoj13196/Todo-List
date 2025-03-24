export default function createProject(name){
    const todos=[];

    return{
        name,

        addTodo(todo){
            todos.push(todo);
        },

        removeTodo(index){
            todos.splice(index,1);
        },

        getTodos(){
            return todos;
        },
    };
}