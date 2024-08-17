// Check for preferred color scheme and set initial theme
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const body = document.body;
const themeToggleButton = document.getElementById('themeToggle');

if (prefersDarkScheme) {
    body.classList.add('dark');
    themeToggleButton.textContent = 'Cambiar a Tema Claro';
} else {
    body.classList.add('light');
    themeToggleButton.textContent = 'Cambiar a Tema Oscuro';
}

// Theme toggle logic
themeToggleButton.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        themeToggleButton.textContent = 'Cambiar a Tema Oscuro';
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        themeToggleButton.textContent = 'Cambiar a Tema Claro';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendarContainer');

    // Generate 10 calendar sets
    for (let set = 1; set <= 10; set++) {
        const calendarSetDiv = document.createElement('div');
        calendarSetDiv.classList.add('calendar-set');

        // Generate 12 months, each with 40 weeks (10 rows x 4 columns)
        for (let month = 1; month <= 12; month++) {
            const monthDiv = document.createElement('div');
            monthDiv.classList.add('month');

            // Generate 40 weeks
            for (let week = 1; week <= 40; week++) {
                const weekNumber = ((set - 1) * 12 * 40) + ((month - 1) * 40) + week;
                const weekDiv = document.createElement('div');
                weekDiv.classList.add('week');
                weekDiv.innerHTML = `<input type="checkbox" id="week-${weekNumber}">`;

                monthDiv.appendChild(weekDiv);
            }

            calendarSetDiv.appendChild(monthDiv);
        }

        calendarContainer.appendChild(calendarSetDiv);

        if (set < 10) {
            const separatorDiv = document.createElement('div');
            separatorDiv.classList.add('separator');
            calendarContainer.appendChild(separatorDiv);
        }
    }

    // Initialize the weeks based on the saved state
    const weeks = document.querySelectorAll('.week input[type="checkbox"]');
    weeks.forEach(checkbox => {
        const isChecked = localStorage.getItem(checkbox.id) === 'true';
        checkbox.checked = isChecked;

        if (isChecked) {
            checkbox.parentElement.classList.add('checked');
        }

        checkbox.addEventListener('change', () => {
            localStorage.setItem(checkbox.id, checkbox.checked);
            if (checkbox.checked) {
                checkbox.parentElement.classList.add('checked');
            } else {
                checkbox.parentElement.classList.remove('checked');
            }
        });
    });
});