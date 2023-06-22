import { useContext } from 'react';
import { LoadingContext } from '../components/Providers/LoadingProvider';
import { toast } from 'react-hot-toast';

export const useRequest = () => {
  const { startLoading, finishLoading } = useContext(LoadingContext);

  const request = async (request: Promise<unknown> | Promise<void>, errorMessage: string) => {
    request.catch(() => {
      toast.error(errorMessage);
    });
  };

  const loadingRequest = async (
    request: Promise<unknown> | Promise<void>,
    loadingMessage: string,
    successMessage: string,
    errorMessage: string,
  ) => {
    startLoading();
    await toast
      .promise(request, {
        loading: loadingMessage,
        success: successMessage,
        error: errorMessage,
      })
      .catch(() => {
        finishLoading();
      })
      .finally(() => {
        finishLoading();
      });
  };

  return { request, loadingRequest };
};
