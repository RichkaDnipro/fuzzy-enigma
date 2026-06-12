// ============================================================
// Тестові кейси — розкоментуйте для перевірки
// ============================================================
console.log(validateUser(null));
// // { valid: false, errors: ["Дані мають бути об'єктом"], user: null }
//
console.log(validateUser({ id: 1, name: "Олена", email: "olena@example.com", isActive: true }));
// // { valid: true, errors: [], user: {...} }
//
console.log(validateUser({ id: -1, name: "", email: "bad", isActive: "yes" }));
// // { valid: false, errors: [4 повідомлення], user: null }
//
console.log(validateUser({ id: 1, name: "Іван", email: "ivan@x.com", age: 200, isActive: true }));
// // { valid: false, errors: ["age має бути <= 150"], user: null }
//
console.log(validateUser("not an object"));
// // { valid: false, errors: ["Дані мають бути об'єктом"], user: null }