const express = require('express');
const router = express.Router();
const {
    getAllSpecialties,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty,
    getSpecialtiesByDepartment
} = require('../controllers/specialtyController');
// Rutas de especialidades
router.get('/', getAllSpecialties);
router.post('/',  createSpecialty);
router.put('/:id', updateSpecialty);
router.delete('/:id', deleteSpecialty);
router.get('/department/:department', getSpecialtiesByDepartment);

module.exports = router; 