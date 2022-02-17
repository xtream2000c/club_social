window.onload = main;

function main(){
    location.reload;

    imprimireventos();
    compruebaSesion();

}

function imprimireventos(){

    var eventos = JSON.parse(sessionStorage.getItem("eventos"));

    for(let i=eventos.length-1;i>=0;i--){
        let evento = eventos[i];
        
        $('#eventos .row').append(`<div class="card col-12 mt-3 bg-info">
            <div class "card-body">
                <h1 class="card-title">${evento.titulo_evento}</h1>
                <p class="card-text">${evento.cuerpo_evento}</p><br>
                <button class="btn btn-danger mb-2" id="eliminarevento${evento.id_evento}" onclick=" eliminarevento(${evento.id_evento})">Eliminar</button>
                <button class="btn btn-warning mb-2" id="editarevento${evento.id_evento}" onclick=" editarevento(${evento.id_evento})">Editar</button>
            </div>
        </div>`);
        
    }

}


function eliminarevento(id) {

    $.ajax({
        type:"POST",
        url: "PHP/eventos.php",
        data: {'funcion':'EliminarEvento', 'id_eliminar':id},
        dataType: "JSON",
        success : function(eventos){
            
            alert("evento eliminado de forma satisfactoria");

            $.ajax({
                type:"POST",
                url: "PHP/eventos.php",
                data: {'funcion':'getEventos'},
                dataType: "JSON",
                success : function(eventos){
        
                    //console.log(eventos);
                    if(1==1 || eventos.status === "success"){//mismo caso que instalaciones, conviene quitar el if
        
                       // console.log("success");
        
                        sessionStorage.setItem("eventos", JSON.stringify(eventos));
                        location.href="eventosPresidente.html";
                    }else{
                        alert("error");
                    }
                },
                error : function(XHR, status){
                     alert("No se ha podido conectar con la base de datos para obtener las eventos");
                }
            })

        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener las eventos");
        }
    })
}

function editarevento(id) {

    var eventos = JSON.parse(sessionStorage.getItem("eventos"));
    for(let i=eventos.length-1;i>=0;i--){
        if(eventos[i].id_evento == id){
            var eventoEditar = eventos[i];
        }

    } 

    sessionStorage.setItem("eventoEditar", JSON.stringify(eventoEditar));
    location.href="editarEvento.html"

}