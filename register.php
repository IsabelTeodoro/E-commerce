<?php
// Verificar se os dados foram enviados corretamente
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Conectar ao banco de dados
    $servername = "ecommerce";
    $username = "root"; // Substitua pelo nome de usuário correto
    $password = "1234"; // Substitua pela senha correta
    $dbname = "ecommerce";

    // Criar a conexão
    $conn = new mysqli(hostname: $servername, username: $username, password: $password, database: $dbname);

    // Verificar a conexão
    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    // Pegar os dados do formulário
    $data = json_decode(file_get_contents('php://input'), true);
    if (!empty($data['username']) && !empty($data['password'])) {
        $newUsername = $data['username'];
        $newPassword = $data['password'];

        // Verificar se o usuário já existe
        $sql = "SELECT * FROM usuarios WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $newUsername);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'Usuário já existe.']);
        } else {
            // Criptografar a senha
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

            // Inserir no banco
            $sql = "INSERT INTO usuarios (username, password) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $newUsername, $hashedPassword);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Usuário cadastrado com sucesso.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erro ao cadastrar usuário.']);
            }
        }

        // Fechar a conexão
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Dados inválidos.']);
    }

    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
}
?>
