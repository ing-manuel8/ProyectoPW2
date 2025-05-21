const Department = require('../models/Department');
const Specialty = require('../models/Specialty');
const User = require('../models/User');

// Función para procesar el mensaje del usuario y determinar la intención
const processUserMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Patrones para identificar la intención del usuario
    if (lowerMessage.includes('departamento') || lowerMessage.includes('departamentos')) {
        return 'departments';
    }
    if (lowerMessage.includes('especialidad') || lowerMessage.includes('especialidades')) {
        return 'specialties';
    }
    if (lowerMessage.includes('doctor') || lowerMessage.includes('doctores') || lowerMessage.includes('médico') || lowerMessage.includes('médicos')) {
        return 'doctors';
    }
    
    return 'unknown';
};

// Función para generar una respuesta amigable
const generateResponse = (data, type) => {
    switch (type) {
        case 'departments':
            if (data.length === 0) return 'No hay departamentos registrados en el sistema.';
            return `Tenemos los siguientes departamentos:\n${data.map(dept => 
                `- ${dept.nombre}: ${dept.descripcion}`
            ).join('\n')}`;
        
        case 'specialties':
            if (data.length === 0) return 'No hay especialidades registradas en el sistema.';
            return `Las especialidades disponibles son:\n${data.map(spec => 
                `- ${spec.nombre}: ${spec.descripcion} (Departamento: ${spec.departamento})`
            ).join('\n')}`;
        
        case 'doctors':
            if (data.length === 0) return 'No hay doctores registrados en el sistema.';
            return `Nuestros doctores son:\n${data.map(doc => 
                `- Dr(a). ${doc.nombre} ${doc.apellido}: ${doc.especialidad}`
            ).join('\n')}`;
        
        default:
            return 'Lo siento, no entiendo tu pregunta. Puedo ayudarte con información sobre departamentos, especialidades y doctores.';
    }
};

// Controlador principal del chatbot
exports.processMessage = async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'El mensaje es requerido'
            });
        }

        const intent = processUserMessage(message);
        let data = [];
        let response = '';

        switch (intent) {
            case 'departments':
                data = await Department.find();
                response = generateResponse(data, 'departments');
                break;

            case 'specialties':
                data = await Specialty.find();
                response = generateResponse(data, 'specialties');
                break;

            case 'doctors':
                data = await User.find({ role: 'doctor' }).select('nombre apellido especialidad');
                response = generateResponse(data, 'doctors');
                break;

            default:
                response = generateResponse([], 'unknown');
        }

        return res.status(200).json({
            success: true,
            data: {
                response,
                intent,
                data
            }
        });

    } catch (error) {
        console.error('Error en el chatbot:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al procesar el mensaje',
            error: error.message
        });
    }
};

// Obtener sugerencias de preguntas frecuentes
exports.getSuggestions = async (req, res) => {
    try {
        const suggestions = [
            {
                question: "¿Qué departamentos tienen disponibles?",
                intent: "departments"
            },
            {
                question: "¿Cuáles son las especialidades médicas?",
                intent: "specialties"
            },
            {
                question: "¿Quiénes son los doctores disponibles?",
                intent: "doctors"
            }
        ];

        return res.status(200).json({
            success: true,
            data: suggestions
        });

    } catch (error) {
        console.error('Error al obtener sugerencias:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener sugerencias',
            error: error.message
        });
    }
}; 