document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('armarioForm');
    const listaArmarios = document.getElementById('listaArmarios');
    const pesquisaArmariosInput = document.getElementById('pesquisaArmarios');
    let modoEdicao = false; // Variável para controlar se está no modo de edição

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (modoEdicao) {
            // Lógica para salvar os dados editados
            salvarEdicao();
        } else {
            // Lógica para adicionar um novo armário
            adicionarNovoArmario();
        }
    });

    function salvarEdicao() {
        const usuario = document.getElementById('usuario').value;
        const numeroArmario = document.getElementById('numeroArmario').value;
        const setor = document.getElementById('campoSetor').value;

        // Lógica para salvar os dados editados no backend

        // Exemplo: Atualizando o item na lista
        const itemEditado = document.querySelector('.editando');
        if (itemEditado) {
            itemEditado.innerHTML = `
                <span>${usuario}</span>
                <span>${numeroArmario}</span>
                <span>${setor}</span>
                <button class="editar" onclick="editarArmario(this)">Editar</button>
                <button onclick="excluirArmario(this)">Excluir</button>
            `;
        }

        // Limpar o formulário e resetar o modo de edição
        form.reset();
        modoEdicao = false;

        // Restaurar o botão "Cadastrar"
        const botaoCadastrar = form.querySelector('.caduser');
        botaoCadastrar.style.display = 'inline-block';

        // Ocultar os botões "Salvar" e "Limpar"
        ocultarBotoesEdicao();
    }

    function adicionarNovoArmario() {
        const usuario = document.getElementById('usuario').value;
        const numeroArmario = document.getElementById('numeroArmario').value;
        const setor = document.getElementById('campoSetor').value;

        // Lógica para enviar os dados para o backend e salvar no banco de dados

        // Exemplo: Adicionando o novo armário à lista
        const novoArmario = { usuario, numeroArmario, setor };
        adicionarArmarioNaLista(novoArmario);

        // Limpar o formulário após a submissão
        form.reset();
    }

    pesquisaArmariosInput.addEventListener('input', function () {
        const termoPesquisa = pesquisaArmariosInput.value.toLowerCase();
        const armarios = listaArmarios.querySelectorAll('li');

        armarios.forEach(function (armario) {
            const spans = armario.querySelectorAll('span');
            const textoArmario = `${spans[0].textContent} ${spans[1].textContent} ${spans[2].textContent}`.toLowerCase();

            if (textoArmario.includes(termoPesquisa)) {
                armario.style.display = 'flex'; // Exibir se o termo de pesquisa for encontrado
            } else {
                armario.style.display = 'none'; // Ocultar se não for encontrado
            }
        });
    });

    function adicionarArmarioNaLista(armario) {
        const novoItem = document.createElement('li');
        novoItem.innerHTML = `
            <span>${armario.usuario}</span>
            <span>${armario.numeroArmario}</span>
            <span>${armario.setor}</span>
            <button class="editar" onclick="editarArmario(this)">Editar</button>
            <button onclick="excluirArmario(this)">Excluir</button>
        `;
        listaArmarios.appendChild(novoItem);
    }

    window.editarArmario = function (botaoEditar) {
        const item = botaoEditar.closest('li'); // Encontrar o elemento <li> mais próximo

        if (item) {
            const spans = item.querySelectorAll('span');

            // Preencher o formulário com os dados do armário selecionado
            document.getElementById('usuario').value = spans[0].textContent;
            document.getElementById('numeroArmario').value = spans[1].textContent;
            document.getElementById('campoSetor').value = spans[2].textContent;

            // Exibir os botões "Salvar" e "Limpar"
            const botaoCadastrar = form.querySelector('.caduser');
            botaoCadastrar.style.display = 'none';

            const botaoSalvar = form.querySelector('.salvar-btn');
            botaoSalvar.style.display = 'inline-block';
            botaoSalvar.addEventListener('click', salvarEdicao);

            const botaoLimpar = form.querySelector('.limpar-btn');
            botaoLimpar.style.display = 'inline-block';
            botaoLimpar.addEventListener('click', limparFormulario);

            // Marcar o item como editando
            item.classList.add('editando');
            modoEdicao = true;
        }
    };

    function limparFormulario() {
        // Limpar o formulário e resetar o modo de edição
        form.reset();
        modoEdicao = false;

        // Restaurar o botão "Cadastrar"
        const botaoCadastrar = form.querySelector('.caduser');
        botaoCadastrar.style.display = 'inline-block';

        // Ocultar os botões "Salvar" e "Limpar"
        ocultarBotoesEdicao();
    }

    window.excluirArmario = function (botaoExcluir) {
        // Lógica para excluir o armário no backend

        // Remover o item da lista
        const item = botaoExcluir.closest('li');
        listaArmarios.removeChild(item);

        // Limpar o formulário e resetar o modo de edição
        form.reset();
        modoEdicao = false;

        // Restaurar o botão "Cadastrar"
        const botaoCadastrar = form.querySelector('.caduser');
        botaoCadastrar.style.display = 'inline-block';

        // Ocultar os botões "Salvar" e "Limpar"
        ocultarBotoesEdicao();
    };

    function ocultarBotoesEdicao() {
        const botaoSalvar = form.querySelector('.salvar-btn');
        botaoSalvar.style.display = 'none';
        botaoSalvar.removeEventListener('click', salvarEdicao);

        const botaoLimpar = form.querySelector('.limpar-btn');
        botaoLimpar.style.display = 'none';
        botaoLimpar.removeEventListener('click', limparFormulario);
    }
});
