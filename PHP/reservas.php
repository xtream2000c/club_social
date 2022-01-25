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
        
        $arrayReservas = Array();   // Array que guarda los objetos reservas que se obtienen de la bd

        // Foreach para crear un objeto con cada fila extraida de las reservas y guardarlo en el Array.
        foreach($result as $reserva) {
           array_push($arrayReservas, new Reservas($reserva['id_reserva'],$reserva ['id_usuario'],$reserva['id_pista'],$reserva['fecha'],$reserva['hora']));
        }

        return json_encode ($arrayReservas);  // Devolvemos el Array
    }

}