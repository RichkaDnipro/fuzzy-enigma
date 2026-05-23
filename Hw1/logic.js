const initialProducts = [
    { id: 1, name: "Помідори", quantity: 2, isBought: true },
    { id: 2, name: "Печиво", quantity: 2, isBought: false },
    { id: 3, name: "Сир", quantity: 1, isBought: false }
];

let products = JSON.parse(localStorage.getItem("saved_products")) || initialProducts;
// збереження продуктів при перезупску сторінки
function saveProducts() {
    localStorage.setItem("saved_products", JSON.stringify(products));
}

const productsContainer = document.getElementById("products-container");
const remainContainer = document.getElementById('remain-container');
const boughtContainer = document.getElementById('bought-container');
const newProductInput = document.getElementById('new-product-name');
const btnAddProduct = document.getElementById('btn-add-product');

function addProduct() {
    const name = newProductInput.value.trim();
    if (!name) return;

    const newProduct = {
        id: Date.now(),
        name,
        quantity: 1,
        isBought: false
    };
    products.push(newProduct);
    newProductInput.value = '';
    saveProducts();
    render();
}

function render() {
    productsContainer.innerHTML = '';
    remainContainer.innerHTML = '';
    boughtContainer.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('article');
        row.className = 'product-row'; 
        row.classList.toggle('row-bought', product.isBought);
        const nameProduct = document.createElement('div');
        nameProduct.className = 'product-item-input';

        if (!product.isBought) {
            const nameText = document.createElement('span');
            nameText.className = 'product-item';
            nameText.textContent = product.name;
            
            //клік -> input
            nameText.addEventListener('click', () => {
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.className = 'product-input';
                editInput.value = product.name;
                
                nameProduct.innerHTML = '';
                nameProduct.appendChild(editInput);
                editInput.focus();

                editInput.addEventListener('blur', () => {
                    const updatedName = editInput.value.trim();
                    if (updatedName) product.name = updatedName;
                    saveProducts();
                    render();
                });
            });
            nameProduct.appendChild(nameText);
        } else {
            const nameText = document.createElement('span');
            nameText.className = 'product-item';
            nameText.textContent = product.name;
            nameProduct.appendChild(nameText);
        }

        let counter;
        if (!product.isBought) {
            counter = document.createElement('div');
            counter.className = 'number-btn';

            const btnMinus = document.createElement('button');
            btnMinus.className = 'btn-plus-minus btn-minus-color';
            btnMinus.textContent = '−';
            btnMinus.setAttribute('data-tooltip', 'Менше');
            if (product.quantity <= 1) btnMinus.disabled = true;
            
            btnMinus.addEventListener('click', () => {
                if (product.quantity > 1) product.quantity--;
                saveProducts();
                render();
            });

            const qtySpan = document.createElement('span');
            qtySpan.className = 'number';
            qtySpan.textContent = product.quantity;

            const btnPlus = document.createElement('button');
            btnPlus.className = 'btn-plus-minus btn-plus-color';
            btnPlus.textContent = '+';
            btnPlus.setAttribute('data-tooltip', 'Більше');
            
            btnPlus.addEventListener('click', () => {
                product.quantity++;
                saveProducts();
                render();
            });

            counter.appendChild(btnMinus);
            counter.appendChild(qtySpan);
            counter.appendChild(btnPlus);
        } else {
            counter = document.createElement('span');
            counter.className = 'number-only';
            counter.textContent = product.quantity;
        }

        const actions = document.createElement('div');
        actions.className = 'actions';

        const btnStatus = document.createElement('button');
        btnStatus.className = 'btn-status';
        btnStatus.textContent = product.isBought ? 'Не куплено' : 'Куплено';
        btnStatus.setAttribute('data-tooltip', product.isBought ? 'Зробити не купленим' : 'Зробити купленим');
        
        btnStatus.addEventListener('click', () => {
            product.isBought = !product.isBought;
            saveProducts();
            render();
        });
        actions.appendChild(btnStatus);

        if (!product.isBought) {
            const btnRemove = document.createElement('button');
            btnRemove.className = 'btn-remove';
            btnRemove.textContent = '×';
            btnRemove.setAttribute('data-tooltip', 'Видалити товар');
            
            btnRemove.addEventListener('click', () => {
                products = products.filter(p => p.id !== product.id);
                saveProducts();
                render();
            });
            actions.appendChild(btnRemove);
        }

        row.appendChild(nameProduct);
        row.appendChild(counter);
        row.appendChild(actions);
        productsContainer.appendChild(row);

        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.classList.toggle('strike', product.isBought);
        tag.innerHTML = `${product.name} <span class="amount">${product.quantity}</span>`;

        if (product.isBought) {
            boughtContainer.appendChild(tag);
        } else {
            remainContainer.appendChild(tag);
        }
    });
}

btnAddProduct.addEventListener('click', addProduct);
newProductInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addProduct();
    }
});

render();