/*
  CONEXION A LA BASE DE DATOS DE MySQL UTILIZANDO LA LIBRERIA mysql2 (PARTE DE Node.js).
  * mysql2 ES UN DRIVER DE Node.js PARA MySQL.
*/

// IMPORTA LA LIBRERIA MYSQL2 PARA INTERACTUAR CON LA BASE DE DATOS DESDE LA APLICACIÓN DE NODE.JS
const mysql = require('mysql2')
// IMPORTA LA CONFIGURACIÓN DE LA BASE DE DATOS DEL ARCHIVO db.config.js
const dbConfig = require("../config/db.config.js");

/* 
  CREA LA CONEXIÓN A LA BASE DE DATOS DE MySQL.
  * REGRESA UN OBJETO DE CONEXIÓN QUE PUEDE SER UTILIZADO PARA INTERACTUAR CON LA BASE DE DATOS.
*/
const connection = mysql.createConnection({
    // SE PASAN LOS PARAMETROS DE CONEXION A LA BASE DE DATOS.
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});


// ABRE LA CONEXION A LA BASE DE DATOS.
connection.connect(error => {
    // SI HAY UN ERROR DURANTE LA CONEXION, SE MUESTRA Y SE TERMINA LA APLICACION.
    if (error) throw error;
    // SI NO HAY ERROR, SE MUESTRA EN CONSOLA QUE LA CONEXION FUE EXITOSA.
    console.log("Successfully connected to the database.");
});

// EXPORTA EL OBJETO DE CONEXION PARA QUE PUEDA SER UTILIZADO EN OTROS ARCHIVOS.
module.exports = connection;
