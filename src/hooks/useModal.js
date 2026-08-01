import { useDispatch, useSelector } from 'react-redux';
import { openModal as openAction, closeModal as closeAction } from '../store/slices/uiSlice';

export const useModal = () => {
  const dispatch = useDispatch();
  const { active, data } = useSelector((state) => state.ui.modals);

  const openModal = (name, modalData = null) => {
    dispatch(openAction({ name, data: modalData }));
  };

  const closeModal = () => {
    dispatch(closeAction());
  };

  const isOpen = (name) => active === name;

  return {
    isOpen,
    activeModal: active,
    modalData: data,
    openModal,
    closeModal,
  };
};
