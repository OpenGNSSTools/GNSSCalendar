document.addEventListener('DOMContentLoaded', () => {
    const calculator = new GNSSCalculator();
    const yearInput = document.getElementById('yearInput');
    const prevYearBtn = document.getElementById('prevYear');
    const nextYearBtn = document.getElementById('nextYear');
    const calendarGrid = document.querySelector('.calendar-grid');
    
    const selectedDateSpan = document.getElementById('selectedDate');
    const julianDaySpan = document.getElementById('julianDay');
    const dayOfYearSpan = document.getElementById('dayOfYear');
    const dayOfWeekSpan = document.getElementById('dayOfWeek');
    const gpsWeekSpan = document.getElementById('gpsWeek');
    const gpsDayOfWeekSpan = document.getElementById('gpsDayOfWeek');

    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Set initial year to current year
    const today = new Date();
    yearInput.value = today.getFullYear();

    function createMonthCalendar(year, month) {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'month';
        
        // Add month header
        const monthHeader = document.createElement('div');
        monthHeader.className = 'month-header';
        monthHeader.textContent = months[month];
        monthDiv.appendChild(monthHeader);

        // Create weekday headers
        const monthGrid = document.createElement('div');
        monthGrid.className = 'month-grid';
        
        weekdays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'weekday-header';
            dayHeader.textContent = day;
            monthGrid.appendChild(dayHeader);
        });

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startingDay = firstDay.getDay();

        // Add padding for days before start of month
        for (let i = 0; i < startingDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day other-month';
            monthGrid.appendChild(dayDiv);
        }

        // Add days of month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.textContent = day;

            // Check if this is today
            if (year === today.getFullYear() && 
                month === today.getMonth() && 
                day === today.getDate()) {
                dayDiv.classList.add('today');
            }

            dayDiv.addEventListener('click', () => {
                // Remove previous selection
                document.querySelectorAll('.day.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                
                // Add selection to clicked day
                dayDiv.classList.add('selected');
                
                // Update calculations
                const selectedDate = new Date(year, month, day);
                updateResults(selectedDate);
            });

            monthGrid.appendChild(dayDiv);
        }

        monthDiv.appendChild(monthGrid);
        return monthDiv;
    }

    function updateCalendar(year) {
        calendarGrid.innerHTML = '';
        for (let month = 0; month < 12; month++) {
            calendarGrid.appendChild(createMonthCalendar(year, month));
        }
    }

    function updateResults(date) {
        selectedDateSpan.textContent = date.toLocaleDateString();
        julianDaySpan.textContent = calculator.calculateJulianDay(date).toFixed(1);
        dayOfYearSpan.textContent = calculator.calculateDayOfYear(date);
        gpsWeekSpan.textContent = calculator.calculateGPSWeek(date);
        gpsDayOfWeekSpan.textContent = calculator.calculateGPSDayOfWeek(date);
    }

    // Event listeners for year navigation
    yearInput.addEventListener('change', () => {
        updateCalendar(parseInt(yearInput.value));
    });

    prevYearBtn.addEventListener('click', () => {
        yearInput.value = parseInt(yearInput.value) - 1;
        updateCalendar(parseInt(yearInput.value));
    });

    nextYearBtn.addEventListener('click', () => {
        yearInput.value = parseInt(yearInput.value) + 1;
        updateCalendar(parseInt(yearInput.value));
    });

    // Initialize calendar with current year
    updateCalendar(parseInt(yearInput.value));
}); 