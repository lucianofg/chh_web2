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

function votarItem(id, usuario_id) {
    var id_item = `votar_${id}`
    var btn = document.getElementById(id_item);
    if (btn.innerHTML == "Gostei") {
        $.post('/api/item/votar', {
            item_id: id,
            usuario_id: usuario_id,
            gostou: false 
        }, (data, status) => {
            alert("Data: " + data + "\nStatus: " + status);
        })
        document.getElementById(id_item).innerHTML = "Gostar";
        document.getElementById(id_item).className = "btn btn-outline-success"
    } else {
        $.post('/api/item/votar', {
            item_id: id,
            usuario_id: usuario_id,
            gostou: true 
        }, (data, status) => {
            alert("Data: " + data + "\nStatus: " + status);
        })
        document.getElementById(id_item).innerHTML = "Gostei";
        document.getElementById(id_item).className = "btn btn-success"
    }
}
$("button").click(function(){
  $.post("demo_test_post.asp",
  {
    name: "Donald Duck",
    city: "Duckburg"
  },
  function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
  });
}); 
