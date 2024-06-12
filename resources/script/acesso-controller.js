const URL_API = "http://192.168.1.3:8080";
const URL_CATEGORIA_ACESSO = "http://192.168.1.3:8080/api/v1/categoria-acesso";
const URL_PESSOA_MONITORADA = "http://192.168.1.3:8080/api/v1/pessoa";
const URL_API_ACESSO = "http://192.168.1.3:8080/api/v1/acesso";

const LOCAL_ACESSO = "TB_ACESSO";

let categoriaList = [];
let pessoaMonitoradaList = [];

async function recuperarCategoriaChaveSeguranca() {

    let response = await fetch(URL_CATEGORIA_ACESSO);

    let categoriaAcessoList = await response.json();

    const categoriaChaveAcessoInput = document.getElementById("categoria-chave-acesso");
    const optionList = document.createElement("option");
        categoriaChaveAcessoInput.innerHTML = "";
        optionList.textContent = "Selecione";
        optionList.value = "";
        categoriaChaveAcessoInput.appendChild(optionList);

    categoriaAcessoList.forEach(categoriaAcesso => {
        const option = document.createElement("option");
            option.textContent = categoriaAcesso.descricao;
            option.value = categoriaAcesso.codigo;
            categoriaChaveAcessoInput.appendChild(option);
    });
}

function recuperarPessoaMonitorada() {
    fetch(URL_PESSOA_MONITORADA).then(response => {
        return response.json();
    }).then(data => {
        pessoaMonitoradaList = data;
        popularDadosPessoaMonitorada(pessoaMonitoradaList);
    }).catch(error => {
        throw new Error(`Erro: ${error}`);
    });
}

function popularDadosPessoaMonitorada(pessoaMonitoradaList) {

    const pessoaMonitoradaInput = document.getElementById("pessoa-monitorada");
    const optionList = document.createElement("option");

    optionList.textContent = "Selecione"
    optionList.value = 0;

    pessoaMonitoradaInput.innerHTML = "";
    pessoaMonitoradaInput.appendChild(optionList);

    pessoaMonitoradaList.forEach(pessoa => {
        const option = document.createElement("option");
            option.value = pessoa.codigo;
            option.textContent = pessoa.nome;
        pessoaMonitoradaInput.appendChild(option);
    });

}

async function persistir() {

    const codigoCategoria = document.getElementById("categoria-chave-acesso");
    const codigoPessoaMonitorada = document.getElementById("pessoa-monitorada");
    const identificador = document.getElementById("identificador");
    const chave = document.getElementById("chave");
    const aplicativo = document.getElementById("nome-aplicativo");
    const url = document.getElementById("url");

    const chaveSegurancaObject = {
        codigoCategoria: codigoCategoria.value,
        codigoPessoaMonitorada: codigoPessoaMonitorada.value,
        identificador: identificador.value,
        chave: chave.value,
        aplicativo: aplicativo != null ? aplicativo.value : null,
        url: url != null ? url.value : null
    }

    try {
        let response = await fetch(URL_API_ACESSO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chaveSegurancaObject)
        });

        if (!response.ok) {
            throw "ERROR: Não foi possível cadastrar os dados!";
        }

        document.getElementById("categoria-chave-acesso").value = "";
        document.getElementById("pessoa-monitorada").value = "";
        document.getElementById("identificador").value = "";
        document.getElementById("chave").value = "";
        document.getElementById("nome-aplicativo").value = "";
        document.getElementById("url").value = "";

        modalFundoView.classList.remove("apresentarModalFundo");
        modalCadastrarChaveView.classList.remove("apresentarModalCadastrarChave");

    } catch (error) {
        console.error(error);
    }

}

async function persistirLocalstorage(acessoDTO) {
    try {
        const localStorageList = JSON.parse(localStorage.getItem(LOCAL_ACESSO)) || [];
        localStorageList.push(acessoDTO);
        localstorageAdicionar(localStorageList);
    } catch (error) {
        throw new Error("Error: ", error);
    }
}

async function verificarAPI() {
    try {
        const response = await fetch(URL_API);
        if (!response.ok) {
            throw new Error("Erro ao tentar acessar ENDPOINT!");
        }
        return true;
    } catch (error) {
        throw new Error("API não disponível para uso!");
        return false;
    }
    return false;
}

function localstorageAdicionar(acessoList) {
    localStorage.setItem(LOCAL_ACESSO, JSON.stringify(acessoList));
}

async function obterDadosTela() {
    try {
        const response = await fetch(URL_API_ACESSO);
        const acessoList = await response.json();

        acessoList.forEach(acesso => {
            this.configurarComponenteAcesso(acesso);
        });

    } catch (error) {
        throw new Error("API não disponível para uso!");
    }
}

function configurarComponenteAcesso(acesso) {

    let listaInput = document.getElementById("lista");

    let caixaClasse = document.createElement("caixa");

    caixaClasse.classList.add("caixa");

    caixaClasse.innerHTML =
        `
          <div class="item">
            <div class="cabecalho">
              <div class="logo">
                <i class="ri-shield-keyhole-line"></i>
              </div>
              <div class="numero-contas">
                <p>22 Contas</p>
              </div>
            </div>
            <div class="conteudo">
              <p>${acesso.pessoaEntity.nome}</p>
            </div>
            <div class="rodape">
              <div class="rodape-categoria">
                <p>Categoria:</p>
                <span>${acesso.categoriaAcessoEntity.descricao}</span>
              </div>
              <div class="rodape-criacao">
                <p>Criado em:</p>
                <span>${formatarData(acesso.dataCriacao)}</span>
              </div>
            </div>
          </div>
      `;

    listaInput.appendChild(caixaClasse);
}

function formatarData(dataParameter) {

    let data = new Date(dataParameter);
    let dia = data.getDate();
    let mes = data.getMonth();
    let ano = data.getFullYear();
    let hora = data.getHours();
    let minuto = data.getMinutes();
    let segundo = data.getSeconds();

    if (dia < 10) {
        dia = "0" + dia;
    } 

    if (mes < 10) {
        mes = "0" + mes;
    }

    if (minuto < 10) {
        minuto = "0" + minuto;
    }

    return dia + "/" + mes + "/" + ano + " às " + hora + ":" + minuto + ":" + segundo;
}

this.recuperarCategoriaChaveSeguranca();
this.recuperarPessoaMonitorada();
this.obterDadosTela();

