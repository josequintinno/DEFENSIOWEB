const URL_CATEGORIA = "http://localhost:5500/resources/database/categoria.json";
const URL_PESSOA_MONITORADA = "http://localhost:5500/resources/database/pessoa-monitorada.json";
const URL_API_ACESSO = "http://localhost:8080/api/v1/acesso/";

let categoriaList = [];
let pessoaMonitoradaList = [];

function recuperarCategoriaChaveSeguranca() {
    fetch(URL_CATEGORIA)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro: API não está disponível");
            }
            return response.json();
        }).then(data => {
            categoriaList = data;
            popularDadosCategoriaChaveSeguranca(categoriaList);
        }).catch(error => {
            throw new Error(`Erro: ${error}`);
        });
}

function popularDadosCategoriaChaveSeguranca(categoriaList) {

    const categoriaChaveAcessoInput = document.getElementById("categoria-chave-acesso");
    const optionList = document.createElement("option");

    if (!categoriaChaveAcessoInput) {
        throw new Error("Elemento não encontrado!");
    }

    categoriaChaveAcessoInput.innerHTML = "";
    optionList.textContent = "Selecione";
    optionList.value = "";
    categoriaChaveAcessoInput.appendChild(optionList);

    categoriaList.forEach(categoria => {
        const option = document.createElement("option");
            option.textContent = categoria.descricao;
            option.value = categoria.codigo;
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

function persistir() {

    event.preventDefault();

    const codigoCategoria = document.getElementById("categoria-chave-acesso");
    const codigoPessoaMonitorada = document.getElementById("pessoa-monitorada");
    const identificador = document.getElementById("identificador");
    const chave = document.getElementById("chave");
    const aplicativo = document.getElementById("aplicativo");
    const url = document.getElementById("url");

    const chaveSegurancaObject = {
        codigoCategoria: codigoCategoria.value,
        codigoPessoaMonitorada: codigoPessoaMonitorada.value,
        identificador: identificador.value,
        chave: chave.value,
        aplicativo: aplicativo != null ? aplicativo.value : null,
        url: url != null ? url.value : null
    }

    fetch(URL_API_ACESSO, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(chaveSegurancaObject)
    })
    .then(response => response.ok ? console.log('Dados enviados com sucesso!') : Promise.reject('Erro ao enviar os dados. Status code: ' + response.status + '. Resposta da API: ' + response.statusText))
    .catch(error => console.error('Erro de conexão ao enviar os dados para a API:', error));

}

this.recuperarCategoriaChaveSeguranca();
this.recuperarPessoaMonitorada();
