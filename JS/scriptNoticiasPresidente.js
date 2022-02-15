window.onload = main;

function main(){
    location.reload;

    imprimirNoticias();
    compruebaSesion();

}

function imprimirNoticias(){

    var noticias = JSON.parse(sessionStorage.getItem("noticias"));

    for(let i=noticias.length-1;i>=0;i--){
        let noticia = noticias[i];
        
        $('#noticias .row').append(`<div class="card col-12 mt-3 bg-info">
            <div class "card-body">
                <h1 class="card-title">${noticia.titulo_noticia}</h1>
                <p class="card-text">${noticia.cuerpo_noticia}</p><br>
                <button class="btn btn-danger mb-2" id="eliminarNoticia${noticia.id_noticia}" onclick=" eliminarNoticia(${noticia.id_noticia})">Eliminar</button>
                <button class="btn btn-warning mb-2" id="editarNoticia${noticia.id_noticia}" onclick=" editarNoticia(${noticia.id_noticia})">Editar</button>
            </div>
        </div>`);
        
    }

}


function eliminarNoticia(id) {

    $.ajax({
        type:"POST",
        url: "PHP/noticias.php",
        data: {'funcion':'EliminarNoticia', 'id_eliminar':id},
        dataType: "JSON",
        success : function(noticias){
            
            alert("Noticia eliminada de forma satisfactoria");

            $.ajax({
                type:"POST",
                url: "PHP/noticias.php",
                data: {'funcion':'getNoticias'},
                dataType: "JSON",
                success : function(noticias){
        
                    //console.log(noticias);
                    if(1==1 || noticias.status === "success"){//mismo caso que instalaciones, conviene quitar el if
        
                       // console.log("success");
        
                        sessionStorage.setItem("noticias", JSON.stringify(noticias));
                        location.href="noticiasPresidente.html";
                    }else{
                        alert("error");
                    }
                },
                error : function(XHR, status){
                     alert("No se ha podido conectar con la base de datos para obtener las noticias");
                }
            })

        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener las noticias");
        }
    })
}

function editarNoticia(id) {

    var noticias = JSON.parse(sessionStorage.getItem("noticias"));
    for(let i=noticias.length-1;i>=0;i--){
        if(noticias[i].id_noticia == id){
            var noticiaEditar = noticias[i];
        }

    } 

    sessionStorage.setItem("noticiaEditar", JSON.stringify(noticiaEditar));
    location.href="editarNoticia.html"

}