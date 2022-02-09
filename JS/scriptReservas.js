window.onload = main;

function main(){
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


    $.ajax({
        type:"POST",
        url: "PHP/reservas.php",//se modifica la ruta
        dataType: "JSON",
        data : {
            'funcion': 'disponibilidad',
            'id':idPista
        },
        success : function(infoReservas){
            //console.log(infoReservas);

            // var nombrePista = storage.getItem(instalaciones[nombre_pista]);
            // console.log(nombrePista);
            document.getElementById('nombrePista').innerHTML+='&nbsp;'+pista.nombre_pista+'&nbsp;'+' Precio: '+pista.precio+'€/hora';
            
            
            for (const fecha in infoReservas) {//para iterar sobre el "objeto" se usa un for y se va iterando en sus keys y values
                let huecos = infoReservas[fecha];
                //console.log(`${fecha}: ${infoReservas[fecha]}`);
                //la lista de horas hay que generarlo de forma dinamica para que solo se metan las horas que estan disponibles
                $('#tablaReservas').append(`<tr><td><h6>${fecha.nombre_pista}</h6></td><td><h6>${fecha}</h6></td><td><h6>
                
                <label for="hora">Escoge una hora:</label>&nbsp;
                    <select name="hora" id="hora">
                    <option value="${infoReservas[fecha][0]}">${infoReservas[fecha][0]}</option>
                    <option value="${infoReservas[fecha][1]}">${infoReservas[fecha][1]}</option>
                    <option value="${infoReservas[fecha][2]}">${infoReservas[fecha][2]}</option>
                    <option value="${infoReservas[fecha][3]}">${infoReservas[fecha][3]}</option>
                    <option value="${infoReservas[fecha][4]}">${infoReservas[fecha][4]}</option>
                    <option value="${infoReservas[fecha][5]}">${infoReservas[fecha][5]}</option>
                    <option value="${infoReservas[fecha][6]}">${infoReservas[fecha][6]}</option>
                    <option value="${infoReservas[fecha][7]}">${infoReservas[fecha][7]}</option>
                    <option value="${infoReservas[fecha][8]}">${infoReservas[fecha][8]}</option>
                    <option value="${infoReservas[fecha][9]}">${infoReservas[fecha][9]}</option>
                    <option value="${infoReservas[fecha][10]}">${infoReservas[fecha][10]}</option>
                    <option value="${infoReservas[fecha][11]}">${infoReservas[fecha][11]}</option>
                    <option value="${infoReservas[fecha][12]}">${infoReservas[fecha][12]}</option>
                    <option value="${infoReservas[fecha][13]}">${infoReservas[fecha][13]}</option>

                </select>
                </h6></td> <td><a href="./reservas.html"><button class="btn btn-outline-secondary" type="button" id="${fecha.id_pista}">Reservar</button></a></td> </tr>`);
                
            }
        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener las instalaciones");
        }
    })

}

