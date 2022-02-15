window.onload = main;

function main(){

    

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

