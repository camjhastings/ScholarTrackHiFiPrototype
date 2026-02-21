const HABIT_LIBRARY = {
  anxiety: [
    "Take a 5-minute breathing exercise",
    "Go on a 10-minute walk",
    "No phone first 30 minutes after waking",
    "Establish and follow a routine",
    "Spend an hour with friends"
  ],
  depression: [
    "Morning sunlight exposure",
    "Write one gratitude note",
    "Short physical activity"
  ],
  motivation: [
    "Plan top 3 tasks for today",
    "Work 25-minute focus block",
    "Clean workspace"
  ],
  attention: [
    "Get at least 7 hours of sleep",
    "Remove distractions for 1 hour",
    "Single-task work session",
    "Take a 30-minute nature walk"
  ]
};

function initializeHabits() {
  if (localStorage.getItem("habits")) return;

  const profile = JSON.parse(localStorage.getItem("userProfile"));
  if (!profile) return;

  let habits = [];

  Object.keys(profile).forEach(need => {
    if (profile[need] && HABIT_LIBRARY[need]) {
      HABIT_LIBRARY[need].forEach(name => {
        habits.push({
          id: crypto.randomUUID(),
          name,
          streak: 0,
          lastCompleted: null
        });
      });
    }
  });

  localStorage.setItem("habits", JSON.stringify(habits));
}

function loadHabits() {
  const list = document.getElementById("habit-list");
  list.innerHTML = "";

  const habits = JSON.parse(localStorage.getItem("habits")) || [];

  habits.forEach(habit => {
    const li = document.createElement("li");
    li.className = "task-item";

    li.innerHTML = `
      <div>
        <strong>${habit.name}</strong><br>
        🔥 Streak: ${habit.streak} days
      </div>
      <input type="checkbox">
    `;

    const checkbox = li.querySelector("input");

    checkbox.addEventListener("change", () => {
      completeHabit(habit.id, li);
    });

    list.appendChild(li);
  });
}

function completeHabit(id, element) {
  let habits = JSON.parse(localStorage.getItem("habits")) || [];

  const habit = habits.find(h => h.id === id);
  if (!habit) return;

  const today = new Date().toDateString();

  if (habit.lastCompleted === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (habit.lastCompleted === yesterday.toDateString()) {
    habit.streak++;
  } else {
    habit.streak = 1;
  }

  habit.lastCompleted = today;

  localStorage.setItem("habits", JSON.stringify(habits));

  element.classList.add("task-completing");
  
  setTimeout(loadHabits, 400);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeHabits();
  loadHabits();
});

