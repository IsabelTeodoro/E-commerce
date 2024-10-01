
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
        // Exibe a mensagem de boas-vindas e a pop-up
        document.getElementById("welcomeMessage").innerText = `Bem-vindo, ${user.username}! Você está logado.`;
        document.getElementById("loginPopup").style.display = "block"; // Mostra a pop-up
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

// Adiciona um listener de evento ao botão de logout
document.getElementById('logoutButton').addEventListener('click', handleLogout);