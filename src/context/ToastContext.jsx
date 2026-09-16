import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showSuccess = useCallback((msg) => addToast(msg, 'success'), [addToast]);
  const showError = useCallback((msg) => addToast(msg, 'error', 5000), [addToast]);
  const showInfo = useCallback((msg) => addToast(msg, 'info'), [addToast]);
  const showWarning = useCallback((msg) => addToast(msg, 'warning'), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, showSuccess, showError, showInfo, showWarning }}>
      {children}
      <div className="toast-container" aria-live="polite">
        <AnimatePresence>
          {toasts.map((toast) => {
            const icons = {
              success: <FiCheckCircle style={{ color: '#10B981', fontSize: '1.2rem', flexShrink: 0 }} />,
              error: <FiAlertCircle style={{ color: '#EF4444', fontSize: '1.2rem', flexShrink: 0 }} />,
              warning: <FiAlertCircle style={{ color: '#F59E0B', fontSize: '1.2rem', flexShrink: 0 }} />,
              info: <FiInfo style={{ color: 'var(--color-gold-light)', fontSize: '1.2rem', flexShrink: 0 }} />
            };

            return (
              <motion.div
                key={toast.id}
                className={`toast-item ${toast.type}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                layout
              >
                {icons[toast.type] || icons.info}
                <span style={{ flex: 1, color: 'var(--text-primary)', lineHeight: 1.4 }}>{toast.message}</span>
                <button
                  onClick={() => removeToast(toast.id)}
                  style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', padding: '2px' }}
                  aria-label="Fermer"
                >
                  <FiX />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
