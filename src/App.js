import React, { useState } from "react"
import { Avatar, Paper, Grid, Typography, Container, Button } from '@material-ui/core';
import LockOpen from "@material-ui/icons/LockOpen";
import { GoogleLogin } from 'react-google-login'
import Icon from "./Icon";
import { useDispatch } from 'react-redux'

import Input from "./input";
import  useStyles from './styles'


    const App = () => {

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)   
    }; 

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch

    const handleSubmit = () =>{

    };
    const handleChange = () =>{

    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj; // cannot get property profileObj of undefined 
        const token = res?.tokenId; // cannot get property profileObj of undefined 
        try{
            dispatch({ type : 'AUTH' , data: { result, token } });
        }  catch(error) {
            console.log(error)
        }    
     };

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Sign In was unsuccesful. Try Again Later")
    };
    
    const classes = useStyles();
    
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOpen />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} />
                                </>
                            )
                        }
                        
                        <Input name="email" label="Email" handleChange={handleChange} type='email' />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}  />
                        { isSignup && <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} type="password" />} 
                        
                    </Grid> {/* Sign In/Up Button */}
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                        { isSignup ? 'Sign Up' : 'Sign In'}     
                    </Button>
                    {/* Google Login */}
                    <GoogleLogin 
                        clientId="496557817893-ms3m86ddq61u22b9jsl1qi8v9836khob.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="container">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid containter justify="flex end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign in' : 'Dont have an account? Sign up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>   
            </Paper>
        </Container>
    );
};
                    
export default App