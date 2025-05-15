const express = require('express');
const router = express.Router();
const {
    getAllAppointments,
    getAppointmentById,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    createAppointment,
    updateAppointment,
    deleteAppointment
} = require('../controllers/citasController');

// Rutas principales
router.route('/')
    .get(getAllAppointments)
    .post(createAppointment);

// Rutas por ID
router.route('/:id')
    .get(getAppointmentById)
    .put(updateAppointment)
    .delete(deleteAppointment);

// Rutas específicas
router.get('/doctor/:doctorId', getAppointmentsByDoctor);
router.get('/patient/:patientId', getAppointmentsByPatient);

module.exports = router;