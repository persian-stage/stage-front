import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../state/store';
import { setUser, setIsUserLoggedIn, setError } from '../state/authSlice';
import { setLoading } from '../state/generalSlice';
import { logout as logoutService } from '../services/apiService';

export const useLogout = () => {
    const { push } = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const logout = async () => {
        dispatch(setLoading(true));
        try {
            await logoutService();
            dispatch(setUser(null));
            dispatch(setIsUserLoggedIn(false));
            push('/');
        } catch (error) {
            dispatch(setError((error as Error).message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return logout;
};