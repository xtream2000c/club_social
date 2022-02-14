window.onload = main;

function main(){

    document.getElementById('creaNoticia').addEventListener("submit",creaNoticia,false);

    compruebaSesion();

    var noticias = JSON.parse(sessionStorage.getItem("noticias"));

    for(let i=noticias.length-1;i>=0;i--){
        let noticia = noticias[i];
        
        $('#noticias .row').append(`<div class="card col-12 mt-3 bg-info">
            <div class "card-body">
                <h1 class="card-title">${noticia.titulo_noticia}</h1>
                <p class="card-text">${noticia.cuerpo_noticia}</p><br>
            </div>
        </div>`);
        
            
    }
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
        success : function(usu){
            console.log(usu);
            
        },
        error : function(xhr,ajaxOptions, thrownError){
             alert(xhr.status);
             alert(thrownError);
        }
    })
}