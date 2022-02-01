<?php 

//Requerimiento de acceso a base de datos.
require_once(dirname(__FILE__).'/../PHP/DB.php');
// echo $_POST['funcion'];
print_r($_POST);
// $resultado = json_decode($_POST);

// $funcion = $_POST['funcion'];

class Usuarios {
    
    //Atributos han de ser publicos , si no tendríamos que tener un get para cada uno.
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

        return json_encode($usuarios);
    }

    static function setUsuario(){
        // set parameters and execute
        print('ahora estoy aqui');
        $nombre = $_POST['nombre'];
        $apellidos = $_POST['apellidos'];
        $email = $_POST['email'];
        $edad = $_POST['edad'];
        $miembros = $_POST['miembros'];
        $usuario = $_POST['usuario'];
        $contraseña = $_POST['contraseña'];
        $errores=[];//se crea un array que contendrá los errores

        //control de errores
        if($edad<0){
            $errores[]= 'La edad no puede ser menor a cero';
        }
        $sentencia = " INSERT INTO usuarios (id,nombre,apellidos,tipo_usuario,email,edad,miembros,usuario,contraseña) VALUES ('','$nombre','$apellidos','Invitado','$email','$edad','$miembros','$usuario','$contraseña')";

        DB::query($sentencia);
        
    }
    
}
if($_POST['funcion']=='setUsuario'){
    Usuarios::setUsuario();
    print('estoy aqui');
}

?>
