const botaoDesconectar = document.getElementById("btn-desconectar");

botaoDesconectar.addEventListener("click", desconectarConta);

const desconectarConta = () => {
    localStorage.removeItem('userLogado');
    window.location.href = "../pages/login.html";
}