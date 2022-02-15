window.onload = main;

function main(){

    compruebaSesion();

    var noticia = JSON.parse(sessionStorage.getItem("noticiaEditar"));

    document.getElementById("titulo_noticiaEditar").value= noticia["titulo_noticia"];
    document.getElementById("cuerpo_noticiaEditar").value= noticia["cuerpo_noticia"];

    document.getElementById("editarNoticia").addEventListener("submit", editarNoticia, false)

}

function editarNoticia(event) {
   
    event.preventDefault();

    var noticia = JSON.parse(sessionStorage.getItem("noticiaEditar"));

    let titulo_noticia = document.getElementById("titulo_noticiaEditar").value;
    let cuerpo_noticia = document.getElementById("cuerpo_noticiaEditar").value;
    let id_editar = noticia['id_noticia'];
    $.ajax({
        type:"POST",
        url: "PHP/noticias.php",//se modifica la ruta
        data: {
            'funcion':'editarNoticia','id_editar' : id_editar ,'titulo_noticia' : titulo_noticia, 'cuerpo_noticia':cuerpo_noticia
        },
        success : function(noticia){
            alert("noticia editada con exito");

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
        
                    }else{
                        alert("error");
                    }
                },
                error : function(XHR, status){
                     alert("No se ha podido conectar con la base de datos para obtener las noticias");
                }
            })

            location.href = "noticiasPresidente.html"
            
        },
        error : function(xhr,ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        }
    })

}