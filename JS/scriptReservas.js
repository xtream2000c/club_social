window.onload = main;

function main(){
    var idPista = sessionStorage.getItem('idPista');
    // var instalaciones = sessionStorage.getItem('instalaciones');
    // var pista = instalaciones[Number(idPista)];
    // console.log(pista);
    alert(idPista);
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
            console.log(infoReservas);
  
            // for(let i=0;i<infoReservas.length;i++){//se itera sobre el array y se imprimen las instalaciones
            //     let reservas = infoReservas[i];
            //     $('#tablaReservas').append(`<tr><td><h6>${reservas.nombre_pista}</h6></td><td><h6>${reservas.fecha}</h6></td><td><h6>${reservas.hora}</h6></td> <td><a href="./reservas.html"><button class="btn btn-outline-light" type="button" id="${reservas.id_pista}">Reservar</button></a></td> </tr>`);
            // }
           
        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener las instalaciones");
        }
    })

}

