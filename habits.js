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
  if (!localStorage.getItem("habits")) {
    localStorage.setItem("habits", JSON.stringify([]));
  }
}

function loadHabits() {
  const activeList = document.getElementById("active-habit-list");
  const recommendedList = document.getElementById("habit-list"); // This might be null on Dashboard
  
  const habits = JSON.parse(localStorage.getItem("habits")) || [];
  const today = new Date().toDateString();

  // --- RENDER ACTIVE HABITS (Runs on both Dashboard and Habits page) ---
  if (activeList) {
    activeList.innerHTML = "";
    habits.forEach(habit => {
      const isDoneToday = habit.lastCompleted === today;
      const li = document.createElement("li");
      li.className = "task-item";
      li.innerHTML = `
        <div class="habit-info">
          <strong>${habit.name}</strong><br>
          🔥 Streak: ${habit.streak} days
        </div>
        <div class="habit-controls">
          <button class="check-off-btn ${isDoneToday ? 'completed' : ''}" ${isDoneToday ? 'disabled' : ''}>
            ${isDoneToday ? 'Done Today' : 'Check Off'}
          </button>
        </div>
      `;
      
      li.querySelector(".check-off-btn").addEventListener("click", () => completeHabit(habit.id, li));
      activeList.appendChild(li);
    });
  }

  // RENDER RECOMMENDED HABITS (Only runs on Habits page)
  if (recommendedList) {
    recommendedList.innerHTML = "";
    const profile = JSON.parse(localStorage.getItem("userProfile")) || {};
    
    Object.keys(profile).forEach(category => {
      if (profile[category] && HABIT_LIBRARY[category]) {
        HABIT_LIBRARY[category].forEach(habitName => {
          const alreadyAdded = habits.some(h => h.name === habitName);
          if (!alreadyAdded) {
            const li = document.createElement("li");
            li.className = "task-item recommended";
            li.innerHTML = `
              <span>${habitName}</span>
              <button class="add-rec-btn">Add to My Habits</button>
            `;
            li.querySelector("button").addEventListener("click", () => add_habit(habitName));
            recommendedList.appendChild(li);
          }
        });
      }
    });
  }
}

function removeHabit(id) {
  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits = habits.filter(h => h.id !== id);
  localStorage.setItem("habits", JSON.stringify(habits));
  loadHabits();
}

function add_habit(name) {
  if (!name) return;
  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  
  habits.push({
    id: crypto.randomUUID(),
    name: name,
    streak: 0,
    lastCompleted: null
  });

  localStorage.setItem("habits", JSON.stringify(habits));
  loadHabits();
}

function completeHabit(id, element) {
  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  const habit = habits.find(h => h.id === id);
  const today = new Date().toDateString();

  if (!habit || habit.lastCompleted === today) return;

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
