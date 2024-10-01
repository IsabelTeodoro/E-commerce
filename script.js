document.addEventListener("DOMContentLoaded", function () {
    const bannerImages = document.querySelectorAll(".banner-image");
    const totalImages = bannerImages.length;
    let currentIndex = 0;

    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");

    // Função para exibir a imagem com base no índice atual
    function showImage(index) {
        // Calcula o deslocamento para mover o contêiner
        const offset = -index * 100; // 100% para cada imagem
        document.querySelector(".banner-images").style.transform = `translateX(${offset}vw)`;
    }

    // Avança para a próxima imagem
    nextButton.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % totalImages; // Incrementa o índice e retorna ao início, se necessário
        showImage(currentIndex);
    });

    // Volta para a imagem anterior
    prevButton.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Decrementa e volta ao final, se necessário
        showImage(currentIndex);
    });

    // Inicializa a primeira imagem
    showImage(currentIndex);
});
