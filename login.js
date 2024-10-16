


     // Função de login
     function handleLogin(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const loginMessage = document.getElementById("loginMessage");

        // Simulação da verificação das credenciais com base em um array de usuários pré-definidos
        const user = predefinedUsers.find(user => user.username === username && user.password === password);
        if (user) {
            document.getElementById("welcomeMessage").innerText = `Bem-vindo, ${user.username}! Você está logado.`;
            document.getElementById("loginPopup").style.display = "flex"; // Mostra a pop-up de boas-vindas
            document.getElementById("logoutButton").style.display = "block"; // Mostra o botão de logout
            loginMessage.innerText = ''; // Limpa mensagens anteriores
        } else {
            // Mensagem de erro
            loginMessage.innerText = 'Usuário ou senha incorretos.';
        }
    }

    // Função para fechar a pop-up
    function closePopup() {
        document.getElementById("loginPopup").style.display = "none";
    }

    // Função para redirecionar para a tela de cadastro
    function redirectToRegister() {
        window.location.href = 'register.html';
    }

    // Função de logout
    function handleLogout() {
        document.getElementById("logoutButton").style.display = "none"; // Oculta o botão de logout
        document.getElementById("welcomeMessage").innerText = ''; // Limpa a mensagem de boas-vindas
        closePopup(); // Fecha a pop-up de login
        document.getElementById("username").value = ''; // Limpa o campo de usuário
        document.getElementById("password").value = ''; // Limpa o campo de senha
        document.getElementById("loginMessage").innerText = 'Você saiu com sucesso.'; // Mostra mensagem de logout
    }

    // Adiciona o evento de logout ao botão
    document.getElementById('logoutButton').addEventListener('click', handleLogout);