let cart = []; // Inicializa o carrinho como um array vazio
const viewCartButton = document.getElementById('viewCartButton');
const closeCartButton = document.getElementById('closeCartButton');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');

// Evento para adicionar produtos ao carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productId = productCard.getAttribute('data-product-id');
        const productName = productCard.querySelector('h2').textContent;
        const productPrice = productCard.querySelector('strong').textContent;

        // Adiciona o produto ao carrinho
        cart.push({ id: productId, name: productName, price: productPrice });
        alert(`${productName} adicionado ao carrinho!`);
    });
});

// Evento para visualizar o carrinho
viewCartButton.addEventListener('click', function() {
    displayCart(); // Chama a função para exibir os itens do carrinho
    cartModal.style.display = 'flex'; // Altera para 'flex' para exibir o modal
});

// Evento para fechar o modal do carrinho
closeCartButton.addEventListener('click', function() {
    cartModal.style.display = 'none'; // Oculta o modal
});

// Função para exibir os itens do carrinho
function displayCart() {
    cartItems.innerHTML = ''; // Limpa o conteúdo atual do carrinho
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>O carrinho está vazio.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} - ${item.price}</span>
            <button onclick="removeFromCart('${item.id}')">Remover</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Função para remover itens do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCart(); // Atualiza a exibição do carrinho após a remoção
}
