// ============================================================
// Завдання 7 — Валідатор форми
// ============================================================
// Вимоги:
//   1. preventDefault на submit.
//   2. Правила валідації:
//      - Імʼя: не порожнє, мін. 2 символи.
//      - Email: відповідає регексу /^.+@.+\..+$/.
//      - Пароль: мін. 8 символів, хоча б одна цифра.
//      - Confirm: збігається з password.
//   3. Помилки показуються в .error[data-for="<name>"].
//   4. Поле з помилкою отримує клас .invalid.
//   5. При вводі в поле (input event) — помилка зникає.
//   6. Якщо ВСЕ валідно — console.log даних + alert("Зареєстровано!").
//   7. ПЕРЕВІРЯТИ ВСІ ПОЛЯ ОДРАЗУ, не break на першій помилці.
// ============================================================

// TODO

const form = document.getElementById('register');
const nameInput = form.elements['name'];
const emailInput = form.elements['email'];
const passwordInput = form.elements['password'];
const confirmPSInput = form.elements['confirm'];

function setError(inputElement, errorMessage) {
    inputElement.classList.add('invalid');
    const errorSpan = form.querySelector(`.error[data-for="${inputElement.name}"]`);
    errorSpan.textContent = errorMessage;
}

function clearError(inputElement) {
    inputElement.classList.remove('invalid');
    const errorSpan = form.querySelector(`.error[data-for="${inputElement.name}"]`);
    errorSpan.textContent = '';
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isFormValid = true;
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;
    const confirmPSValue = confirmPSInput.value;

    if (nameValue === '') {
        setError(nameInput, 'Імʼя не може бути порожнім');
        isFormValid = false;
    } else if (nameValue.length < 2) {
        setError(nameInput, 'Імʼя повинно містити мінімум 2 символи');
        isFormValid = false;
    } else {
        clearError(nameInput);
    }

    const emailRegex = /^.+@.+\..+$/;
    if (!emailRegex.test(emailValue)) {
        setError(emailInput, 'Некоректний email');
        isFormValid = false;
    } else {
        clearError(emailInput);
    }

    const hasDigit = /\d/.test(passwordValue);
    if (passwordValue.length < 8) {
        setError(passwordInput, 'Пароль має бути не менше 8 символів');
        isFormValid = false;
    } else if (!hasDigit) {
        setError(passwordInput, 'Пароль має містити хоча б одну цифру');
        isFormValid = false;
    } else {
        clearError(passwordInput);
    }

    if (confirmPSValue !== passwordValue) {
        setError(confirmPSInput, 'Паролі не збігаються');
        isFormValid = false;
    } else if (confirmPSValue === '') {
        setError(confirmPSInput, 'Підтвердіть пароль');
        isFormValid = false;
    } else {
        clearError(confirmPSInput);
    }

    if (isFormValid) {
        const formData = {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        confirm: confirmPSValue
        };
        console.log('Дані реєстрації:', formData);
        alert('Зареєстровано!');
    }
});

form.addEventListener('input', function (event) {
    const target = event.target;
    if (target.tagName === 'INPUT') {
        clearError(target);
    }
});