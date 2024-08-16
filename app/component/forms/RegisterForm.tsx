'use client';
import React from 'react';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/state/store';
import { setEmail, setPassword, setFirstname, setLastname, toggleShowPassword } from '@/app/state/authSlice';

const RegisterForm = ({ submitForm }: { submitForm: (email: string, password: string, firstname: string, lastname: string) => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { email, password, firstname, lastname, showPassword } = useSelector((state: RootState) => state.auth);

    const handleSubmit = () => {
        submitForm(email, password, firstname, lastname);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <form id="register-form">
            <Stack spacing={2} direction="column">
                <h2 id="parent-modal-title">Register</h2>
                <TextField
                    id="outlined-basic"
                    value={firstname}
                    label="First Name"
                    name="firstname"
                    onChange={e => dispatch(setFirstname(e.target.value))}
                    sx={{ mt: 3, mb: 1, width: '100%' }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    value={lastname}
                    label="Last Name"
                    name="lastname"
                    onChange={e => dispatch(setLastname(e.target.value))}
                    sx={{ mt: 3, mb: 1, width: '100%' }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    value={email}
                    label="Email"
                    name="email"
                    onChange={e => dispatch(setEmail(e.target.value))}
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
                        onChange={e => dispatch(setPassword(e.target.value))}
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