window.onload = main;

function main(){

    compruebaSesion();

document.getElementById('creaEvento').addEventListener("submit",creaEvento,false);

}

function creaEvento(event){
    event.preventDefault();
    let titulo_evento = document.getElementById('titulo_evento').value;
    let cuerpo_evento = document.getElementById('cuerpo_evento').value;
            
    $.ajax({
        type:"POST",
        url: "PHP/eventos.php",//se modifica la ruta
        data: {
            'funcion':'setEventos','titulo_evento' : titulo_evento, 'cuerpo_evento':cuerpo_evento
        },
        success : function(evento){
            alert("Evento insertado con exito");
            
        },
        error : function(xhr,ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        }
    })
}