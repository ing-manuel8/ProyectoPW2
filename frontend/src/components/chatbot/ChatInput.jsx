import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

const ChatInput = ({ value, onChange, onSubmit }) => {
    return (
        <Form onSubmit={onSubmit} className="w-100">
            <div className="d-flex align-items-center">
                <Form.Control
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="me-2"
                />
                <Button 
                    type="submit" 
                    variant="primary"
                    aria-label="Enviar mensaje"
                >
                    <FaPaperPlane />
                </Button>
            </div>
        </Form>
    );
};

export default ChatInput; 