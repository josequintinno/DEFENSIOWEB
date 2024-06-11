const modalFundoView = document.getElementById("modal-fundo");
const botaoCadastrarChaveSegurancaView = document.getElementById("botao-cadastrar-chave-seguranca");
const modalCadastrarChaveView = document.getElementById("modal-cadastrar-chave");
const botaoCancelarCadastro = document.getElementById("botao-cancelar-cadastro");
const categoriaChaveAcessoInput = document.getElementById("categoria-chave-acesso");
const itemURL = document.getElementById("item-URL");
const itemNome = document.getElementById("item-nome");
const nomeAplicativoInput = document.getElementById("nome-aplicativo");
const urlInput = document.getElementById("url");
const URL_API_ACESSO = "http://192.168.1.3:8080/api/v1/acesso";

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
  if (categoriaChaveAcessoInput.value == 1 || categoriaChaveAcessoInput.value == 4) {
    itemURL.classList.add("esconderItemFormulario");
  } else {
    itemURL.classList.remove("esconderItemFormulario");
  }
  if (categoriaChaveAcessoInput.value == 2 || categoriaChaveAcessoInput.value == 3) {
    itemNome.classList.add("esconderItemFormulario");
  } else {
    itemNome.classList.remove("esconderItemFormulario");
  }
});

function obterDadosTela() {

  let listaInput = document.getElementById("lista");

  let caixaClasse = document.createElement("caixa");

    caixaClasse.classList.add("caixa");

  caixaClasse.innerHTML =
    `
      <div class="item">
        <div class="cabecalho">
          <div class="logo">
            <i class="ri-google-fill"></i>
          </div>
          <div class="numero-contas">
            <p>22 Contas</p>
          </div>
        </div>
        <div class="conteudo">
          <p>Google</p>
        </div>
        <div class="rodape">
          <div class="rodape-categoria">
            <p>Categoria:</p>
            <span>Serviços</span>
          </div>
          <div class="rodape-criacao">
            <p>Criado em:</p>
            <span>02/02/2020 às 10:45:03</span>
          </div>
        </div>
      </div>
    `;

    listaInput.appendChild(caixaClasse);

}

this.obterDadosTela();
