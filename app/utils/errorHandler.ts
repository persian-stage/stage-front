import { ValidationError } from "yup";
import { AppDispatch } from "@/app/state/store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

//TODO fix error type ( define a structure for error in response of backend )
export const handleErrors = (error: unknown, dispatch: AppDispatch, setErrors: ActionCreatorWithPayload<string[], string>) => {
    if (error instanceof ValidationError) {
        const validationErrors = error.inner.map(err => err.message);
        dispatch(setErrors(validationErrors));
    } else if ((error as any).response && (error as any).response.data && (error as any).response.data.errors) {
        dispatch(setErrors((error as any).response.data.errors));
    } else {
        dispatch(setErrors(['An error occurred']));
    }
};