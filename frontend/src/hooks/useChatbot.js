import { useState, useRef, useEffect } from 'react';

const useChatbot = () => {
    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [mostrarMasOpciones, setMostrarMasOpciones] = useState(false);
    const messagesEndRef = useRef(null);

    const opcionesBase = {
        inicio: {
            principales: [
                {
                    icon: 'calendar',
                    text: '¿Cómo agendo una cita?',
                    keyword: 'cita'
                },
                {
                    icon: 'doctor',
                    text: '¿Qué doctores hay disponibles?',
                    keyword: 'doctor'
                },
                {
                    icon: 'hospital',
                    text: '¿Qué departamentos tienen?',
                    keyword: 'departamento'
                },
                {
                    icon: 'clock',
                    text: '¿Cuál es el horario de atención?',
                    keyword: 'horario'
                },
                {
                    icon: 'money',
                    text: '¿Cuánto cuesta la consulta?',
                    keyword: 'precio'
                },
                {
                    icon: 'emergency',
                    text: '¿Qué hago en caso de emergencia?',
                    keyword: 'emergencia'
                }
            ],
            adicionales: [
                {
                    icon: 'calendar',
                    text: '¿Cómo funciona el sistema de citas?',
                    keyword: 'sistema_citas'
                },
                {
                    icon: 'doctor',
                    text: '¿Cómo elijo al mejor doctor?',
                    keyword: 'elegir_doctor'
                },
                {
                    icon: 'hospital',
                    text: '¿Qué servicios adicionales ofrecen?',
                    keyword: 'servicios_adicionales'
                }
            ]
        },
        citas: {
            principales: [
                {
                    icon: 'calendar',
                    text: '¿Cómo cancelo una cita?',
                    keyword: 'cancelar'
                },
                {
                    icon: 'clock',
                    text: '¿Puedo reagendar mi cita?',
                    keyword: 'reagendar'
                },
                {
                    icon: 'doctor',
                    text: '¿Qué documentos necesito?',
                    keyword: 'documentos'
                },
                {
                    icon: 'money',
                    text: '¿Cuánto tiempo dura la consulta?',
                    keyword: 'duracion'
                }
            ],
            adicionales: [
                {
                    icon: 'calendar',
                    text: '¿Puedo agendar para otra persona?',
                    keyword: 'agendar_otra_persona'
                },
                {
                    icon: 'clock',
                    text: '¿Qué pasa si llego tarde?',
                    keyword: 'llegar_tarde'
                },
                {
                    icon: 'doctor',
                    text: '¿Puedo cambiar de doctor?',
                    keyword: 'cambiar_doctor'
                }
            ]
        },
        doctores: {
            principales: [
                {
                    icon: 'doctor',
                    text: '¿Qué especialidades tienen?',
                    keyword: 'especialidades'
                },
                {
                    icon: 'calendar',
                    text: '¿Cuál es su horario de atención?',
                    keyword: 'horario_doctor'
                },
                {
                    icon: 'hospital',
                    text: '¿Dónde atienden?',
                    keyword: 'ubicacion'
                }
            ],
            adicionales: [
                {
                    icon: 'doctor',
                    text: '¿Cómo son las consultas virtuales?',
                    keyword: 'consultas_virtuales'
                },
                {
                    icon: 'calendar',
                    text: '¿Puedo ver su disponibilidad?',
                    keyword: 'disponibilidad'
                },
                {
                    icon: 'hospital',
                    text: '¿Qué equipos médicos utilizan?',
                    keyword: 'equipos_medicos'
                }
            ]
        },
        emergencias: {
            principales: [
                {
                    icon: 'emergency',
                    text: '¿Qué debo hacer primero?',
                    keyword: 'primeros_auxilios'
                },
                {
                    icon: 'hospital',
                    text: '¿Dónde está la sala de emergencias?',
                    keyword: 'ubicacion_emergencia'
                },
                {
                    icon: 'clock',
                    text: '¿Cuánto tiempo debo esperar?',
                    keyword: 'tiempo_espera'
                }
            ],
            adicionales: [
                {
                    icon: 'emergency',
                    text: '¿Qué servicios de emergencia ofrecen?',
                    keyword: 'servicios_emergencia'
                },
                {
                    icon: 'hospital',
                    text: '¿Tienen ambulancia?',
                    keyword: 'ambulancia'
                },
                {
                    icon: 'clock',
                    text: '¿Qué tan rápido responden?',
                    keyword: 'tiempo_respuesta'
                }
            ]
        }
    };

    const respuestasPredeterminadas = {
        'hola': '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy? Puedes seleccionar una de las opciones rápidas o escribir tu pregunta.',
        'cita': 'Para agendar una cita, sigue estos pasos:\n1. Ve a la sección "Citas Médicas"\n2. Haz clic en "Nueva Cita"\n3. Selecciona el doctor y la fecha\n4. Completa los detalles de la consulta\n5. Confirma tu cita',
        'cancelar': 'Para cancelar una cita:\n1. Ve a "Mis Citas"\n2. Selecciona la cita que deseas cancelar\n3. Haz clic en "Cancelar Cita"\n4. Confirma la cancelación\n\nRecuerda que debes cancelar con al menos 24 horas de anticipación.',
        'reagendar': 'Para reagendar una cita:\n1. Ve a "Mis Citas"\n2. Selecciona la cita que deseas reagendar\n3. Haz clic en "Reagendar"\n4. Elige la nueva fecha y hora\n5. Confirma el cambio',
        'documentos': 'Documentos necesarios para tu cita:\n• Identificación oficial\n• Seguro médico (si aplica)\n• Estudios previos (si los tienes)\n• Recetas médicas actuales',
        'duracion': 'La duración de las consultas varía según el tipo:\n• Primera vez: 30-45 minutos\n• Control: 15-20 minutos\n• Especialista: 30-60 minutos',
        'horario': 'Nuestro horario de atención es:\n• Lunes a Viernes: 8:00 AM - 6:00 PM\n• Sábados: 9:00 AM - 1:00 PM\n• Domingos: Cerrado (excepto emergencias)',
        'doctor': 'Contamos con especialistas en:\n• Medicina General\n• Pediatría\n• Ginecología\n• Cardiología\n• Dermatología\n• Oftalmología\n• Ortopedia\n• Neurología\n\nPuedes ver sus perfiles en la sección "Doctores".',
        'especialidades': 'Nuestras especialidades incluyen:\n• Medicina General\n• Pediatría\n• Ginecología\n• Cardiología\n• Dermatología\n• Oftalmología\n• Ortopedia\n• Neurología\n• Gastroenterología\n• Endocrinología',
        'horario_doctor': 'Los doctores atienden en los siguientes horarios:\n• Lunes a Viernes: 8:00 AM - 6:00 PM\n• Sábados: 9:00 AM - 1:00 PM\n\nCada doctor tiene su propio horario específico que puedes consultar en su perfil.',
        'ubicacion': 'Nuestros doctores atienden en:\n• Edificio Principal: Piso 1-3\n• Edificio de Especialidades: Piso 4-6\n• Centro de Diagnóstico: Piso 7\n\nCada doctor tiene su consultorio asignado que se indica en tu cita.',
        'departamento': 'Nuestros departamentos incluyen:\n• Medicina General\n• Pediatría\n• Ginecología\n• Cardiología\n• Dermatología\n• Oftalmología\n• Ortopedia\n• Neurología\n\nCada departamento cuenta con especialistas altamente calificados.',
        'precio': 'Los precios varían según el tipo de consulta:\n• Primera vez: $500\n• Control: $300\n• Urgencia: $800\n• Especialista: $600\n\n*Los precios pueden variar según el departamento.',
        'emergencia': 'En caso de emergencia:\n1. Dirígete a la sala de emergencias\n2. Llama al 911\n3. Nuestro personal te atenderá inmediatamente\n\nLa sala de emergencias está abierta 24/7.',
        'primeros_auxilios': 'En caso de emergencia, sigue estos pasos:\n1. Mantén la calma\n2. Llama al 911\n3. Dirígete a la sala de emergencias\n4. Informa al personal de recepción\n5. Proporciona los datos del paciente',
        'ubicacion_emergencia': 'La sala de emergencias se encuentra en:\n• Edificio Principal: Planta Baja\n• Entrada por la calle principal\n• Acceso directo para ambulancias\n\nEstá abierta las 24 horas, los 7 días de la semana.',
        'tiempo_espera': 'Los tiempos de espera varían según la urgencia:\n• Urgencia crítica: Atención inmediata\n• Urgencia moderada: 15-30 minutos\n• Urgencia leve: 30-60 minutos\n\nEl personal médico evaluará tu caso al llegar.',
        'sistema_citas': 'Nuestro sistema de citas funciona así:\n1. Registro en línea o por teléfono\n2. Selección de especialidad y doctor\n3. Elección de fecha y hora\n4. Confirmación por correo\n5. Recordatorio 24h antes\n\nPuedes gestionar tus citas desde tu cuenta.',
        'elegir_doctor': 'Para elegir al mejor doctor:\n• Revisa su especialidad\n• Consulta sus años de experiencia\n• Lee las opiniones de pacientes\n• Verifica su disponibilidad\n• Considera la ubicación de su consultorio',
        'servicios_adicionales': 'Ofrecemos servicios adicionales como:\n• Laboratorio clínico\n• Rayos X\n• Ultrasonidos\n• Fisioterapia\n• Nutrición\n• Psicología\n• Farmacia interna',
        'agendar_otra_persona': 'Para agendar una cita para otra persona:\n1. Necesitas sus datos personales\n2. Su número de seguro (si aplica)\n3. Su historial médico básico\n4. Autorización por escrito\n\nPuedes hacerlo desde tu cuenta o en recepción.',
        'llegar_tarde': 'Si llegas tarde a tu cita:\n• Avisa lo antes posible\n• Podemos reagendarte si hay disponibilidad\n• Es posible que debas esperar\n• Podría aplicarse un cargo por cancelación tardía',
        'cambiar_doctor': 'Para cambiar de doctor:\n1. Ve a "Mis Citas"\n2. Selecciona la cita\n3. Haz clic en "Cambiar Doctor"\n4. Elige el nuevo doctor\n5. Confirma el cambio\n\nSujeto a disponibilidad.',
        'consultas_virtuales': 'Las consultas virtuales:\n• Se realizan por videollamada\n• Necesitas una conexión estable\n• Debes tener cámara y micrófono\n• Se agenda como una cita normal\n• Tienen el mismo costo que presencial',
        'disponibilidad': 'Puedes ver la disponibilidad de los doctores:\n• En la sección "Doctores"\n• En el calendario de citas\n• Por teléfono en recepción\n• A través de nuestra app\n\nSe actualiza en tiempo real.',
        'equipos_medicos': 'Contamos con equipos de última generación:\n• Resonancia magnética\n• Tomografía computarizada\n• Ecógrafos 4D\n• Equipos de rayos X digital\n• Monitores de signos vitales\n• Equipos de laboratorio',
        'servicios_emergencia': 'Servicios de emergencia disponibles:\n• Atención inmediata\n• Ambulancia 24/7\n• Unidad de cuidados intensivos\n• Quirófano de emergencia\n• Banco de sangre\n• Laboratorio de emergencia',
        'ambulancia': 'Sí, contamos con servicio de ambulancia:\n• Disponible 24/7\n• Equipada con personal médico\n• Cobertura en toda la ciudad\n• Coordinación con emergencias\n• Seguimiento GPS',
        'tiempo_respuesta': 'Nuestros tiempos de respuesta:\n• Llamada de emergencia: 1-2 minutos\n• Llegada de ambulancia: 10-15 minutos\n• Atención inicial: inmediata\n• Evaluación completa: 5-10 minutos\n\nVaría según la urgencia.',
        'default': 'Lo siento, no entiendo tu pregunta. Por favor, selecciona una de las opciones rápidas o reformula tu pregunta. También puedes contactar a recepción para más información.'
    };

    const [opcionesRapidas, setOpcionesRapidas] = useState(opcionesBase.inicio.principales);
    const [opcionesAdicionales, setOpcionesAdicionales] = useState(opcionesBase.inicio.adicionales);

    const handleClose = () => {
        setShow(false);
        setMostrarMasOpciones(false);
    };
    
    const handleShow = () => setShow(true);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const actualizarOpcionesRapidas = (mensaje) => {
        const mensajeLower = mensaje.toLowerCase();
        let categoria = 'inicio';
        
        if (mensajeLower.includes('cita')) {
            categoria = 'citas';
        } else if (mensajeLower.includes('doctor')) {
            categoria = 'doctores';
        } else if (mensajeLower.includes('emergencia')) {
            categoria = 'emergencias';
        }

        setOpcionesRapidas(opcionesBase[categoria].principales);
        setOpcionesAdicionales(opcionesBase[categoria].adicionales);
        setMostrarMasOpciones(false);
    };

    const toggleMasOpciones = () => {
        setMostrarMasOpciones(!mostrarMasOpciones);
    };

    const getRespuesta = (mensaje) => {
        const mensajeLower = mensaje.toLowerCase();
        for (const [key, value] of Object.entries(respuestasPredeterminadas)) {
            if (mensajeLower.includes(key)) {
                return value;
            }
        }
        return respuestasPredeterminadas.default;
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;

        const newMessage = {
            text: inputMessage,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString()
        };

        const botResponse = {
            text: getRespuesta(inputMessage),
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages([...messages, newMessage, botResponse]);
        actualizarOpcionesRapidas(inputMessage);
        setInputMessage('');
    };

    const handleQuickOption = (option) => {
        const newMessage = {
            text: option.text,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString()
        };

        const botResponse = {
            text: getRespuesta(option.keyword),
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages([...messages, newMessage, botResponse]);
        actualizarOpcionesRapidas(option.keyword);
    };

    return {
        show,
        messages,
        inputMessage,
        messagesEndRef,
        opcionesRapidas,
        opcionesAdicionales,
        mostrarMasOpciones,
        handleClose,
        handleShow,
        handleSendMessage,
        handleQuickOption,
        setInputMessage,
        toggleMasOpciones
    };
};

export default useChatbot; 