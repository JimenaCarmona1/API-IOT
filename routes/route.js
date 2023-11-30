/*
    CONFIGURA LAS RUTAS DE LA APLICACIÓN DE Express.js.
*/

// SE IMPORTAN LAS LIBRERIAS.

// EXPRESS PARA LA LIBRERIA DE Express.js.
const express = require('express');
// MODULO  QUE CONTIENE LA LOGICA PARA MANEJAR LAS PETICIONES.
const tempController = require('../controllers/tempController.js');
const rfidController = require('../controllers/rfidController.js');
const pirController = require('../controllers/pirController.js');
const weightController = require('../controllers/weightController.js');
// CREA UN OBJETO DE ROUTER DE Express.js.
const router = express.Router();

// CONFIGURA LAS RUTAS DE LA APLICACIÓN.
// SE DEFINE LA RUTA GET.
router.get('/api/getLogsTemp/:deviceIdSensor', tempController.getLogsTemperature);
router.get('/api/getLogsRFID/:deviceIdSensor', rfidController.getLogsRFID);
router.get('/api/getLogsPir/:deviceIdSensor', pirController.getLogsPir);
router.get('/api/getLogsWeight/:deviceIdSensor', weightController.getLogsWeight);

// SE DEFINE LA RUTA POST.
router.post('/api/logTemperature/:deviceIdSensor/:deviceIdActuator/:temperature/:statusFan', tempController.logTemperature);
router.post('/api/logRFID/:deviceIdSensor/:deviceIdActuator/:statusCard/:statusServo', rfidController.logRFID);
router.post('/api/logPir/:deviceIdSensor/:deviceIdActuator/:motionDetected/:statusLED', pirController.logPir);
router.post('/api/logWeight/:deviceIdSensor/:deviceIdActuator/:weight/:message', weightController.logWeight);

// SE EXPORTA EL OBJETO DE ROUTER PARA QUE PUEDA SER UTILIZADO EN OTROS ARCHIVOS.
module.exports = router;