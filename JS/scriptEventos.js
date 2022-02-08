window.onload = main;

function main(){

    compruebaSesion();

    var eventos = JSON.parse(sessionStorage.getItem("eventos"));

    for(let i=eventos.length-1;i>=0;i--){
        let even = eventos[i];
        
        $('#eventos .row').append(`<div class="card col-12 mt-3 bg-info">
            <div class "card-body">
                <h1 class="card-title">${even.titulo_evento}</h1>
                <p class="card-text">${even.cuerpo_evento}</p><br>
            </div>
        </div>`);
        
            
    }
}