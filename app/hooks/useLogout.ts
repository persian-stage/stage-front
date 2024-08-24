import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../state/store';
import { setIsUserLoggedIn, setUser } from '../state/authSlice';
import { setLoading } from '../state/commonSlice';
import { logout as logoutService } from '../services/apiService';
import { setAvatarUrl } from "@/app/state/registerSlice";
import { setProfileAppRegistered } from "@/app/state/profileApp/profileAppSlice";

export const useLogout = () => {
    const { push } = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    return async () => {
        dispatch(setLoading(true));
        try {
            await logoutService();
            dispatch(setAvatarUrl(''));
            dispatch(setUser(null));
            dispatch(setIsUserLoggedIn(false));
            dispatch(setProfileAppRegistered(false));
            push('/');
        } catch (error) {
        } finally {
            dispatch(setLoading(false));
        }
    };
};