window.onload = main;

function main() {
    
    compruebaSesion();
    document.getElementById("contacto").addEventListener("submit", enviarCorreo, false)

}

function enviarCorreo(event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("email").value;
    let asunto = document.getElementById("asunto").value;
    let cuerpo = document.getElementById("cuerpo").value;




    $.ajax({
        type:"POST",
        url: "PHP/contacto.php",//se modifica la ruta
        data: {
            'nombre': nombre, 'correo' : correo, 'asunto' : asunto, 'cuerpo' : cuerpo
        },
        success : function(enviado){

            alert("El correo se envio de forma exitosa");
            location.href='index.html';

        },

        error : function(xhr,ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);

        }
    })
}