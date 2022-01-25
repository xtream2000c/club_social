<?php 

//Requerimiento de acceso a base de datos.
require_once(dirname(__FILE__).'/../PHP/DB.php');


class Usuarios {

    //Atributos han de ser publicos , si no tendríamos que tener un get para cada uno!
    public $id;
    public $nombre;
    public $apellidos;
    public $tipo_usuario;
    public $email;
    public $edad;
    public $miembros;
    public $usuario;
    public $contraseña;

    function __construct($id,$nombre,$apellidos,$tipo_usuario,$email,$edad,$miembros,$usuario,$contraseña) {

        $this->id=$id;
        $this->nombre=$nombre;
        $this->apellidos=$apellidos;
        $this->tipo_usuario=$tipo_usuario;
        $this->email=$email;
        $this->edad=$edad;
        $this->miembros=$miembros;
        $this->usuario=$usuario;
        $this->contraseña=$contraseña;

    }

    static function getUsuarios(){
        $sentencia = "SELECT * FROM usuarios";
        $result = mysqli_fetch_all(DB::query($sentencia),MYSQLI_ASSOC);
        $usuarios = Array();
        foreach($result as $usuario){
            array_push($usuarios, new Usuarios($usuario["id"],$usuario["nombre"],$usuario["apellidos"],$usuario["tipo_usuario"],$usuario["email"],$usuario["edad"],$usuario["miembros"],$usuario["usuario"],$usuario["contraseña"]));
        }

        return $usuarios;
    }

    
}

?>