window.onload = main;

function main(){

    compruebaSesion();

    var evento = JSON.parse(sessionStorage.getItem("eventoEditar"));

    document.getElementById("titulo_eventoEditar").value= evento["titulo_evento"];
    document.getElementById("cuerpo_eventoEditar").value= evento["cuerpo_evento"];

    document.getElementById("editarEvento").addEventListener("submit", editarevento, false)

}

function editarevento(event) {
   
    event.preventDefault();

    var evento = JSON.parse(sessionStorage.getItem("eventoEditar"));

    let titulo_evento = document.getElementById("titulo_eventoEditar").value;
    let cuerpo_evento = document.getElementById("cuerpo_eventoEditar").value;
    let id_editar = evento['id_evento'];
    $.ajax({
        type:"POST",
        url: "PHP/eventos.php",//se modifica la ruta
        data: {
            'funcion':'editarEvento','id_editar' : id_editar ,'titulo_evento' : titulo_evento, 'cuerpo_evento':cuerpo_evento
        },
        success : function(evento){
            alert("evento editada con exito");

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
        
                    }else{
                        alert("error");
                    }
                },
                error : function(XHR, status){
                     alert("No se ha podido conectar con la base de datos para obtener las eventos");
                }
            })

            location.href = "eventosPresidente.html"
            
        },
        error : function(xhr,ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        }
    })

}