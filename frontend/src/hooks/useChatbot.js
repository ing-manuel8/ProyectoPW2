import { useState, useRef, useEffect } from 'react';

const useChatbot = () => {
    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [mostrarMasOpciones, setMostrarMasOpciones] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const opcionesRapidas = [
        {
            text: "¿Qué departamentos tienen disponibles?",
            intent: "departments"
        },
        {
            text: "¿Cuáles son las especialidades médicas?",
            intent: "specialties"
        },
        {
            text: "¿Quiénes son los doctores disponibles?",
            intent: "doctors"
        }
    ];

    const opcionesAdicionales = [
        {
            text: "¿Cómo agendo una cita?",
            intent: "appointment"
        },
        {
            text: "¿Cuál es el horario de atención?",
            intent: "schedule"
        },
        {
            text: "¿Qué hago en caso de emergencia?",
            intent: "emergency"
        }
    ];

    const handleClose = () => {
        setShow(false);
        setMostrarMasOpciones(false);
    };
    
    const handleShow = () => {
        setShow(true);
        if (messages.length === 0) {
            setMessages([{
                id: 1,
                text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
                sender: 'bot'
            }]);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (message) => {
        if (!message.trim() || isLoading) return;

        setIsLoading(true);

        // Agregar mensaje del usuario
        const userMessage = {
            id: messages.length + 1,
            text: message,
            sender: 'user'
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/chatbot/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();
            
            if (data.success) {
                // Agregar respuesta del bot
                const botMessage = {
                    id: messages.length + 2,
                    text: data.data.response,
                    sender: 'bot'
                };
                setMessages(prev => [...prev, botMessage]);
            } else {
                throw new Error(data.message || 'Error al procesar el mensaje');
            }
        } catch (error) {
            console.error('Error:', error);
            // Agregar mensaje de error
            const errorMessage = {
                id: messages.length + 2,
                text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
                sender: 'bot'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickOption = (option) => {
        handleSendMessage(option.text);
    };

    const toggleMasOpciones = () => {
        setMostrarMasOpciones(!mostrarMasOpciones);
    };

    return {
        show,
        messages,
        inputMessage,
        messagesEndRef,
        opcionesRapidas,
        opcionesAdicionales,
        mostrarMasOpciones,
        isLoading,
        handleClose,
        handleShow,
        handleSendMessage,
        handleQuickOption,
        setInputMessage,
        toggleMasOpciones
    };
};

export default useChatbot; 