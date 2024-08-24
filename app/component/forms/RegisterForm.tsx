'use client';
import React, { useEffect } from 'react';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/state/store';
import { setEmail, setPassword, setFirstname, setLastname, toggleShowPassword, setErrors } from '@/app/state/registerSlice';
import Box from "@mui/material/Box";
import { ValidationRule } from "@/app/interfaces/validation";
import { Validator } from "@/app/utils/validator";

const RegisterForm = ({ submitForm }: { submitForm: (email: string, password: string, firstname: string, lastname: string) => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { email, password, firstname, lastname, showPassword, errors } = useSelector((state: RootState) => state.register);

    const validationRules: ValidationRule[] = [
        { field: 'firstname', method: (value) => value.length > 3, message: 'First name is required' },
        { field: 'lastname', method: (value) => value.length > 3, message: 'Last name is required' },
        { field: 'email', method: (value) => /\S+@\S+\.\S+/.test(value), message: 'Email is invalid' },
        { field: 'password', method: (value) => value.length >= 2, message: 'Password must be at least 6 characters' },
    ];

    const validator = new Validator(validationRules);

    const handleSubmit = () => {
        const formData = { email, password, firstname, lastname };
        const validationErrors = validator.validate(formData);
        if (validationErrors.length > 0) {
            dispatch(setErrors(validationErrors.map(error => ({ field: error.field, errorMessage: error.message }))));
        } else {
            submitForm(email, password, firstname, lastname);
        }
    };

    const validateForm = (field: string, value: any) => {
        const formData = { email, password, firstname, lastname, [field]: value };
        const validationErrors = validator.validate(formData);
        const fieldErrors = validationErrors.filter(error => error.field === field);
        dispatch(setErrors(fieldErrors.map(error => ({ field: error.field, errorMessage: error.message }))));
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <form id="register-form">
            <Stack spacing={2} direction="column">
                <h2 id="parent-modal-title">Register</h2>
                {errors.length > 0 &&
                    <Box sx={{ color: 'red' }}>
                        {errors.map(e   => e.errorMessage).join(', ') }
                    </Box>
                }
                <TextField
                    id="outlined-basic"
                    value={firstname}
                    label="First Name"
                    name="firstname"
                    onChange={e => {
                        dispatch(setFirstname(e.target.value));
                        validateForm('firstname', e.target.value);
                    }}
                    error={errors.length > 0 && errors.some(e => e.field === 'firstname')}
                    onBlur={e => {
                        validateForm('firstname', e.target.value);
                    }}
                    sx={{ mt: 3, mb: 1, width: '100%' }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    value={lastname}
                    label="Last Name"
                    name="lastname"
                    onChange={e => {
                        dispatch(setLastname(e.target.value));
                        validateForm('lastname', e.target.value);
                    }}
                    onBlur={e => {
                        validateForm('lastname', e.target.value);
                    }}
                    error={errors.length > 0 && errors.some(e => e.field === 'lastname')}
                    sx={{ mt: 3, mb: 1, width: '100%' }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    value={email}
                    label="Email"
                    name="email"
                    onChange={e => {
                        dispatch(setEmail(e.target.value))
                        validateForm('email', e.target.value);
                    }}
                    onBlur={e => {
                        validateForm('email', e.target.value);
                    }}
                    error={errors.length > 0 && errors.some(e => e.field === 'email')}
                    sx={{ mt: 3, mb: 1, width: '100%' }}
                    variant="outlined"
                />
                <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={password}
                        onChange={e => {
                            dispatch(setPassword(e.target.value))
                            validateForm('password', e.target.value);
                        }}
                        onBlur={e => {
                            validateForm('password', e.target.value);
                        }}
                        error={errors.length > 0 && errors.some(e => e.field === 'password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => dispatch(toggleShowPassword())}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Button sx={{ width: '100%' }} variant="contained" color="success" onClick={handleSubmit}>
                    Register
                </Button>
            </Stack>
        </form>
    );
};

export default RegisterForm;