class GNSSCalculator {
    constructor() {
        // GPS epoch started on January 6, 1980
        this.gpsEpoch = new Date('1980-01-06T00:00:00Z');
    }

    calculateJulianDay(date) {
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        
        const a = Math.floor((14 - m) / 12);
        const y1 = y + 4800 - a;
        const m1 = m + 12 * a - 3;
        
        // Calculate Julian Day Number for noon (12:00 UT)
        const jdn = d + Math.floor((153 * m1 + 2) / 5) + 
                    365 * y1 + Math.floor(y1 / 4) - 
                    Math.floor(y1 / 100) + Math.floor(y1 / 400) - 32045;
        
        // Subtract 0.5 days since we're calculating for 00:00
        return jdn - 0.5;
    }

    calculateDayOfYear(date) {
        // UTC zamanını kullanarak yılın başlangıcını ayarla
        const start = Date.UTC(date.getFullYear(), 0, 1);
        // Verilen tarihin UTC zamanını al
        const current = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        const diff = current - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay) + 1;
        return dayOfYear;
    }

    calculateDayOfWeek(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }

    calculateGPSWeek(date) {
        const diffTime = date.getTime() - this.gpsEpoch.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return Math.floor(diffDays / 7);
    }

    calculateGPSDayOfWeek(date) {
        // GPS week starts on Sunday (0) and ends on Saturday (6)
        return date.getDay();
    }
} 