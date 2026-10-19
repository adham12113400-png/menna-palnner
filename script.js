// Menna Planner — weekly routine and 30-day workout challenge
const monthlyWorkouts = [
  "Push — Chest, Shoulders & Triceps", "Legs + Glutes", "Shoulders + Arms + Obliques",
  "Full Body + Glutes", "Arms + Core + Cardio", "Rest Day", "Pull — Back",
  "Legs + Glutes", "Shoulders + Arms + Obliques", "Full Body + Glutes",
  "Arms + Core + Obliques", "Rest Day", "Push", "Legs + Glutes",
  "Shoulders + Arms", "Full Body + Glutes", "Arms + Core + Obliques", "Rest Day",
  "Push", "Legs + Glutes", "Shoulders + Arms", "Pull — Back", "Legs + Glutes",
  "Push", "Rest Day", "Full Body", "Arms + Core", "Legs + Glutes", "Pull — Back", "Push"
];

const weeklyDays = [
  "السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"
];

const dailyRoutine = [
  { time: "5:00 ص", task: "صلاة الفجر والأذكار وتجهيز الطعام" },
  { time: "7:00 ص", task: "التمرين" },
  { time: "9:00 ص", task: "الإفطار" },
  { time: "10:00 ص", task: "التعليم" },
  { time: "12:00 م", task: "الورد اليومي" },
  { time: "3:00 م", task: "الغداء والأذكار" },
  { time: "7:00 م", task: "وجبة خفيفة" },
  { time: "8:00 م", task: "وجبة العشاء" },
  { time: "10:00 م", task: "صلاة العشاء وقيام الليل" },
  { time: "11:00 م", task: "موعد النوم" }
];

function isComplete(key) {
  return localStorage.getItem(key) === "true";
}

