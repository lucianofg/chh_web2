# checklist
- [ ] Configurar o multer para  o upload de arquivos
- [ ] Ver como recuperar o link do arquivo no controller do item
- [x] Decidir qual vai ser o meio de autenticação
- [ ] Configurar middleware de sessão para salvar o id do usuário e se
    ele é admin (talvez o email dele também)

- [x] models -> 
    - [x] Por enquanto só três: usuário, concurso e item
    - [x] Talvez criar nova entidade para tratar os uploads -> Eu acho que não vai ser necessário

- [ ] Controllers
    - [x] Controller usuário
        - [x] Funções de senha (geralSalt, hashSenha e verificarHash)
        - [x] getUsuarioCreate 
        - [x] postUsuarioCreate 
        - [x] getUsuarioEdit -> isso fica como edição do admin eu acho melhor um endpoint..
        - [x] getUsuarioSelfEdit -> pro usuário editar seu próprio perfil
        - [x] postUsuarioEdit
        - [x] getUsuarioDelete
        - [x] getUsuarioDisable
        - [x] getUsuarioLogin
        - [x] postUsuarioLogin
        - [x] postUsuarioLogout

    - [ ] Controller concurso
        - [ ] getConcursoResultado
        - [x] getListaConcursosView
        - [x] getConcursoView
        - [x] getConcursoCreate
        - [x] postConcursoCreate
        - [x] getConcursoEdit
        - [x] postConcursoEdit
        - [x] getConcursoDelete

    - [ ] Controller item
        - [ ] getListaItensView
        - [ ] getItemView
        - [x] getItemCreate
        - [x] postItemCreate
        - [x] getItemEdit
        - [x] postItemEdit
        - [ ] getItemDelete
        - [ ] getListaItensComVotos
        - [ ] getVotosItemConcurso
        - [x] postVotarItemConcurso

    - [ ] Controller geral
        - [x] getRoot -> pagina nenhum usuário logado
        - [x] getHome -> pagina usuario logado
        - [x] getAdmin -> pagina admin logado

- [ ] Views
    - [ ] layout para as páginas do admin
    - [ ] layout para as páginass do usuário
    - [ ] homepage do usuário, com link para login e cadastro de usuário
    - [x] página root (tem que iterar para saber o que vai ser essa página)
    - [ ] página de adminstrador
    - [x] Página de erro 404 -> 404_not_found

    - [ ] Views de erro
        - [ ] usuarioNaoAchado
        - [ ] cocursoNaoAchado
        - [ ] itemNaoAchado

    - [x] Views usuário
        - [x] usuarioCreate -> view do usuário
        - [x] usuarioEdit -> view de edição do administrador
        - [x] usuarioEdit -> view de edição do próprio usuário
        - [x] usuarioList -> view do administrador
        - [x] usuarioLogin
        - [x] usuarioLogin erro de autenticação
        - [x] usuarioLogout

    - [ ] Views concurso
        - [x] concursoCreate
        - [x] concursoEdit
        - [ ] concursoDeletadoComSucesso -> talvez fazer só um alert
        - [x] concursoList -> visão de admin
        - [x] concursoList -> visão de usuário
        - [x] concursoView -> visão de usuário da página de concurso
        - [ ] concursoResultado -> resultado do concurso, com ganhador e tudo
        - [ ] concursoItemView -> visão de usuário dos itens que estão concorrendo no concurso

    - [ ] Views de itens
        - [ ] itemCreate -> visão de usuário
        - [ ] itemEdit -> visão de usuário
        - [ ] itemDeletadoComSucesso
        - [ ] itemList -> lista de todos os itens do usuário
        - [ ] itemVotar -> página de votação de um item


# Detalhes que ficaram para trás:
- [ ] Em usuario_controller.postLoginUsuario tratar melhor a parte em
    que não é achado um usuário válido
- [ ] Checar no cliente se as duas entradas de senha são as mesmas
- [ ] Checar redirect no caso de votação
- [ ] Adicionar opção de voltar em páginas sem menu
- [ ] falha de segurança nos deletes do crud (basicamente tem que checar se o usuário pode fazer tal operação) ou então mudar para um post da vida.
