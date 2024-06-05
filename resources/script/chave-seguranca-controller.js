const URL_CATEGORIA = "http://localhost:5500/resources/database/categoria.json";
const URL_PESSOA_MONITORADA = "http://localhost:5500/resources/database/pessoa-monitorada.json";

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

this.recuperarCategoriaChaveSeguranca();
this.recuperarPessoaMonitorada();
