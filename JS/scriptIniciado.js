window.onload = main;

function main() {
    //Esto esta por probar

    compruebaSesion();

    $.ajax({
        type:"POST",
        url: "PHP/instalaciones.php",//se modifica la ruta
        data: {'funcion':'getInstalaciones'},
        dataType: "JSON",
        success : function(infoInstalaciones){
            //console.log(infoInstalaciones);
            if(1==1 || infoInstalaciones.status === "success"){//esto es para que entre en el if siempre, es probable que no haga falta el if, el objeto que se recibe como parametro es el json, ese json no tiene success y nunca va a dar true
                //console.log("success");
                sessionStorage.setItem("instalaciones", JSON.stringify(infoInstalaciones));
                
                for(let i=0;i<infoInstalaciones.length;i++){//se itera sobre el array y se imprimen las instalaciones
                    let inst = infoInstalaciones[i];
                    $('#tablaInstalaciones').append(`<tr><td><h6>${inst.tipo_pista}</h6></td><td><h6>${inst.precio}</h6></td><td><h6>${inst.precio_no_socio}</h6></td> <td><button class="btn btn-outline-light"  id="${inst.id_pista}">Reservar</button></td> </tr>`);
                    
                    document.getElementById(`${inst.id_pista}`).addEventListener('click',function(){
                        reservaPista(inst.id_pista);
                    })
                }
            }else{
                alert("error");
            }
        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener las instalaciones");
        }
    })
    
    function reservaPista(id){
        sessionStorage.setItem('idPista',id);//esto tiene que ir antes del href porque si no se va a la otra pagina sin
        location.href = 'reservas.html';
        
    }
    
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
                //console.log('probando if noticias');
                let j = 0;
                
                for(let i=noticias.length-1;i>=noticias.length-3;i--){
                    
                    let notic = noticias[i];
                    if(i==noticias.length-1){//solo en la primera iteración se pone data-bs-slide-to="0" y en el inner la clase active, luego el el else voy añadiendo mas data-bs-slide-to [i], y en el inner ya no lleva la clase active
                       // console.log('probando noticias dentro del for');
                        $('#noticias .carousel-inner').append(`<div class="carousel-item active"><h1>${notic.titulo_noticia}</h1><p>${notic.cuerpo_noticia}</p><br></div>`);
                        $('#noticias .carousel-indicators').append(`<button type="button" data-bs-target="#noticias" data-bs-slide-to="${j}" class="active"></button>`);    
                    }else{
                        $('#noticias .carousel-indicators').append(`<button type="button" data-bs-target="#noticias" data-bs-slide-to="${j}"></button>`);
                        $('#noticias .carousel-inner').append(`<div class="carousel-item"><h1>${notic.titulo_noticia}</h1><p>${notic.cuerpo_noticia}</p><br></div>`);
                    } 
                    j++;  
                }

            }else{
                alert("error");
            }
        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener las noticias");
        }
    })
    
    $.ajax({
        type:"POST",
        url: "PHP/eventos.php",
        data: {'funcion':'getEventos'},
        dataType: "JSON",
        success : function(eventos){
            //console.log(eventos);
            //console.log("success");
            sessionStorage.setItem("eventos", JSON.stringify(eventos));
            let j = 0
            for(let i=eventos.length-1;i>=eventos.length-3;i--){
                let even = eventos[i];
               // console.log('probando eventos');
                if(i==eventos.length-1){//solo en la primera iteración se pone data-bs-slide-to="0" y en el inner la clase active, luego el el else voy añadiendo mas data-bs-slide-to [i], y en el inner ya no lleva la clase active
                    $('#eventos .carousel-indicators').append(`<button type="button" data-bs-target="#eventos" data-bs-slide-to="${j}" class="active"></button>`);
                    $('#eventos .carousel-inner').append(`<div class="carousel-item active"><h1>${even.titulo_evento}</h1><p>${even.cuerpo_evento}</p><br></div>`);
                }else{
                    $('#eventos .carousel-indicators').append(`<button type="button" data-bs-target="#eventos" data-bs-slide-to="${j}"></button>`);
                    $('#eventos .carousel-inner').append(`<div class="carousel-item"><h1>${even.titulo_evento}</h1><p>${even.cuerpo_evento}</p><br></div>`);
                }
                j++;
            }
        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener los eventos");
        }
    })

}