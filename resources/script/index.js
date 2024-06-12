const modalFundoView = document.getElementById("modal-fundo");
const botaoCadastrarChaveSegurancaView = document.getElementById("botao-cadastrar-chave-seguranca");
const modalCadastrarChaveView = document.getElementById("modal-cadastrar-chave");
const botaoCancelarCadastro = document.getElementById("botao-cancelar-cadastro");
const categoriaChaveAcessoInput = document.getElementById("categoria-chave-acesso");
const itemURL = document.getElementById("item-URL");
const itemNome = document.getElementById("item-nome");
const nomeAplicativoInput = document.getElementById("nome-aplicativo");
const urlInput = document.getElementById("url");

botaoCadastrarChaveSegurancaView.addEventListener("click", function() {
  modalFundoView.classList.add("apresentarModalFundo");
  modalCadastrarChaveView.classList.add("apresentarModalCadastrarChave");
});

botaoCancelarCadastro.addEventListener("click", function(event) {
  event.preventDefault();
  modalFundoView.classList.remove("apresentarModalFundo");
  modalCadastrarChaveView.classList.remove("apresentarModalCadastrarChave");
});

categoriaChaveAcessoInput.addEventListener("change", function(event) {
  event.preventDefault();
  if (categoriaChaveAcessoInput.value == 1 || categoriaChaveAcessoInput.value == 3) {
    itemNome.classList.add("esconderItemFormulario");
  } else {
    itemNome.classList.remove("esconderItemFormulario");
  }
  if (categoriaChaveAcessoInput.value == 2 || categoriaChaveAcessoInput.value == 4) {
    itemURL.classList.add("esconderItemFormulario");
  } else {
    itemURL.classList.remove("esconderItemFormulario");
  }
});