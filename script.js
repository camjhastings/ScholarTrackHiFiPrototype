
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("taskForm");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.push({
  id: crypto.randomUUID(),
  name: form.taskName.value,
  dueDate: form.dueDate.value || null,
  priority: Number(form.priority.value) || null
});

    localStorage.setItem("tasks", JSON.stringify(tasks));

    form.reset();
    loadTasks();
  });

  loadTasks();
});



function loadTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";

    const priority = task.dueDate || 0;

    if (task.priority === 1) li.classList.add("priority-high");
    if (task.priority === 2) li.classList.add("priority-medium");
    if (task.priority === 3) li.classList.add("priority-low");
    if (task.priority === 0) li.classList.add("priority-none");

    const dueText = task.dueDate || "No date";

    li.innerHTML = `
      <div>
        <strong>${task.name}</strong><br>
        Due: ${dueText}
      </div>
      <input type="checkbox">
    `;

    // ✅ checkbox must be defined HERE
    const checkbox = li.querySelector("input");

    checkbox.addEventListener("change", () => {
      li.classList.add("task-completing");

      setTimeout(() => {
        removeTask(task.id);
      }, 400);
    });

    taskList.appendChild(li);
  });
}



function removeTask(id) {
  
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.filter(task => task.id !== id);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  loadTasks();
  
}

