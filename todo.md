# checklist
- [-] models -> 
    - [x] Por enquanto só três: usuário, concurso e item
    - [ ] Talvez criar nova entidade para tratar os uploads
- [ ] Controllers
    - [ ] Controller usuário
    - [ ] Controller concurso
    - [ ] Controller item
    - [ ] Controller geral
- [ ] Views
    - [ ] homepage do usuário, com link para login e cadastro de usuário
    - [ ] página root (tem que iterar para saber o que vai ser essa página)
    - [ ] página de adminstrador
    - [ ] Views usuário
        - [ ] usuarioCreate -> view do usuário
        - [ ] usuarioEdit -> view de edição do administrador
        - [ ] usuarioEdit -> view de edição do próprio usuário
        - [ ] usuarioList -> view do administrador
        - [ ] usuarioLogin
        - [ ] usuarioLogin erro de autenticação
        - [ ] usuarioLogout
        - [ ] usuarioDesabilitadoComSucesso
        - [ ] usuarioDeletadoComSucesso
    - [ ] Views concurso
        - [ ] concursoCreate
        - [ ] concursoEdit
        - [ ] concursoDeletadoComSucesso
        - [ ] concursoList -> visão de admin
        - [ ] concursoList -> visão de usuário
        - [ ] concursoView -> visão de usuário da página de concurso
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