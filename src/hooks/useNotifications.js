import { useDispatch, useSelector } from 'react-redux';
import { addNotification, removeNotification, clearNotifications } from '../store/slices/notificationSlice';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  const notify = (message, type = 'info', duration = 3000) => {
    dispatch(addNotification({ message, type, duration }));
  };

  const remove = (id) => {
    dispatch(removeNotification(id));
  };

  const clear = () => {
    dispatch(clearNotifications());
  };

  return {
    notifications,
    notify,
    remove,
    clear,
  };
};
