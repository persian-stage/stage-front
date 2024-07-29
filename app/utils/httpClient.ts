import {enqueueSnackbar, VariantType} from "notistack";

export async function httpClient(url: string, options: RequestInit = {}) {
    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        ...options,
        cache: 'no-store'
    };

    const handleClickVariant = (message: string, variant: VariantType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };

    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
        let errorMessage = 'An error occurred';
        let variant: VariantType = 'warning';
        if (response.status === 403) {
            errorMessage = 'Authentication failed';
            variant = 'error';
        } else if (response.status >= 500) {
            errorMessage = 'Server Error';
            variant = 'error';
        }
        handleClickVariant(errorMessage, variant);
    }

    return response;
}
