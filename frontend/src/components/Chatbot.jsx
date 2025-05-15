import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './Chatbot.css';

const Chatbot = () => {
    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const respuestasPredeterminadas = {
        'hola': '¡Hola! ¿En qué puedo ayudarte hoy?',
        'cita': 'Para agendar una cita, por favor dirígete a la sección de "Citas" y haz clic en "Nueva Cita".',
        'horario': 'Nuestro horario de atención es de lunes a viernes de 8:00 AM a 6:00 PM.',
        'doctor': 'Puedes ver la lista de doctores disponibles en la sección de "Doctores".',
        'departamento': 'Contamos con varios departamentos: Medicina General, Pediatría, Ginecología, Cardiología, Dermatología, Oftalmología, Ortopedia y Neurología.',
        'precio': 'Los precios varían según el tipo de consulta y el departamento. Por favor, contacta a recepción para más información.',
        'emergencia': 'En caso de emergencia, por favor dirígete a la sala de emergencias o llama al 911.',
        'default': 'Lo siento, no entiendo tu pregunta. Por favor, intenta reformularla o contacta a recepción para más información.'
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        setInputMessage('');
    };

    return (
        <>
            <Button
                variant="primary"
                className="chatbot-button"
                onClick={handleShow}
            >
                <FaRobot size={24} />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                className="chatbot-modal"
                size="sm"
            >
                <Modal.Header className="chatbot-header">
                    <Modal.Title>
                        <FaRobot className="me-2" />
                        Asistente Virtual
                    </Modal.Title>
                    <Button variant="link" onClick={handleClose} className="close-button">
                        <FaTimes />
                    </Button>
                </Modal.Header>
                <Modal.Body className="chatbot-body">
                    <div className="messages-container">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                            >
                                <div className="message-content">
                                    {message.text}
                                </div>
                                <div className="message-timestamp">
                                    {message.timestamp}
                                </div>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer className="chatbot-footer">
                    <Form onSubmit={handleSendMessage} className="w-100">
                        <div className="d-flex">
                            <Form.Control
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Escribe tu mensaje..."
                                className="me-2"
                            />
                            <Button type="submit" variant="primary">
                                <FaPaperPlane />
                            </Button>
                        </div>
                    </Form>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Chatbot; 