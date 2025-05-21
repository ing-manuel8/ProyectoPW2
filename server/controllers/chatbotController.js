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
    if (lowerMessage.includes('cita') || lowerMessage.includes('agendar') || lowerMessage.includes('reservar')) {
        return 'appointments';
    }
    if (lowerMessage.includes('horario') || lowerMessage.includes('hora') || lowerMessage.includes('atención')) {
        return 'hours';
    }
    if (lowerMessage.includes('emergencia') || lowerMessage.includes('urgencia') || lowerMessage.includes('urgente')) {
        return 'emergency';
    }
    
    return 'unknown';
};

// Función para generar recomendaciones contextuales
const generateContextualSuggestions = (intent, data) => {
    const suggestions = [];
    
    switch (intent) {
        case 'departments':
            if (data.length > 0) {
                const randomDept = data[Math.floor(Math.random() * data.length)];
                suggestions.push({
                    question: `👨‍⚕️ ¿Qué especialidades hay en el departamento de ${randomDept.nombre}?`,
                    intent: 'specialties'
                });
                suggestions.push({
                    question: `👤 ¿Quiénes son los doctores del departamento de ${randomDept.nombre}?`,
                    intent: 'doctors'
                });
            }
            break;

        case 'specialties':
            if (data.length > 0) {
                const randomSpec = data[Math.floor(Math.random() * data.length)];
                suggestions.push({
                    question: `👤 ¿Quiénes son los doctores especialistas en ${randomSpec.nombre}?`,
                    intent: 'doctors'
                });
                suggestions.push({
                    question: `📅 ¿Cómo puedo agendar una cita con un especialista en ${randomSpec.nombre}?`,
                    intent: 'appointments'
                });
            }
            break;

        case 'doctors':
            if (data.length > 0) {
                const randomDoc = data[Math.floor(Math.random() * data.length)];
                suggestions.push({
                    question: `📅 ¿Cómo puedo agendar una cita con Dr(a). ${randomDoc.username}?`,
                    intent: 'appointments'
                });
                suggestions.push({
                    question: `⏰ ¿Cuál es el horario de atención de Dr(a). ${randomDoc.username}?`,
                    intent: 'hours'
                });
            }
            break;

        case 'appointments':
            suggestions.push({
                question: "⏰ ¿Cuáles son los horarios de atención?",
                intent: 'hours'
            });
            suggestions.push({
                question: "🏥 ¿Qué departamentos tienen disponibles?",
                intent: 'departments'
            });
            break;

        case 'hours':
            suggestions.push({
                question: "📅 ¿Cómo puedo agendar una cita?",
                intent: 'appointments'
            });
            suggestions.push({
                question: "👨‍⚕️ ¿Cuáles son las especialidades médicas?",
                intent: 'specialties'
            });
            break;

        case 'emergency':
            suggestions.push({
                question: "🏥 ¿Qué departamentos tienen disponibles?",
                intent: 'departments'
            });
            suggestions.push({
                question: "👤 ¿Quiénes son los doctores disponibles?",
                intent: 'doctors'
            });
            break;

        default:
            suggestions.push(
                {
                    question: "🏥 ¿Qué departamentos tienen disponibles?",
                    intent: 'departments'
                },
                {
                    question: "👨‍⚕️ ¿Cuáles son las especialidades médicas?",
                    intent: 'specialties'
                },
                {
                    question: "👤 ¿Quiénes son los doctores disponibles?",
                    intent: 'doctors'
                }
            );
    }

    return suggestions;
};

// Función para generar una respuesta amigable
const generateResponse = (data, type) => {
    switch (type) {
        case 'departments':
            if (data.length === 0) return '🏥 No hay departamentos registrados en el sistema.';
            return `🏥 Tenemos los siguientes departamentos:\n\n${data.map(dept => 
                `📋 ${dept.nombre}\n   ${dept.descripcion}`
            ).join('\n\n')}`;
        
        case 'specialties':
            if (data.length === 0) return '👨‍⚕️ No hay especialidades registradas en el sistema.';
            return `👨‍⚕️ Las especialidades disponibles son:\n\n${data.map(spec => 
                `📚 ${spec.nombre}\n   ${spec.descripcion}\n   Departamento: ${spec.departamento}`
            ).join('\n\n')}`;
        
        case 'doctors':
            if (data.length === 0) return '👨‍⚕️ No hay doctores registrados en el sistema.';
            return `👨‍⚕️ Nuestros doctores son:\n\n${data.map(doc => 
                `👤 Dr(a). ${doc.username}\n   Especialidad: ${doc.specialty || 'No especificada'}`
            ).join('\n\n')}`;

        case 'appointments':
            return `📅 Para agendar una cita puedes:\n\n` +
                   `1️⃣ Iniciar sesión en tu cuenta\n` +
                   `2️⃣ Seleccionar "Agendar Cita"\n` +
                   `3️⃣ Elegir el departamento y especialidad\n` +
                   `4️⃣ Seleccionar el doctor y fecha disponible\n` +
                   `5️⃣ Confirmar tu cita\n\n` +
                   `¿Necesitas ayuda con alguno de estos pasos?`;

        case 'hours':
            return `⏰ Nuestros horarios de atención son:\n\n` +
                   `🏥 Lunes a Viernes: 8:00 AM - 8:00 PM\n` +
                   `🏥 Sábados: 9:00 AM - 2:00 PM\n` +
                   `🏥 Domingos: Solo emergencias\n\n` +
                   `Los horarios específicos de cada doctor pueden variar. ¿Te gustaría consultar el horario de algún doctor en particular?`;

        case 'emergency':
            return `🚑 En caso de emergencia:\n\n` +
                   `1️⃣ Acude inmediatamente a nuestro servicio de urgencias\n` +
                   `2️⃣ Llama al 911 si es una emergencia grave\n` +
                   `3️⃣ Nuestro personal médico te atenderá de inmediato\n\n` +
                   `¿Necesitas ayuda adicional o información sobre algún departamento específico?`;
        
        default:
            return '🤖 Lo siento, no entiendo tu pregunta. Puedo ayudarte con información sobre departamentos, especialidades, doctores, citas, horarios y emergencias.';
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
                data = await User.find({ role: 'Doctor' }).select('username specialty');
                response = generateResponse(data, 'doctors');
                break;

            case 'appointments':
                response = generateResponse([], 'appointments');
                break;

            case 'hours':
                response = generateResponse([], 'hours');
                break;

            case 'emergency':
                response = generateResponse([], 'emergency');
                break;

            default:
                response = generateResponse([], 'unknown');
        }

        // Generar sugerencias contextuales basadas en la intención y los datos
        const suggestions = generateContextualSuggestions(intent, data);

        return res.status(200).json({
            success: true,
            data: {
                response,
                intent,
                data,
                suggestions
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

// Obtener sugerencias iniciales
exports.getSuggestions = async (req, res) => {
    try {
        const suggestions = [
            {
                question: "🏥 ¿Qué departamentos tienen disponibles?",
                intent: "departments"
            },
            {
                question: "👨‍⚕️ ¿Cuáles son las especialidades médicas?",
                intent: "specialties"
            },
            {
                question: "👤 ¿Quiénes son los doctores disponibles?",
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