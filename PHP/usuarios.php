<?php 

//Requerimiento de acceso a base de datos.
require_once(dirname(__FILE__).'/../PHP/DB.php');
// echo $_POST['funcion'];
//print_r($_POST);
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
        // print('ahora estoy aqui');
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
        try{
            $sentencia = " INSERT INTO usuarios (id,nombre,apellidos,tipo_usuario,email,edad,miembros,usuario,contraseña) VALUES ('','$nombre','$apellidos','Invitado','$email','$edad','$miembros','$usuario','$contraseña')";

            DB::query($sentencia);
        }catch(Exception $e){
            $errores[]=$e->getMessage();//añado el mensaje del error
        }
        //se imprime un objeto json haya errores o no
        if(sizeof( $errores) > 0){
            print(json_encode(array('status'=>'error','mensaje'=>$errores)) );
        }else{
            print(json_encode(array('status'=>'ok')));
        }
        
    }

    static function getUsuario(){
        // set parameters and execute

        $usuario = $_POST['usuario'];
        $contraseña = $_POST['contraseña'];

        $sentencia = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND contraseña = '$contraseña'";

        $usuarioSesion = mysqli_fetch_all(DB::query($sentencia),MYSQLI_ASSOC);
        
        if(!empty($usuarioSesion)){
            return json_encode($usuarioSesion);
        }
        else{
            return false;
        }
        

    }

    static function eliminarUsuario(){
        // set parameters and execute
        // print('ahora estoy aqui');
        $id_eliminar = $_POST['id_eliminar'];
        
        $errores=[];//se crea un array que contendrá los errores

        try{
            $sentencia = "DELETE FROM usuarios WHERE usuarios.id = $id_eliminar";

            DB::query($sentencia);

        }catch(Exception $e){
            $errores[]=$e->getMessage();//añado el mensaje del error
        }
        //se imprime un objeto json haya errores o no
        if(sizeof( $errores) > 0){
            print(json_encode(array('status'=>'error','mensaje'=>$errores)) );
        }else{
            print(json_encode(array('status'=>'ok')));
        }
        
    }
    
    static function editarUsuario(){
        // set parameters and execute
        // print('ahora estoy aqui');
        $id_editar = $_POST['id_editar'];
        $nombre = $_POST['nombre'];
        $apellidos = $_POST['apellidos'];
        $tipo_usuario = $_POST['tipoUsuario'];
        $email = $_POST['email'];
        $edad = $_POST['edad'];
        $miembros = $_POST['miembros'];
        $usuario = $_POST['usuario'];
        
        
        $errores=[];//se crea un array que contendrá los errores

        try{
            $sentencia = "UPDATE usuarios SET nombre = '$nombre' , apellidos =  '$apellidos', email = '$email' , edad =  '$edad' , miembros = '$miembros' , usuario =  '$usuario' , tipo_usuario =  '$tipo_usuario' WHERE usuarios.id = $id_editar";

            DB::query($sentencia);

        }catch(Exception $e){
            $errores[]=$e->getMessage();//añado el mensaje del error
        }
        //se imprime un objeto json haya errores o no
        if(sizeof( $errores) > 0){
            print(json_encode(array('status'=>'error','mensaje'=>$errores)) );
        }else{
            print(json_encode(array('status'=>'ok')));
        }
        
    }
    
}
if($_POST['funcion']=='setUsuario'){
    Usuarios::setUsuario();
    // print('estoy aqui');
}
if($_POST['funcion']=='getUsuario'){
    //Usuarios::getUsuario();  
    print Usuarios::getUsuario(); 
}
if($_POST['funcion']=='getUsuarios'){
    //Usuarios::getUsuario();  
    print Usuarios::getUsuarios(); 
}
if($_POST['funcion']=='eliminarUsuario'){

    Usuarios::eliminarUsuario();//Llama a eliminar un Usuario

}

if($_POST['funcion']=='editarUsuario'){

    Usuarios::editarUsuario();//Llama a editar un Usuario

}
//posible solución a las reservas
//tendremos la lista con las pistas que hay, luego un objeto que muestre la disponibilidad de la pista
//se coge de la bbdd las horas que ya están reservadas y se quitan de las horas de disponibilidad (apertura-cierre)
//{ "id_instalacion" : 23, "nombre_instalacion" : "pista 23", "disponibilidad" : {"2022-02-01" : [8, 9, 10, 11], "2022-02-02" : [9, 10, 11, 14]}}
?>
