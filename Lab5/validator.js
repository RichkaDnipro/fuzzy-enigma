// ============================================================
// Завдання 7 — JSON-валідатор
// ============================================================
// Реалізуйте validateUser(data) для перевірки структури User.
//
// Схема User:
//   {
//     id: number (>= 1),
//     name: string (1-100 символів),
//     email: string (валідний),
//     age?: number (>= 0, <= 150),    — опційне
//     isActive: boolean
//   }
//
// Повертає:
//   { valid: true,  errors: [],         user: {...} }
//   { valid: false, errors: [...],      user: null  }
//
// Обробляйте edge cases:
//   - null, undefined, рядок, число — невалідні (не об'єкт)
//   - відсутні поля
//   - неправильні типи
//   - значення поза діапазоном
//   - всі помилки в одному errors[], не break на першій
// ============================================================

function validateUser(data) {
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    return {
      valid: false,
      errors: ["Дані мають бути об'єктом"],
      user: null
    };
  }

  const errors = [];

  if (data.id === undefined) {
    errors.push("id є обов'язковим полем");
  } else if (typeof data.id !== 'number' || Number.isNaN(data.id)) {
    errors.push("id має бути числом");
  } else if (data.id < 1) {
    errors.push("id має бути >= 1");
  }

  if (data.name === undefined) {
    errors.push("name є обов'язковим полем");
  } else if (typeof data.name !== 'string') {
    errors.push("name має бути рядком");
  } else if (data.name.length < 1 || data.name.length > 100) {
    errors.push("name не порожній і < 100 символів");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email === undefined) {
    errors.push("email є обов'язковим полем");
  } else if (typeof data.email !== 'string') {
    errors.push("email має бути рядком");
  } else if (!emailRegex.test(data.email)) {
    errors.push("email невалідний");
  }

  if (data.age !== undefined) {
    if (typeof data.age !== 'number' || Number.isNaN(data.age)) {
      errors.push("age має бути числом");
    } else if (data.age < 0 || data.age > 150) {
      errors.push("age має бути <= 150");
    }
  }

  if (data.isActive === undefined) {
    errors.push("Статус активності є обов'язковим полем");
  } else if (typeof data.isActive !== 'boolean') {
    errors.push("Статус активності має бути boolean");
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors: errors,
      user: null
    };
  }

  const user = {
    id: data.id,
    name: data.name,
    email: data.email,
    isActive: data.isActive
  };

  if (data.age !== undefined) {
    user.age = data.age;
  }

  return {
    valid: true,
    errors: [],
    user: user
  };
}