

// Dados de usuário pré-definidos
const predefinedUsers = [
    { username: "usuario1", password: "senha1" },
    { username: "usuario2", password: "senha2" }
];

function handleLogin(event) {
    event.preventDefault(); // Impede o envio do formulário

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    // Verifica as credenciais
    const user = predefinedUsers.find(user => user.username === username && user.password === password);
    if (user) {
        document.getElementById("welcomeMessage").innerText = `Bem-vindo, ${user.username}! Você está logado.`;
        document.getElementById("loginPopup").style.display = "flex"; // Altera para "flex" para garantir que o layout flexível funcione
        document.getElementById("logoutButton").style.display = "block"; // Mostra o botão de logout
        loginMessage.innerText = ''; // Limpa mensagens anteriores
    } else {
        // Mensagem de erro
        loginMessage.innerText = 'Usuário ou senha incorretos.';
    }
}

function closePopup() {
    document.getElementById("loginPopup").style.display = "none"; // Esconde a pop-up
}

// Função de logout
function handleLogout() {
    // Oculta o botão de logout
    document.getElementById("logoutButton").style.display = "none";
    
    // Limpa a mensagem de boas-vindas
    document.getElementById("welcomeMessage").innerText = '';
    
    // Esconde a pop-up de login
    closePopup();

    // Limpa os campos de entrada
    document.getElementById("username").value = '';
    document.getElementById("password").value = '';

    // Mostra uma mensagem informando que o usuário saiu
    const loginMessage = document.getElementById("loginMessage");
    loginMessage.innerText = 'Você saiu com sucesso.';
}

// Adiciona um listener de evento ao botão de logout
document.getElementById('logoutButton').addEventListener('click', handleLogout);


