import { AuthServices } from '../../../services/apis';
import { SharedServices } from '../../../services/apis/shared';
import {
  useGetRegistration,
  useRefetchData,
  useLoadingIndicator,
} from '../../../services/zustandVariables';
import { shallow } from 'zustand/shallow';
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { timeAndDate } from '../../../helpers';
import swal from 'sweetalert2';

export const useAccount = () => {
  const router = useRouter();

  const {
    updateRegistration: updateRegistrationVars,
    step,
    ...state
  } = useGetRegistration(
    (state) => ({ ...state, updateRegistration: state.updateRegistration }),
    shallow
  );

  const isCheckLoagind = useLoadingIndicator((state) => state.updateLoading);

  const updateRefetch = useRefetchData((state) => state.updateRefetch);

  const checkLoading = () =>
    updateRegistrationVars({
      ...state,
      step,
      loading: true,
    });

  const subscribeLoading = () => isCheckLoagind(true);
  const unSubscribeLoading = () => isCheckLoagind(false);

  const changeAccountStatus = async (id, isDeactivate = false) => {
    const { updateDocument } = new SharedServices();

    const { dateOnly } = timeAndDate();

    const args = {
      docId: id,
      data: { deactivatedAt: isDeactivate ? dateOnly : '' },
      collectionName: 'adminUsers',
    };

    await updateDocument(args);

    const { isConfirmed } = await swal.fire({
      title: 'Success',
      text: 'successfully deactivated this account',
      icon: 'success',
    });

    if (isConfirmed) {
      updateRefetch(true);
    }
  };

  const validateStrongPassword = (password) => {
    const formatted = password.trim();

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\W\w]{8,}$/;
    const errorMessage = `The password isn't strong enough. \n- Must be at least 8 characters \n- Must include at least a number, and upper case and lower case alphabets`;

    return {
      validation: regex.test(formatted),
      message: errorMessage,
    };
  };

  const uploadAvatar = async (authId, file) => {
    const { uploadAvatar } = new AuthServices();
    checkLoading();
    const response = await uploadAvatar(authId, file);
    response &&
      updateRegistrationVars({
        ...state,
        step: 'success',
        loading: false,
      });
  };

  const registerUserAdmin = async (args) => {
    const { authRegisterAdmin } = new AuthServices();
    subscribeLoading();

    const response = await authRegisterAdmin(
      args.email,
      args.password,
      args.config,
      args.image
    );

    if (response?.authId) {
      swal.fire({
        title: 'Success',
        text: 'successfully added new user',
        icon: 'success',
      });
      unSubscribeLoading();
    }

    updateRefetch(true);
  };

  const registerUser = async (args) => {
    const { authRegister } = new AuthServices();
    checkLoading();
    const response = await authRegister(
      args.email,
      args.password,
      args.config
    );

    response &&
      updateRegistrationVars({
        email: args?.email,
        authId: response?.authId,
        step: 'uploadImage',
        loading: false,
      });

    updateRefetch(true);
  };

  const signOut = () => {
    const { signOut } = new AuthServices();
    signOut();
    deleteCookie('ADMIN_TOKEN');
    router.push('/sign-in');
  };

  const signIn = async (email, password) => {
    const { signInService } = new AuthServices();

    const response = await signInService(email, password);
    const userToken = await response?.token;

    if (response?.token) {
      swal.fire({
        title: 'Success',
        text: 'successfully logged in',
        icon: 'success',
      });
      router.push('admin/dashboard');
      setCookie('ADMIN_TOKEN', {
        token: userToken || '',
        email: response.response.user.email,
      });
    }
  };

  return {
    changeAccountStatus,
    checkLoading,
    uploadAvatar,
    registerUserAdmin,
    validateStrongPassword,
    registerUser,
    signOut,
    signIn,
  };
};
