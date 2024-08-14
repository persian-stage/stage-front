'use client';

import React from 'react';
import { SnackbarProvider } from 'notistack';

const ClientSnackbarProvider: React.FC = () => {
    return <SnackbarProvider/>;
};

export default ClientSnackbarProvider;