import React from 'react';
import { Button } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const QuickOptions = ({ options, additionalOptions, showMore, onSelect, onToggleMore }) => {
    return (
        <div className="quick-options-container">
            <div className="quick-options">
                {options.map((option, index) => (
                    <Button
                        key={index}
                        variant="outline-primary"
                        className="quick-option-btn mb-2"
                        onClick={() => onSelect(option)}
                    >
                        {option.text}
                    </Button>
                ))}
            </div>
            
            {additionalOptions && additionalOptions.length > 0 && (
                <>
                    <Button
                        variant="link"
                        className="more-options-btn"
                        onClick={onToggleMore}
                    >
                        {showMore ? (
                            <>
                                <FaChevronUp className="me-2" />
                                Ver menos opciones
                            </>
                        ) : (
                            <>
                                <FaChevronDown className="me-2" />
                                Ver más opciones
                            </>
                        )}
                    </Button>
                    
                    {showMore && (
                        <div className="quick-options additional-options">
                            {additionalOptions.map((option, index) => (
                                <Button
                                    key={index}
                                    variant="outline-primary"
                                    className="quick-option-btn mb-2"
                                    onClick={() => onSelect(option)}
                                >
                                    {option.text}
                                </Button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default QuickOptions; 