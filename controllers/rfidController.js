/* 
    SE DEFINEN LAS FUNCIONES QUE SE EJECUTARAN AL HACER UNA PETICION.
*/

// SE IMPORTA LA CONEXION A LA BASE DE DATOS DE MySQL DESDE EL ARCHIVO db.js
const mysql = require('../database/db')

class SensorRfid {
    // METODO LOGRFID
    // TOMA DOS PARAMETROS: req Y res, QUE SON LOS OBJETOS DE PETICION Y RESPUESTA.
    async logRFID(req , res){
        // SE REALIZA EL REGISTRO DEL STATUS EN LA CONSOLA.
        console.log(req.params.statusCard)
        // SE REALIZA EL REGISTRO DEL deviceIdSensor EN LA CONSOLA.
        console.log(req.params.deviceIdSensor)
        // SE REALIZA EL REGISTRO DEL deviceIdActuator EN LA CONSOLA.
        console.log(req.params.deviceIdActuator)
        // SE REALIZA EL REGISTRO DEL statusFan EN LA CONSOLA.
        console.log(req.params.statusServo)
        // SE VERIFICA QUE LOS PARAMETROS NO SEAN NULOS.
        if(req.params.deviceIdSensor != null && req.params.statusCard != null) {
            // SE DECLARAN LAS VARIABLES QUE SE UTILIZARAN PARA GUARDAR LOS PARAMETROS.
            let deviceIdSensor = req.params.deviceIdSensor;
            let statusCard = req.params.statusCard;
            let deviceIdActuator = req.params.deviceIdActuator;
            let statusServo = req.params.statusServo;
            // SE DECLARA LA CONSULTA SQL QUE SE EJECUTARA.
            var sql = `INSERT INTO log_rfid (log_date, device_id, statusCard) VALUES (now(), ${deviceIdSensor}, ${statusCard});`
            var sql2 = `INSERT INTO log_servo (log_date, device_id, logRFID_id, statusServo) VALUES (now(), ${deviceIdActuator}, last_insert_id(), ${statusServo});`
            mysql.query(sql, (error,data,fields) => {
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
    async getLogsRFID(req,res){
        // SE REALIZA EL REGISTRO DE UN MENSAJE EN LA CONSOLA.
        console.log("Get Logs")
        // SE REALIZA EL REGISTRO DEL deviceIdSensor EN LA CONSOLA.
        console.log(req.params.deviceIdSensor)
        // SE VERIFICA QUE EL PARAMETRO NO SEA NULO.
        if(req.params.deviceIdSensor!=null){
            // SE DECLARA LA VARIABLE QUE SE UTILIZARA PARA GUARDAR EL PARAMETRO.
            let deviceIdSensor = req.params.deviceIdSensor;
            // SE DECLARA LA CONSULTA SQL QUE SE EJECUTARA.
            var sql = `SELECT * FROM log_rfid WHERE device_id='${deviceIdSensor}'`
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
    SE CREA UNA INSTANCIA DE LA CLASE SensorRfid Y SE ASIGNA A rfidController.
    * SE UTILIZA PARA INSTANCIAR UN OBJETO NUEVO DE UNA CLASE.
*/
const rfidController = new SensorRfid()

// SE EXPORTA EL OBJETO rfidController PARA QUE PUEDA SER UTILIZADO EN OTROS ARCHIVOS.
module.exports = rfidController;