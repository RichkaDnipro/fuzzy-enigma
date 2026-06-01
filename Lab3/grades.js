// ============================================================
// Завдання 2 — Калькулятор успішності
// ============================================================
// Реалізуйте 5 функцій. Перевірте у Console (відкрийте grades.html).
// ============================================================

const grades = [78, 92, 45, 88, 67, 39, 95, 71, 82, 58, 90, 64];

/**
 * Повертає середній бал, округлений до 1 знаку після коми.
 * average([5, 10, 15]) // 10.0
 */
function average(grades) {
    if (grades.length === 0) return 0.0;
  
    let sum = 0;
    for (const grade of grades) {
        sum += grade;
    }
    const avg = sum / grades.length;
    return Number(avg.toFixed(1));
}

/**
 * Повертає найвищу оцінку.
 * Обмеження: НЕ використовувати Math.max(...grades) напряму.
 */
function highest(grades) {
    if (grades.length === 0) return 0.0;
  
    let highestGRADE = grades[0];
    for (const grade of grades) {
        if (grade > highestGRADE) {
            highestGRADE = grade;
        }
    }
    return highestGRADE;
}

/**
 * Повертає найнижчу оцінку.
 * Обмеження: НЕ використовувати Math.min(...grades) напряму.
 */
function lowest(grades) {
    if (grades.length === 0) return 0.0;
  
    let lowestGRADE = grades[0];
    for (const grade of grades) {
        if (grade < lowestGRADE) {
            lowestGRADE = grade;
        }
    }
    return lowestGRADE;
}

/**
 * Повертає відсоток оцінок >= threshold.
 * passRate([60, 50, 70], 60) // 66.7
 */
function passRate(grades, threshold = 60) {
    if (grades.length === 0) return 0.0;
  
    let THRESHOLDcount = 0;
    for (const grade of grades) {
        if (grade >= threshold) {
        THRESHOLDcount++;
        }
    }
    const rate = (THRESHOLDcount / grades.length) * 100;
    return Number(rate.toFixed(1));
}

/**
 * Повертає об'єкт з кількістю оцінок у діапазонах:
 * { "<60": 2, "60-69": 2, "70-79": 2, "80-89": 3, "90-100": 3 }
 */
function distribution(grades) {
    const dist = {
        "<60": 0,
        "60-69": 0,
        "70-79": 0,
        "80-89": 0,
        "90-100": 0
    };

    for (const grade of grades) {
        if (grade < 60) {
        dist["<60"]++;
        } else if (grade >= 60 && grade <= 69) {
        dist["60-69"]++;
        } else if (grade >= 70 && grade <= 79) {
        dist["70-79"]++;
        } else if (grade >= 80 && grade <= 89) {
        dist["80-89"]++;
        } else if (grade >= 90 && grade <= 100) {
        dist["90-100"]++;
        }
    }
    return dist;
}

// ============================================================
// Тестування — розкоментуйте після реалізації
// ============================================================
console.log("Середнє:    ", average(grades));
console.log("Найвища:    ", highest(grades));
console.log("Найнижча:   ", lowest(grades));
console.log("Pass rate:  ", passRate(grades), "%");
console.log("Distribution:", distribution(grades));