/* 
  CONFIGURACION DE LA BASE DE DATOS.
  * SE CONFIGURA EL HOST, USUARIO Y BASE DE DATOS DE MySQL.
  * SE EXPORTA LA CONFIGURACIÓN PARA QUE PUEDA SER UTILIZADA EN OTROS ARCHIVOS.
*/

module.exports = {
    HOST: "localhost", // Hostname del servidor de MySQL. Se llama localhost porque utiliza el mismo servidor que el servidor de Node.js.
    USER: "root", // Username que la aplicación utilizará para autenticar con el servidor de MySQL.
    DB: "FoodSafe" // Nombre de la base de datos que se utilizará en el servidor de MySQL.
  };