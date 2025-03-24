import { saveToLocalStorage } from "./storage";

export function renderTodos(project, container) {
  console.log("Rendering todos into DOM...");
  container.innerHTML = ""; // Clear old content

  // Form to add a new todo
  const form = document.createElement("form");
  form.innerHTML = `
  <h2>Add New Todo</h2>
  <div class="form-grid">
    <div>
      <label for="title">Title</label>
      <input type="text" name="title" id="title" required />
    </div>
    <div>
      <label for="description">Description</label>
      <input type="text" name="description" id="description" required />
    </div>
    <div>
      <label for="dueDate">Due Date</label>
      <input type="date" name="dueDate" id="dueDate" required />
    </div>
    <div>
      <label for="priority">Priority</label>
      <select name="priority" id="priority">
        <option value="low">Low</option>
        <option value="medium" selected>Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  </div>
  <button type="submit">Add Todo</button>
 
`;



  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const newTodo = {
      title: data.get("title"),
      description: data.get("description"),
      dueDate: data.get("dueDate"),
      priority: data.get("priority"),
      completed: false,
      toggleCompleted() {
        this.completed = !this.completed;
      },
    };
    project.addTodo(newTodo);
    saveToLocalStorage(project);
    renderTodos(project, container);
    form.reset();
  });
  container.appendChild(form);

  // Render each todo card
  const todos = project.getTodos();
  todos.forEach((todo, index) => {
    const card = document.createElement("div");
    card.classList.add("todo-card");

    const title = document.createElement("h3");
    title.textContent = todo.title;

    const desc = document.createElement("p");
    desc.textContent = todo.description;

    const due = document.createElement("p");
    due.textContent = `Due: ${todo.dueDate}`;

    const priority = document.createElement("p");
    priority.textContent = `Priority: ${todo.priority}`;

    const status = document.createElement("p");
    status.textContent = `Completed: ${todo.completed ? "Yes" : "No"}`;

    // ✅ Completed checkbox
    const completedLabel = document.createElement("label");
    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";
    completedCheckbox.checked = todo.completed;
    completedCheckbox.addEventListener("change", () => {
      if (typeof todo.toggleCompleted === "function") {
        todo.toggleCompleted();
      } else {
        todo.completed = !todo.completed; // fallback for object-literal todos
      }
      saveToLocalStorage(project);
      renderTodos(project, container);
    });
    completedLabel.append(" Mark as Completed ", completedCheckbox);

    // 🔘 Button group (edit, delete)
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("card_buttons");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn")
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      project.removeTodo(index);
      saveToLocalStorage(project);
      renderTodos(project, container);
    });

    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      // Replace card with form inputs
      card.innerHTML = "";

      const titleInput = document.createElement("input");
      titleInput.value = todo.title;

      const descInput = document.createElement("input");
      descInput.value = todo.description;

      const dueInput = document.createElement("input");
      dueInput.type = "date";
      dueInput.value = todo.dueDate;

      const priorityInput = document.createElement("select");
      ["low", "medium", "high"].forEach((level) => {
        const opt = document.createElement("option");
        opt.value = level; 
        opt.textContent = level;
        if (todo.priority === level) opt.selected = true;
        priorityInput.appendChild(opt);
      });

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.addEventListener("click", () => {
        todo.title = titleInput.value;
        todo.description = descInput.value;
        todo.dueDate = dueInput.value;
        todo.priority = priorityInput.value;

        saveToLocalStorage(project);
        renderTodos(project, container);
      });

      card.append(titleInput, descInput, dueInput, priorityInput, saveBtn);
    });

    buttonGroup.append(editBtn, deleteBtn);

    card.append(title, desc, due, priority, status, completedLabel, buttonGroup);
    container.appendChild(card);
  });
}
