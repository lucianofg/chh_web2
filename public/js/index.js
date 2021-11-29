/* Durante o cadastro do usuário, verifica se as senhas colocadas são equivalentes */
$('#isenha, #irepsenha').on('keyup', function() {
    if ($('#isenha').val() == $('#irepsenha').val()) {
        $('#irepsenha_mensagem').html('As senhas são iguais').css('color', 'green');
        $('#icadastrar').prop("disabled", false);
    } else {
        $('#irepsenha_mensagem').html('A senhas foram escritas diferentes').css('color', 'red');
        $('#icadastrar').prop("disabled", true);
    }
});

function validarEmail(email) {
    alert("validarEmail não implementado");
}

function votarItem(id) {
    /*
    var votoRequest = $.post(
        '/item/vote',
        { id: id },
    ).done(() => { 
    */

    id_item = `votar_${id}`
    document.getElementById(id_item).innerHTML = "Desfazer";

}
