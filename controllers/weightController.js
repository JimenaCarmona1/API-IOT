/* 
    SE DEFINEN LAS FUNCIONES QUE SE EJECUTARAN AL HACER UNA PETICION.
*/

// SE IMPORTA LA CONEXION A LA BASE DE DATOS DE MySQL DESDE EL ARCHIVO db.js
const mysql = require('../database/db')

class SensorWeight {
    // METODO LOGWEIGHT
    // TOMA DOS PARAMETROS: req Y res, QUE SON LOS OBJETOS DE PETICION Y RESPUESTA.
    async logWeight(req, res){
        // SE REALIZA EL REGISTRO DEL WEIGHT EN LA CONSOLA.
        console.log(req.params.weight)
        // SE REALIZA EL REGISTRO DEL deviceIdSensor EN LA CONSOLA.
        console.log(req.params.deviceIdSensor)
        // SE REALIZA EL REGISTRO DEL deviceIdActuator EN LA CONSOLA.
        console.log(req.params.deviceIdActuator)
        // SE REALIZA EL REGISTRO DEL message EN LA CONSOLA.
        console.log(req.params.message)
        // SE VERIFICA QUE LOS PARAMETROS NO SEAN NULOS.
        if(req.params.deviceIdSensor != null && req.params.weight != null) {
            // SE DECLARAN LAS VARIABLES QUE SE UTILIZARAN PARA GUARDAR LOS PARAMETROS.
            let deviceIdSensor = req.params.deviceIdSensor;
            let weight = req.params.weight;
            let deviceIdActuator = req.params.deviceIdActuator;
            let message = req.params.message;
            // SE DECLARA LA CONSULTA SQL QUE SE EJECUTARA.
            var sql = `INSERT INTO log_weight (log_date, device_id, weight) VALUES (now(), ${deviceIdSensor}, ${weight});`
            var sql2 = `INSERT INTO log_LCD (log_date, device_id, logWeight_id, message) VALUES (now(), ${deviceIdActuator}, last_insert_id(), ${message});`
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
    async getLogsWeight(req,res){
        // SE REALIZA EL REGISTRO DE UN MENSAJE EN LA CONSOLA.
        console.log("Get Logs")
        // SE REALIZA EL REGISTRO DEL deviceIdSensor EN LA CONSOLA.
        console.log(req.params.deviceIdSensor)
        // SE VERIFICA QUE EL PARAMETRO NO SEA NULO.
        if(req.params.deviceIdSensor!=null){
            // SE DECLARA LA VARIABLE QUE SE UTILIZARA PARA GUARDAR EL PARAMETRO.
            let deviceIdSensor = req.params.deviceIdSensor;
            // SE DECLARA LA CONSULTA SQL QUE SE EJECUTARA.
            var sql = `SELECT * FROM log_weight WHERE device_id='${deviceIdSensor}'`
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
    SE CREA UNA INSTANCIA DE LA CLASE SensorWeight Y SE ASIGNA A weightController.
    * SE UTILIZA PARA INSTANCIAR UN OBJETO NUEVO DE UNA CLASE.
*/
const weightController = new SensorWeight()

// SE EXPORTA EL OBJETO weightController PARA QUE PUEDA SER UTILIZADO EN OTROS ARCHIVOS.
module.exports = weightController;