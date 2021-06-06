import React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { TextField, IconButton, InputAdornment, Grid } from '@material-ui/core';



const Input = ({ handleShowPassword, handleChange, autoFocus, type, label, name, half }) => {
     
     return (
     <Grid item xs={12} sm={half ? 6 : 12}>
         <TextField 
            name={name}
            onChange={handleChange}
            variant='outlined'
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={ name === 'password' && {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === "password" ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            />
     </Grid>
     )
};

export default Input;