import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser, updateUserRole } from '../store/slices/userSlice';
import { useNotifications } from './useNotifications';

export const useUsers = () => {
  const dispatch = useDispatch();
  const { notify } = useNotifications();
  const { items: users, loading, error } = useSelector((state) => state.users);

  const inviteUser = (name, email, role) => {
    dispatch(addUser({ name, email, role }));
    notify(`Invited ${name}`, 'success');
  };

  const deleteUser = (id) => {
    dispatch(removeUser(id));
    notify('User removed', 'error');
  };

  const changeRole = (id, role) => {
    dispatch(updateUserRole({ id, role }));
    notify('Role updated', 'info');
  };

  return {
    users,
    loading,
    error,
    inviteUser,
    deleteUser,
    changeRole,
  };
};
