/* 
    SE DEFINEN LAS FUNCIONES QUE SE EJECUTARAN AL HACER UNA PETICION.
*/

// SE IMPORTA LA CONEXION A LA BASE DE DATOS DE MySQL DESDE EL ARCHIVO db.js
const mysql = require('../database/db')

class SensorTemp {
    // METODO LOGTEMPERATURE
    // TOMA DOS PARAMETROS: req Y res, QUE SON LOS OBJETOS DE PETICION Y RESPUESTA.
    async logTemperature(req, res){
        // SE REALIZA EL REGISTRO DE LA TEMPERATURA EN LA CONSOLA.
        console.log(req.params.temperature)
        // SE REALIZA EL REGISTRO DEL deviceIdSensor EN LA CONSOLA.
        console.log(req.params.deviceIdSensor)
        // SE REALIZA EL REGISTRO DEL deviceIdActuator EN LA CONSOLA.
        console.log(req.params.deviceIdActuator)
        // SE REALIZA EL REGISTRO DEL statusFan EN LA CONSOLA.
        console.log(req.params.statusFan)
        // SE VERIFICA QUE LOS PARAMETROS NO SEAN NULOS.
        if(req.params.deviceIdSensor != null && req.params.temperature != null) {
            // SE DECLARAN LAS VARIABLES QUE SE UTILIZARAN PARA GUARDAR LOS PARAMETROS.
            let deviceIdSensor = req.params.deviceIdSensor;
            let temperature = req.params.temperature;
            let deviceIdActuator = req.params.deviceIdActuator;
            let statusFan = req.params.statusFan;
            // SE DECLARA LA CONSULTA SQL QUE SE EJECUTARA.
            var sql = `INSERT INTO log_temperature (log_date, device_id, temperature) VALUES (now(), ${deviceIdSensor}, ${temperature});`
            var sql2 = `INSERT INTO log_fan (log_date, device_id, logTemperature_id, statusFan) VALUES (now(), ${deviceIdActuator}, last_insert_id(), ${statusFan});`
            mysql.query(sql,(error,data,fields) => {
                if(error) {
                    // SI HAY UN ERROR, SE MUESTRA EN CONSOLA Y SE ENVIA UN MENSAJE DE ERROR.
                    res.status(500)
                    res.send(error.message)
                } else {
                    // SI NO HAY ERROR, SE MUESTRA EN CONSOLA Y SE ENVIA UN MENSAJE DE EXITO.
                    console.log(data)
                    mysql.query(sql2,(error,data,fields) => {
                        if(error) {
                            // SI HAY UN ERROR, SE MUESTRA EN CONSOLA Y SE ENVIA UN MENSAJE DE ERROR.
                            res.status(500)
                            res.send(error.message)
                        } else {
                            // SI NO HAY ERROR, SE MUESTRA EN CONSOLA Y SE ENVIA UN MENSAJE DE EXITO.
                            console.log(data)
                            res.json({
                                status: 200,
                                message: "Log uploaded successfully.",
                                affectedRows: data.affectedRows
                            })
                        }
                    })
                }
            })
        } else {
            // SI EL PARAMETRO ES NULO, SE ENVIA UN MENSAJE DE ERROR.
            res.send('Por favor llena todos los datos.')
        }
    }
    
    // METODO GETLOGS
    // TOMA DOS PARAMETROS: req Y res, QUE SON LA PETICION Y LA RESPUESTA.
    async getLogsTemperature(req,res){
        // SE REALIZA EL REGISTRO DE UN MENSAJE EN LA CONSOLA.
        console.log("Get Logs")
        // SE REALIZA EL REGISTRO DEL deviceIdSensor EN LA CONSOLA.
        console.log(req.params.deviceIdSensor)
        // SE VERIFICA QUE EL PARAMETRO NO SEA NULO.
        if(req.params.deviceIdSensor!=null){
            // SE DECLARA LA VARIABLE QUE SE UTILIZARA PARA GUARDAR EL PARAMETRO.
            let deviceIdSensor = req.params.deviceIdSensor;
            // SE DECLARA LA CONSULTA SQL QUE SE EJECUTARA.
            var sql = `SELECT * FROM log_temperature WHERE device_id='${deviceIdSensor}'`
            mysql.query(sql, (error, data, fields) => {
                if(error) {
                    // SI HAY UN ERROR, SE MUESTRA EN CONSOLA Y SE ENVIA UN MENSAJE DE ERROR.
                    res.status(500)
                    res.send(error.message)
                } else {
                    // SI NO HAY ERROR, SE REALIZA EL REGISTRO DE LOS DATOS EN LA CONSOLA Y SE ENVIAN LOS DATOS A UN OBJETO JSON.
                    console.log(data)
                    res.json({
                        data
                    })
                }
            })
        }
    }
}

/* 
    SE CREA UNA INSTANCIA DE LA CLASE SensorTemp Y SE ASIGNA A tempController.
    * SE UTILIZA PARA INSTANCIAR UN OBJETO NUEVO DE UNA CLASE.
*/
const tempController = new SensorTemp()

// SE EXPORTA EL OBJETO tempController PARA QUE PUEDA SER UTILIZADO EN OTROS ARCHIVOS.
module.exports = tempController;