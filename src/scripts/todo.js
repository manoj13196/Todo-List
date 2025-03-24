export default function createTodo(title,description,dueDate,priority,completed=false) {
  return {
    title,
    description,
    dueDate,
    priority,
    completed,

    toggleCompleted() {
      this.completed = !this.completed;
    },
  };
}
