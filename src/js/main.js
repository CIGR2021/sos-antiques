const botaoDesconectar = document.getElementById("btn-desconectar");

const desconectarConta = () => {
    localStorage.removeItem('userLogado');
    localStorage.removeItem('token');
    window.location.href = "../pages/login.html";
}

botaoDesconectar.addEventListener("click", desconectarConta);