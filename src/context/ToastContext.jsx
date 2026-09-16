import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  Cross2Icon
} from '@radix-ui/react-icons';

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
              success: <CheckCircledIcon width={18} height={18} style={{ color: '#10B981', flexShrink: 0 }} />,
              error: <ExclamationTriangleIcon width={18} height={18} style={{ color: '#EF4444', flexShrink: 0 }} />,
              warning: <ExclamationTriangleIcon width={18} height={18} style={{ color: '#F59E0B', flexShrink: 0 }} />,
              info: <InfoCircledIcon width={18} height={18} style={{ color: 'var(--color-gold-light)', flexShrink: 0 }} />
            };

            return (
              <motion.div
                key={toast.id}
                className={`toast-item ${toast.type}`}
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
                layout
              >
                {icons[toast.type] || icons.info}
                <span style={{ flex: 1, color: 'var(--text-primary)', lineHeight: 1.4 }}>{toast.message}</span>
                <button
                  onClick={() => removeToast(toast.id)}
                  style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', padding: '2px' }}
                  aria-label="Fermer"
                >
                  <Cross2Icon width={14} height={14} />
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
