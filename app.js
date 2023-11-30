/* 
  app.js ES UN ARCHIVO QUE CONFIGURA UN SERVIDOR DE Express.js (FRAMEWORK PARA Node.js).
  * ESTE ARCHIVO SE EJECTUA AL INICIAR LA APLICACIÓN.
*/

/* 
  SE IMPORTAN LAS LIBRERIAS QUE SE UTILIZARAN EN LA APLICACION.
  * MIDDLEWARES: FUNCIONES Y SERVICIOS DE NUBE.
*/

// EXPRESS PARA LA LIBRERIA DE Express.js.
const express = require('express')
// BODY-PARSER ES UN MIDDLEWARE PARA INTERPRETAR LOS DATOS DE LAS PETICIONES.
const bodyParser = require('body-parser')
// CORS ES UN MIDDLEWARE PARA PERMITIR PETICIONES DESDE OTROS SERVIDORES.
const cors = require('cors')
// FS ES UNA LIBRERIA PARA INTERACTUAR CON EL SISTEMA DE ARCHIVOS.
const fs = require('fs')
// PATH ES UNA LIBRERIA PARA INTERACTUAR CON RUTAS DE ARCHIVOS.
const path = require('path')
// MORGAN ES UN MIDDLEWARE PARA MOSTRAR LOS LOGS DE LAS PETICIONES.
const morgan = require('morgan')
// ROUTER ES UN MODULO QUE CONTIENE LAS RUTAS DE LA APLICACIÓN.
const router = require('./routes/route')
// SE CREA UNA INSTANCIA DE UNA APLICACIÓN DE EXPRESS.
const app = express()

// SE UTILIZA CORS PARA PERMITIR PETICIONES DESDE OTROS SERVIDORES.
app.use(cors())

/*
  MIDDLEWARE DE BODYPARSER PARA INTERPRETAR LOS DATOS DE LAS PETICIONES.
  * PRIMERA LINEA: INTERPRETA URL ENCODED.
  * SEGUNDA LINEA: INTERPRETA JSON.
*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// SE UTILIZA MORGAN PARA MOSTRAR LOS LOGS DE LAS PETICIONES.
app.use(morgan('dev'))

// SE CREA UNA CARPETA PARA GUARDAR LOS LOGS DE LAS PETICIONES.
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })
 
// setup the logger
// SE UTILIZA MORGAN PARA MOSTRAR LOS LOGS DE LAS PETICIONES EN UN ARCHIVO.
app.use(morgan('combined', { stream: accessLogStream }))
// SE UTILIZA EL ROUTER PARA DEFINIR LAS RUTAS DE LA APLICACION.
app.use(router)

// SE DEFINE LA RUTA PRINCIPAL DE LA APLICACION.
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// SE DEFINE EL PUERTO EN EL QUE SE EJECUTARA LA APLICACIÓN.
const port = 3100

// app.listen(process.env.PORT || port , (err) => {
// INICIA EL SERVIDOR DE EXPRESS EN UN PUERTO ESPECIFICO Y MUESTRA UN MENSAJE EN CONSOLA.
app.listen(port, () => {
  console.log('Server started running on : ' + port)
})