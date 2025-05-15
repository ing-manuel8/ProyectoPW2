import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaRobot, FaTimes } from 'react-icons/fa';
import useChatbot from '../hooks/useChatbot';
import ChatMessage from './chatbot/ChatMessage';
import QuickOptions from './chatbot/QuickOptions';
import ChatInput from './chatbot/ChatInput';
import '../styles/Chatbot.css';

const Chatbot = () => {
    const {
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
    } = useChatbot();

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
                dialogClassName="chatbot-modal"
                contentClassName="chatbot-content"
                centered={false}
                animation={true}
            >
                <Modal.Header className="chatbot-header">
                    <Modal.Title>
                        <FaRobot className="me-2" />
                        Asistente Virtual
                    </Modal.Title>
                    <Button 
                        variant="link" 
                        onClick={handleClose} 
                        className="close-button"
                        aria-label="Cerrar chat"
                    >
                        <FaTimes />
                    </Button>
                </Modal.Header>
                <Modal.Body className="chatbot-body">
                    <div className="messages-container">
                        {messages.length === 0 && (
                            <div className="welcome-message">
                                <h5>¡Bienvenido!</h5>
                                <p>¿En qué puedo ayudarte hoy?</p>
                                <QuickOptions 
                                    options={opcionesRapidas}
                                    additionalOptions={opcionesAdicionales}
                                    showMore={mostrarMasOpciones}
                                    onSelect={handleQuickOption}
                                    onToggleMore={toggleMasOpciones}
                                />
                            </div>
                        )}
                        {messages.map((message, index) => (
                            <React.Fragment key={index}>
                                <ChatMessage message={message} />
                                {index === messages.length - 1 && message.sender === 'bot' && (
                                    <div className="quick-options-wrapper">
                                        <QuickOptions 
                                            options={opcionesRapidas}
                                            additionalOptions={opcionesAdicionales}
                                            showMore={mostrarMasOpciones}
                                            onSelect={handleQuickOption}
                                            onToggleMore={toggleMasOpciones}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </Modal.Body>
                <Modal.Footer className="chatbot-footer">
                    <ChatInput
                        value={inputMessage}
                        onChange={setInputMessage}
                        onSubmit={handleSendMessage}
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Chatbot; 