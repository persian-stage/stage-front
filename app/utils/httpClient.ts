import {enqueueSnackbar, VariantType} from "notistack";

export async function httpClient(url: string, options: RequestInit = {}) {
    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Correctly typing credentials
        ...options,
    };

    const handleClickVariant = (message: string, variant: VariantType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };

    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
        let errorMessage = 'An error occurred';
        if (response.status === 403) {
            errorMessage = 'Authentication failed';
        } else if (response.status >= 500) {
            errorMessage = 'Server Error';
        }
        handleClickVariant(errorMessage, 'error');

        const error = new Error(errorMessage);
        (error as any).status = response.status;
        throw error;
    }

    return await response.json();
}
