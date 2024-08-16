import * as Yup from 'yup';

export const registerProfileSchema = Yup.object().shape({
    lookingForwardToGender: Yup.string().required('Gender is required'),
    dateOfBirth: Yup.date().required('Date of birth is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    profileUsername: Yup.string().required('Username is required'),
});