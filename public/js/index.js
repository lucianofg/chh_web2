/* Futuro scripts */

$('#isenha, #irepsenha').on('keyup', function() {
    if ($('#isenha').val() == $('#irepsenha').val()) {
        $('#irepsenha_mensagem').html('As senhas são iguais').css('color', 'green');
        $('#icadastrar').prop("disabled", false);
    } else {
        $('#irepsenha_mensagem').html('A senhas foram escritas diferentes').css('color', 'red');
        $('#icadastrar').prop("disabled", true);
    }
});

function deletarUsuario(id) {
    $.get('/usuario/' + id + '/delete', (data, status) => {
        alert(status);
    })
}