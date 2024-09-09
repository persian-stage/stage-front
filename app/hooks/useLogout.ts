import { useRouter } from "next/navigation";
import { persistor, store } from '../state/store';
import { logout } from '../state/authSlice';
import { setLoading } from '../state/commonSlice';
import { logout as logoutService } from '../services/apiService';


export const useLogout = () => {
    const { push } = useRouter();
    return async () => {
        store.dispatch(setLoading(true));
        try {
            await logoutService();
            await resetStates();
            push('/');
        } catch (error) {
        } finally {
            store.dispatch(setLoading(false));
        }
    };
};

export const resetStates = async () => {
    try {
        store.dispatch(logout());
        await persistor.purge();
    } catch (error) {
    } finally {
    }
};