<?php
// Exibir erros para depuração
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Verificar se os dados foram enviados corretamente
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Configurações do banco de dados
    $servername = "localhost"; // Use "localhost" se estiver executando localmente
    $username = "root"; // Substitua pelo seu usuário do MySQL
    $password = "1234"; // Substitua pela sua senha do MySQL
    $dbname = "ecommerce"; // Nome do seu banco de dados

    // Criar a conexão
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar a conexão
    if ($conn->connect_error) {
        die(json_encode(['success' => false, 'message' => 'Conexão falhou: ' . $conn->connect_error]));
    }

    // Pegar os dados do formulário
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validar os dados recebidos
    if (isset($data['username']) && !empty($data['username']) && isset($data['password']) && !empty($data['password'])) {
        $newUsername = $data['username'];
        $newPassword = $data['password'];

        // Verificar se o usuário já existe
        $sql = "SELECT * FROM usuarios WHERE username = ?";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            die(json_encode(['success' => false, 'message' => 'Erro ao preparar a consulta: ' . $conn->error]));
        }
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
            if (!$stmt) {
                die(json_encode(['success' => false, 'message' => 'Erro ao preparar a inserção: ' . $conn->error]));
            }
            $stmt->bind_param("ss", $newUsername, $hashedPassword);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Usuário cadastrado com sucesso.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erro ao cadastrar usuário: ' . $stmt->error]);
            }
        }

        // Fechar a conexão
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Dados inválidos.']);
    }

    $conn->close();
} else {
    http_response_code(405); // Método não permitido
    echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
}
?>
