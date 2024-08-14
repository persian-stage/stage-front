import { enqueueSnackbar, VariantType } from 'notistack';

export const notify = (message: string, variant: VariantType = 'default') => {
    enqueueSnackbar(message, { variant });
};