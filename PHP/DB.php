<?php 

class DB{ 
    private static $server = 'localhost';
    private static $dbName = 'club_social';
    private static $user = 'root';
    private static $password = '';

    function __construct(){}

    //Conecta y cierra con la base de datos
    static function query($sentencia){
        //Abro Conexion
        $conexion=mysqli_connect(self::$server, self::$user, self::$password, self::$dbName);
        //ejecuto sentencia MariaDB
        $resultado = mysqli_query( $conexion,$sentencia);// or die(mysqli_error($conexion));
        //Cierro Conexion
        if(!$resultado){
            echo mysqli_error($conexion);
        }
        
        mysqli_close($conexion);
        

        //Devuelvo resultado OBTENIDO de la SENTENCIA dada
        return $resultado;
    }
        //Se usa SELF:: para llamar metodos estaticos en la misma clase
        //self::query($sentencia);
}

?>
