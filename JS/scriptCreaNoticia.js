window.onload = main;

function main(){

    compruebaSesion();

document.getElementById('creaNoticia').addEventListener("submit",creaNoticia,false);

}

function creaNoticia(event){
    event.preventDefault();
    let titulo_noticia = document.getElementById('titulo_noticia').value;
    let cuerpo_noticia = document.getElementById('cuerpo_noticia').value;
            
    $.ajax({
        type:"POST",
        url: "PHP/noticias.php",//se modifica la ruta
        data: {
            'funcion':'setNoticias','titulo_noticia' : titulo_noticia, 'cuerpo_noticia':cuerpo_noticia
        },
        success : function(noticia){
            alert("noticia insertada con exito");
            
        },
        error : function(xhr,ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        }
    })
}