<?php

//Requerimiento de acceso a base de datos.
require_once(dirname(__FILE__).'/../PHP/DB.php');

class Reservas{

    public $id_reserva;
    public $id_usuario; 
    public $id_pista; 
    public $fecha;
    public $hora;


    //Constructor

    function __construct($id_reserva,$id_usuario,$id_pista,$fecha,$hora){

        $this->id_reserva=$id_reserva;
        $this->id_usuario=$id_usuario;
        $this->id_pista=$id_pista; 
        $this->fecha=$fecha;
        $this->hora=$hora;

    }

    static function getReservas(){
        $sentencia="SELECT * FROM reservas";
        $result = DB::query($sentencia);
        
        // Guardamos la consulta a la base de datos en la variable $result
        $result = mysqli_fetch_all($result, MYSQLI_ASSOC);
        
        $arrayReservas = Array();   //Array que guarda los objetos reservas que se obtienen de la bd

        // Foreach para crear un objeto con cada fila extraida de las reservas y guardarlo en el Array.
        foreach($result as $reserva) {
           array_push($arrayReservas, new Reservas($reserva['id_reserva'],$reserva ['id_usuario'],$reserva['id_pista'],$reserva['fecha'],$reserva['hora']));
        }

        return  ($arrayReservas);  // Devolvemos el Array
    }

    static function disponibilidad(){ //antes de empezar este método he modificado en la bbdd las FK reserva_pista y reserva_usuario 
        $idPista = $_POST['id'];
        $sentenciaReserva="SELECT * FROM reservas where id_pista = '$idPista'";
        
        $result = DB::query($sentenciaReserva);
        $hoy = new DateTime();

        $arrayDias = Array();

        //$date=date_create("2013-03-15");
        // date_add($date,date_interval_create_from_date_string("40 days"));
        // echo date_format($date,"Y-m-d");
        $diaSiguiente = $hoy;
        for($i=0;$i<7;$i++){
            $diaSiguiente = $diaSiguiente -> modify('+1 day');
            $dia = $diaSiguiente->format('Y-m-d');
            
            //inserto en $arrayDias la lista de horas disponibles como valor asociado a la fecha (la fecha es la clave y la lista de disponibilidades es el valor) 
            
            //generar de forma dinámica las horas del día que podrian estar disponibles antes de insertarlas en array días (otro for empezando en la hora de inicio y terminando en la hora de fin por ejemplo de 9h a 22h)
            $horas = Array();
            for($j=9;$j<=22;$j++){
                
                array_push($horas,$j);
            }
            //$todasLasReservas = getReservas();
            // $diaYHoras = Array();
            // array_push($diaYHoras, $dia, $horas);
            $arrayDias[$dia]=$horas;
            // array_push($arrayDias, $diaYHoras);
            //solo introducir las horas que no están asociadas a ninguna reserva de las obtenidas en la bbdd            
            
        }
        return json_encode($arrayDias);
    }

//posible solución a las reservas
//tendremos la lista con las pistas que hay, luego un objeto que muestre la disponibilidad de la pista
//se coge de la bbdd las horas que ya están reservadas y se quitan de las horas de disponibilidad (apertura-cierre)
//{ "id_instalacion" : 23, "nombre_instalacion" : "pista 23", "disponibilidad" : {"2022-02-01" : [8, 9, 10, 11], "2022-02-02" : [9, 10, 11, 14]}}

//hay dos posibilidades, obtener la disponibilidad o obtener las reservas

// if($_POST['funcion']=='getReserva'){      
//     Reservas::getReservas();
//     print Reservas::getReservas() 
// }


}
if($_POST['funcion']=='disponibilidad'){
   
    Reservas::disponibilidad();
    print Reservas::disponibilidad();
}
?>