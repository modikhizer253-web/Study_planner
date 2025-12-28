// Timetable: Add rows dynamically with better UX
document.getElementById('add-row').addEventListener('click', () => {
    const tbody = document.querySelector('#schedule tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="e.g., 9-10 AM"></td>
        <td><input type="text" placeholder="Activity"></td>
        <td><input type="text" placeholder="Activity"></td>
        <td><input type="text" placeholder="Activity"></td>
        <td><input type="text" placeholder="Activity"></td>
        <td><input type="text" placeholder="Activity"></td>
        <td><input type="text" placeholder="Activity"></td>
        <td><input type="text" placeholder="Activity"></td>
    `;
    tbody.appendChild(row);
    row.scrollIntoView({ behavior: 'smooth' });
});

// Subjects: Add with colors and animations
document.getElementById('add-subject').addEventListener('click', () => {
    const subject = document.getElementById('new-subject').value.trim();
    const color = document.getElementById('color-select').value;
    if (subject) {
        const div = document.createElement('div');
        div.className = `subject-item ${color}`;
        div.textContent = subject;
        document.getElementById('subject-list').appendChild(div);
        document.getElementById('new-subject').value = '';
        
        // Add to progress bars
        addProgressBar(subject);
        
        // Animate addition
        div.style.opacity = '0';
        setTimeout(() => div.style.opacity = '1', 10);
    }
});

// Progress Bars: Add and update with smooth animation
function addProgressBar(subject) {
    const container = document.getElementById('progress-list');
    const div = document.createElement('div');
    const safeId = subject.replace(/\s/g, '');
    div.innerHTML = `
        <label>${subject} Progress:</label>
        <div class="progress-bar">
            <div class="progress-fill" id="progress-${safeId}"></div>
        </div>
        <input type="range" min="0" max="100" value="0" id="slider-${safeId}">
    `;
    container.appendChild(div);
    
    // Update bar on slider change
    document.getElementById(`slider-${safeId}`).addEventListener('input', (e) => {
        document.getElementById(`progress-${safeId}`).style.width = e.target.value + '%';
    });
}

// Streak Tracking with confirmations
let currentStreak = 0;
let longestStreak = 0;
document.getElementById('mark-day').addEventListener('click', () => {
    currentStreak++;
    if (currentStreak > longestStreak) longestStreak = currentStreak;
    updateStreak();
});
document.getElementById('reset-streak').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset your streak?')) {
        currentStreak = 0;
        updateStreak();
    }
});
function updateStreak() {
    document.getElementById('current-streak').textContent = currentStreak;
    document.getElementById('longest-streak').textContent = longestStreak;
}