function switchTab(tabName) {
  const weekly = tabName === "weekly";
  document.querySelectorAll(".tab-btn").forEach(button => {
    const active = button.id === (weekly ? "weeklyTabButton" : "monthlyTabButton");
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  document.querySelectorAll(".tab-content").forEach(panel => {
    const active = panel.id === (weekly ? "weekly-tab" : "monthly-tab");
    panel.classList.toggle("active-content", active);
    panel.hidden = !active;
  });
}

function renderWeeklySchedule() {
  const container = document.getElementById("weeklyList");
  container.replaceChildren();

  weeklyDays.forEach((day, index) => {
    const completed = isComplete(`weekly-day-${index}`);
    const card = document.createElement("article");
    card.className = `weekly-day-card${completed ? " completed" : ""}`;
    card.id = `weekly-card-${index}`;

    const header = document.createElement("div");
    header.className = "day-header";

    const dayButton = document.createElement("button");
    dayButton.type = "button";
    dayButton.className = "day-info";
    dayButton.setAttribute("aria-expanded", "false");
    dayButton.setAttribute("aria-controls", `details-${index}`);
    dayButton.innerHTML = `
      <span class="day-emoji" aria-hidden="true">▦</span>
      <span class="day-copy">
        <span class="day-name">${day}</span>
        <span class="day-hint">عرض تفاصيل الروتين اليومي</span>
      </span>
    `;
    dayButton.addEventListener("click", () => toggleDetails(index, dayButton));

    const checkbox = document.createElement("button");
    checkbox.type = "button";
    checkbox.className = `checkbox-box${completed ? " checked" : ""}`;
    checkbox.setAttribute("aria-label", completed ? `إلغاء إنجاز ${day}` : `تحديد ${day} كمكتمل`);
    checkbox.setAttribute("aria-pressed", String(completed));
    checkbox.innerHTML = '<span class="custom-checkbox" aria-hidden="true"></span>';
    checkbox.addEventListener("click", () => toggleWeeklyComplete(index));

    header.append(dayButton, checkbox);

    const details = document.createElement("div");
    details.className = "day-details";
    details.id = `details-${index}`;
    dailyRoutine.forEach(slot => {
      const row = document.createElement("div");
      row.className = "time-slot";
      const time = document.createElement("span");
      time.className = "time-badge";
      time.textContent = slot.time;
      const task = document.createElement("span");
      task.className = "task-name";
      task.textContent = slot.task;
      row.append(time, task);
      details.append(row);
    });

    card.append(header, details);
    container.append(card);
  });
}

function toggleDetails(index, button) {
  const details = document.getElementById(`details-${index}`);
  const expanded = details.classList.toggle("expanded");
  button.setAttribute("aria-expanded", String(expanded));
  const hint = button.querySelector(".day-hint");
  hint.textContent = expanded ? "إخفاء تفاصيل الروتين" : "عرض تفاصيل الروتين اليومي";
}

function toggleWeeklyComplete(index) {
  const key = `weekly-day-${index}`;
  localStorage.setItem(key, String(!isComplete(key)));
  renderWeeklySchedule();
  updateProgress();
}

function renderMonthlyGrid() {
  const container = document.getElementById("monthlyGrid");
  container.replaceChildren();

  monthlyWorkouts.forEach((workout, index) => {
    const dayNumber = index + 1;
    const completed = isComplete(`monthly-day-${dayNumber}`);
    const card = document.createElement("article");
    card.className = `monthly-card${completed ? " completed" : ""}`;
    card.id = `monthly-card-${dayNumber}`;

    const top = document.createElement("div");
    top.className = "card-top";

    const day = document.createElement("span");
    day.className = "day-number";
    day.textContent = `DAY ${String(dayNumber).padStart(2, "0")}`;

    const checkbox = document.createElement("button");
    checkbox.type = "button";
    checkbox.className = `checkbox-box${completed ? " checked" : ""}`;
    checkbox.setAttribute("aria-label", completed ? `إلغاء إنجاز اليوم ${dayNumber}` : `تحديد اليوم ${dayNumber} كمكتمل`);
    checkbox.setAttribute("aria-pressed", String(completed));
    checkbox.innerHTML = '<span class="custom-checkbox" aria-hidden="true"></span>';
    checkbox.addEventListener("click", () => toggleMonthlyComplete(dayNumber));

    top.append(day, checkbox);
    const workoutText = document.createElement("div");
    workoutText.className = "workout-text";
    workoutText.textContent = workout;
    card.append(top, workoutText);
    container.append(card);
  });
}

function toggleMonthlyComplete(dayNumber) {
  const key = `monthly-day-${dayNumber}`;
  localStorage.setItem(key, String(!isComplete(key)));
  renderMonthlyGrid();
  updateProgress();
}

function updateProgress() {
  const weeklyDone = weeklyDays.filter((_, index) => isComplete(`weekly-day-${index}`)).length;
  const monthlyDone = monthlyWorkouts.filter((_, index) => isComplete(`monthly-day-${index + 1}`)).length;
  const weeklyPercent = Math.round((weeklyDone / weeklyDays.length) * 100);
  const monthlyPercent = Math.round((monthlyDone / monthlyWorkouts.length) * 100);

  document.getElementById("weeklyProgressValue").textContent = `${weeklyPercent}%`;
  document.getElementById("weeklyProgressCount").textContent = `${weeklyDone} من 7 أيام`;
  document.getElementById("weeklyProgressBar").style.width = `${weeklyPercent}%`;

  document.getElementById("monthlyProgressValue").textContent = `${monthlyPercent}%`;
  document.getElementById("monthlyProgressCount").textContent = `${monthlyDone} من 30 يومًا`;
  document.getElementById("monthlyProgressBar").style.width = `${monthlyPercent}%`;
}

function resetWeekly() {
  if (!confirm("هل أنتِ متأكدة من إعادة ضبط الأسبوع؟ سيتم إلغاء إنجازات الأيام السبعة.")) return;
  weeklyDays.forEach((_, index) => localStorage.removeItem(`weekly-day-${index}`));
  renderWeeklySchedule();
  updateProgress();
}

function resetMonthly() {
  if (!confirm("هل أنتِ متأكدة من إعادة ضبط تحدي التمارين؟ سيتم إلغاء إنجازات الأيام الثلاثين.")) return;
  monthlyWorkouts.forEach((_, index) => localStorage.removeItem(`monthly-day-${index + 1}`));
  renderMonthlyGrid();
  updateProgress();
}

document.addEventListener("DOMContentLoaded", () => {
  renderWeeklySchedule();
  renderMonthlyGrid();
  updateProgress();
});
