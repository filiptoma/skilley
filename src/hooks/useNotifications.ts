import { toast } from 'react-hot-toast';

const useNotifications = () => {
  const notifySuccess = (message: string) => {
    toast.success(message);
  };

  const notifyError = (message?: string) => {
    toast.error(message ?? 'Nastala neočekávaná chyba');
  };

  return { notifySuccess, notifyError };
};

export default useNotifications;
