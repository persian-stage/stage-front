import {httpClient} from "../utils/httpClient";

export const fetchDatingData = async (): Promise<any> => {
    const response = await httpClient('/api/v1/dating/');
    if (response.ok) {
        return await response.json();
    }
    return null;
}