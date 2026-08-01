import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import './Notifications.css';

const NotificationList = () => {
  const { notifications, remove } = useNotifications();

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} />;
      case 'error': return <AlertCircle size={20} />;
      default: return <Info size={20} />;
    }
  };

  return (
    <div className="notification-container">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className={`notification-toast glass ${notif.type}`}
            onAnimationComplete={() => {
              setTimeout(() => remove(notif.id), notif.duration);
            }}
          >
            <div className="notif-icon">{getIcon(notif.type)}</div>
            <div className="notif-content">
              <p>{notif.message}</p>
            </div>
            <button className="notif-close" onClick={() => remove(notif.id)}>
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationList;
  