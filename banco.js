document.addEventListener("DOMContentLoaded", () => {
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const usuarioInput = document.getElementById("usuario");
    const senhaInput = document.getElementById("senha");
    const salvarButton = document.getElementById("salvar");
    const exibirButton = document.getElementById("exibir");

    // Função para carregar cadastros do localStorage
    function carregarCadastros() {
        const cadastros = localStorage.getItem("cadastros");
        return cadastros ? JSON.parse(cadastros) : [];
    }

    // Função para salvar cadastros no localStorage
    function salvarCadastros(cadastros) {
        localStorage.setItem("cadastros", JSON.stringify(cadastros));
    }

    // Evento ao clicar no botão "Salvar"
    salvarButton.addEventListener("click", (event) => {
        event.preventDefault(); // Impede o envio do formulário

        const nome = nomeInput.value;
        const email = emailInput.value;
        const usuario = usuarioInput.value;
        const senha = senhaInput.value;

        if (nome && email && usuario && senha) {
            const cadastros = carregarCadastros();
            const novoCadastro = {
                id: cadastros.length + 1, // Incrementa o ID automaticamente
                nome,
                email,
                usuario,
                senha,
            };

            cadastros.push(novoCadastro);
            salvarCadastros(cadastros);
            alert("Cadastro realizado com sucesso!");
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    // Evento ao clicar no botão "Exibir"
    exibirButton.addEventListener("click", () => {
        const cadastros = carregarCadastros();

        if (cadastros.length > 0) {
            let mensagem = "Cadastros:\n\n";
            cadastros.forEach((cadastro) => {
                mensagem += `ID: ${cadastro.id}\n` +
                            `Nome: ${cadastro.nome}\n` +
                            `E-mail: ${cadastro.email}\n` +
                            `Usuário: ${cadastro.usuario}\n` +
                            `Senha: ${cadastro.senha}\n\n`;
            });
            alert(mensagem);
        } else {
            alert("Nenhum cadastro encontrado.");
        }
    });
});
