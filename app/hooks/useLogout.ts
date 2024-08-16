import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../state/store';
import { setIsUserLoggedIn, setUser } from '../state/authSlice';
import { setLoading } from '../state/generalSlice';
import { logout as logoutService } from '../services/apiService';

export const useLogout = () => {
    const { push } = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    return async () => {
        dispatch(setLoading(true));
        try {
            await logoutService();
            dispatch(setUser(null));
            dispatch(setIsUserLoggedIn(false));
            push('/');
        } catch (error) {
        } finally {
            dispatch(setLoading(false));
        }
    };
};