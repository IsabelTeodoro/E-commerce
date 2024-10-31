// script.js

let cart = JSON.parse(localStorage.getItem('cart')) || []; // Recupera o carrinho do localStorage
const cartIcon = document.querySelector('#nav .nav-lista a img'); // Seleciona o ícone do carrinho

// Função para adicionar um produto ao carrinho
function addToCart(product) {
  cart.push(product); // Adiciona o produto ao carrinho
  localStorage.setItem('cart', JSON.stringify(cart)); // Salva o carrinho no localStorage
  updateCartCount(); // Atualiza a contagem de itens no carrinho
}

// Função para atualizar a contagem de itens no carrinho
function updateCartCount() {
  const itemCount = cart.length; // Conta quantos itens estão no carrinho
  cartIcon.alt = `Carrinho (${itemCount})`; // Atualiza o texto alternativo do ícone
}

// Adiciona event listeners para os botões de adicionar ao carrinho
document.querySelectorAll('.add-cart').forEach(button => {
  button.addEventListener('click', (event) => {
    const card = event.target.closest('.borda'); // Seleciona o card do produto
    const productName = card.querySelector('h2').textContent; // Obtém o nome do produto
    const productPrice = card.querySelector('.preco').textContent; // Obtém o preço do produto
    const product = { name: productName, price: productPrice }; // Cria um objeto de produto

    addToCart(product); // Adiciona o produto ao carrinho
    alert(`${productName} adicionado ao carrinho!`); // Alerta ao usuário
  });
});

// Exibe os itens no carrinho na página do carrinho
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceContainer = document.getElementById('total-price');
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Carrinho vazio.</p>';
    totalPriceContainer.textContent = '';
    return;
  }

  let total = 0; // Inicializa o total
  cartItemsContainer.innerHTML = ''; // Limpa o conteúdo anterior

  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.textContent = `${item.name} - ${item.price} `;
    
    // Cria o botão de remover
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = () => removeFromCart(index); // Define a função de remoção

    itemElement.appendChild(removeButton); // Adiciona o botão ao item
    cartItemsContainer.appendChild(itemElement);

    // Remove o símbolo de R$ e converte para número para calcular o total
    const priceValue = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
    total += priceValue; // Adiciona o preço ao total
  });

  totalPriceContainer.textContent = `Total: R$ ${total.toFixed(2)}`; // Exibe o total
}

// Função para remover um item do carrinho
function removeFromCart(index) {
  cart.splice(index, 1); // Remove o item do carrinho
  localStorage.setItem('cart', JSON.stringify(cart)); // Atualiza o localStorage
  displayCartItems(); // Atualiza a exibição do carrinho
  updateCartCount(); // Atualiza a contagem de itens no carrinho
}

// Executa a função displayCartItems na página do carrinho
if (document.title === 'Carrinho') {
  displayCartItems();
}

// Exibe as opções de pagamento com base na seleção
document.getElementById('payment-method').addEventListener('change', (event) => {
  const selectedMethod = event.target.value;

  document.querySelectorAll('.payment-info').forEach(div => {
    div.style.display = 'none'; // Esconde todas as opções
  });

  if (selectedMethod === 'credito') {
    document.getElementById('credit-card-info').style.display = 'block'; // Exibe informações do cartão de crédito
  } else if (selectedMethod === 'debito') {
    document.getElementById('debit-card-info').style.display = 'block'; // Exibe informações do cartão de débito
  } else if (selectedMethod === 'pix') {
    document.getElementById('pix-info').style.display = 'block'; // Exibe informações do Pix
  } else if (selectedMethod === 'boleto') {
    document.getElementById('boleto-info').style.display = 'block'; // Exibe informações do boleto
  }
});

// Adiciona evento de submit ao formulário de pagamento
document.getElementById('payment-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Previne o comportamento padrão do formulário
  alert('Compra finalizada!'); // Alerta de finalização
});
