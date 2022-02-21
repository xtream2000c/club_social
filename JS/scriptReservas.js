window.onload = main;

function main(){

    compruebaSesion()

    var idPista = sessionStorage.getItem('idPista');
    var instalaciones = JSON.parse(sessionStorage.getItem('instalaciones'));//esto es una cadena y necesito un json por eso se le pone el JSON.parse
    
    var pista = null;
    for(let i=0;i<instalaciones.length;i++){
        //iterar entre todos los objetos hasta encontrar el que tiene el mismo id
        console.log(instalaciones[i]);
        if(instalaciones[i].id_pista==idPista){
            pista = instalaciones[i];
            break;//porque ya se ha encontrado la pista
        }
    }
    console.log(pista.nombre_pista);
    // console.log(instalaciones);

    //para el boton reservar se hace un listener que haga una petición ajax llame a la funcion reservar
    function asociarListenerReserva(){
        //alert('estoy en asociarListenerReserva()');
        //query que devuelva los botones
        $('.botonReservar').click(function(event){
            let fecha;
            let hora;
            let pista=idPista;
            
            let tr = event.target.parentNode.parentNode;//para obtener el tr del boton al que se le hizo click
            console.log(tr);
            fecha=$(tr).find('.fecha').text();
            hora=$(tr).find('.hora').val();
            console.log(`se está intentando reservar la pista ${pista} el dia ${fecha} a las ${hora} horas`);
            
            var usuarioSesion = JSON.parse(sessionStorage.getItem("usuarioSesion"));
            var idUser = usuarioSesion[0].id;
            console.log(idUser);
            $.ajax({
                type:"POST",
                url: "PHP/reservas.php",//se modifica la ruta
                dataType: "JSON",
                data : {
                    'funcion': 'reservar',
                    'id_pista':pista,
                    'id_usuario':idUser,//aqui hay que poner el id del usuario obtenido del session storage ESTA PENDIENTE
                    'fecha':fecha,
                    'hora':hora
                },
                success : function(respuesta){
                    if(respuesta.status=='OK'){
                        alert('su reserva ha sido realizada correctamente');//cambiar por un modal
                        location.href = "index.html";
                    }else{
                        alert('ha ocurrido un error, intente de nuevo')
                    }

                },
                error : function(XHR, status){
                     alert("No se ha podido conectar con la base de datos para reservar");
                }

            })

        });
    }

    $.ajax({
        type:"POST",
        url: "PHP/reservas.php",//se modifica la ruta
        dataType: "JSON",
        data : {
            'funcion': 'disponibilidad',
            'id':idPista
        },
        success : function(infoReservas){
            console.log(infoReservas);

            // var nombrePista = storage.getItem(instalaciones[nombre_pista]);
            // console.log(nombrePista);
            document.getElementById('nombrePista').innerHTML+='&nbsp;'+pista.nombre_pista+'&nbsp;'+' Precio: '+pista.precio+'€/hora';
            
            
            for (const fecha in infoReservas) {//para iterar sobre el "objeto" se usa un for y se va iterando en sus keys y values
                let huecos = infoReservas[fecha];
                //console.log(`${fecha}: ${infoReservas[fecha]}`);
                //la lista de horas hay que generarlo de forma dinamica para que solo se metan las horas que estan disponibles
                let select='';
                if(huecos.length==0){
                    select='SIN DISPONIBILIDAD';
                }else{
                    select='<select name="hora" class="hora">';
                    //se genera una cadena y se le van concatenando los valores antes de meterla
                    for(let i=0;i<huecos.length;i++){
                        select = select+`<option value="${huecos[i]}">${huecos[i]}</option>`;
                    }
                    select=select+'</select>';
                }
                
                $('#tablaReservas').append(`<tr><td><h6>${pista.nombre_pista}</h6></td><td><h6 class='fecha'>${fecha}</h6></td><td><h6>
                
                <label for="hora">Escoge una hora:</label>&nbsp;
                    `+select+`
                </h6></td> <td><button class="botonReservar btn btn-outline-secondary" type="button" id="btn_${fecha.id_pista}">Reservar</button></td> </tr>`);
                //para el boton reservar se hace un listener que haga una petición ajax llame a la funcion reservar 

            }
            asociarListenerReserva();
        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener las instalaciones");
        }

        

    })


    
    
    


}

