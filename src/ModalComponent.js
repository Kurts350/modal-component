import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './ModalComponent.css';

// Composants stylisés
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity ${props => props.$fadeDuration/1000}s ease;
  
  &.modal-visible {
    opacity: 1;
  }
`;

const ModalContent = styled.div`
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 5px;
  max-width: ${props => props.$maxWidth ? `${props.$maxWidth}px` : '400px'};
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-20px);
  transition: opacity ${props => props.$fadeDuration/1000}s ease, transform ${props => props.$fadeDuration/1000}s ease;
  
  &.modal-visible {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  margin-top: 15px;
  background-color: #009879;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #008068;
  }
  
  &:focus {
    outline: 2px solid #00634f;
    outline-offset: 2px;
  }
`;

// Version simplifiée du Modal
const Modal = React.memo(({ 
  isOpen, 
  onClose, 
  children,
  title = "Success!",
  closeText = "Close",
  maxWidth = null,
  className = "",
  fadeDuration = 300
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const overlayRef = React.useRef(null);
  const contentRef = React.useRef(null);
  
  // Effet pour gérer l'animation d'ouverture/fermeture
  React.useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden'; // Empêcher le défilement du body
      
      // Ajouter la classe après un court délai pour l'animation
      const timer = setTimeout(() => {
        if (overlayRef.current && contentRef.current) {
          overlayRef.current.classList.add('modal-visible');
          contentRef.current.classList.add('modal-visible');
        }
      }, 10);
      
      return () => clearTimeout(timer);
    } else {
      // Retirer la classe pour démarrer l'animation de fermeture
      if (overlayRef.current && contentRef.current) {
        overlayRef.current.classList.remove('modal-visible');
        contentRef.current.classList.remove('modal-visible');
      }
      
      // Attendre la fin de l'animation avant de masquer complètement
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = ''; // Rétablir le défilement
      }, fadeDuration);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, fadeDuration]);
  
  // Gestion de la touche ESC
  React.useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  // Gestion du clic sur l'overlay
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <ModalOverlay 
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-title"
      $fadeDuration={fadeDuration}
    >
      <ModalContent 
        ref={contentRef}
        className={className}
        $maxWidth={maxWidth}
        $fadeDuration={fadeDuration}
      >
        {title && <h2 id="modal-title">{title}</h2>}
        {children}
        <ModalButton onClick={onClose} aria-label="Close modal">
          {closeText}
        </ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
});

Modal.displayName = "Modal";

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
  closeText: PropTypes.string,
  maxWidth: PropTypes.number,
  className: PropTypes.string,
  fadeDuration: PropTypes.number
};

export default Modal;