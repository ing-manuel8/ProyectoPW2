import React from 'react';
import { Button } from 'react-bootstrap';
import { 
    FaCalendarAlt, 
    FaUserMd, 
    FaHospital, 
    FaClock, 
    FaMoneyBillWave, 
    FaExclamationTriangle,
    FaChevronDown,
    FaChevronUp
} from 'react-icons/fa';

const iconMap = {
    calendar: FaCalendarAlt,
    doctor: FaUserMd,
    hospital: FaHospital,
    clock: FaClock,
    money: FaMoneyBillWave,
    emergency: FaExclamationTriangle
};

const QuickOptions = ({ options, additionalOptions, showMore, onSelect, onToggleMore }) => {
    return (
        <div className="quick-options-container">
            <div className="quick-options">
                {options.map((option, index) => {
                    const Icon = iconMap[option.icon];
                    return (
                        <Button
                            key={index}
                            variant="outline-primary"
                            className="quick-option-btn"
                            onClick={() => onSelect(option)}
                        >
                            <Icon />
                            <span>{option.text}</span>
                        </Button>
                    );
                })}
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
                            {additionalOptions.map((option, index) => {
                                const Icon = iconMap[option.icon];
                                return (
                                    <Button
                                        key={index}
                                        variant="outline-primary"
                                        className="quick-option-btn"
                                        onClick={() => onSelect(option)}
                                    >
                                        <Icon />
                                        <span>{option.text}</span>
                                    </Button>
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default QuickOptions; 