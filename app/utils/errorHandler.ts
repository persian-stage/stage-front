import { ValidationError } from "yup";
import { AppDispatch } from "@/app/state/store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ErrorMessage } from "@/app/interfaces";

//TODO fix error type ( define a structure for error in response of backend )
export const handleErrors = (error: unknown, dispatch: AppDispatch, setErrors: ActionCreatorWithPayload<ErrorMessage[], string>) => {
    // if (error instanceof ValidationError) {
    //     const validationErrors = error.inner.map(err => err.message);
    //     dispatch(setErrors(validationErrors.map(err => ({ errorMessage: err }))));
    // } else if ((error as any).response && (error as any).response.data && (error as any).response.data.errors) {
    //     dispatch(setErrors((error as any).response.data.errors));
    // } else {
    //     // TODO fix this
    //     // dispatch(setErrors([ { errorMessage: 'An error occurred' } ]));
    // }
};