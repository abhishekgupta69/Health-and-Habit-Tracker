const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');
const progressBar = document.getElementById('progressBar');
const progressPercentage = document.getElementById('progressPercentage');
const resetBtn = document.getElementById('resetBtn');

let habits = JSON.parse(localStorage.getItem('habits')) || [];

function renderHabits() {
    habitList.innerHTML = '';
    habits.forEach((habit, index) => {
        const habitCard = document.createElement('div');
        habitCard.className = 'habit-card';
        habitCard.innerHTML = `
            <span>${habit.name}</span>
            <input type="checkbox" ${habit.completed ? 'checked' : ''} onchange="toggleHabit(${index})">
            <button onclick="deleteHabit(${index})">Delete</button>
        `;
        habitList.appendChild(habitCard);
    });
    updateProgress();
}
 
function addHabit() {
    const habitName = habitInput.value.trim();
    if (habitName) {
        habits.push({ name: habitName, completed: false });
        localStorage.setItem('habits', JSON.stringify(habits));
        habitInput.value = '';
        renderHabits();
    }
}

function toggleHabit(index) {
    habits[index].completed = !habits[index].completed;
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
}

function deleteHabit(index) {
    habits.splice(index, 1);
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
}

function updateProgress() {
    const completedCount = habits.filter(habit => habit.completed).length;
    const totalCount = habits.length;
    const percentage = totalCount ? (completedCount / totalCount) * 100 : 0;
    progressBar.style.width = percentage + '%';
    progressPercentage.textContent = Math.round(percentage) + '%';
}

function resetHabits() {
    habits = [];
    localStorage.removeItem('habits');
    renderHabits();
}

addHabitBtn.addEventListener('click', addHabit);
resetBtn.addEventListener('click', resetHabits);
renderHabits();