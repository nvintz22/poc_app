import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { makeStyles } from '@material-ui/core/styles';

// FORMIK
import { Formik, Field, Form } from 'formik'

// @MATERIAL UI
import { TextField } from 'formik-material-ui';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';


import { actionLoginRequest } from '../../modules/login';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      height: '100vh',
      alignItems: 'center',
      paddingLeft: '10%'
    },
    formContainer: {
        width: 320,
        height: 'auto',
        backgroundColor: '#FAFAFA'
    },
    textField: {
      width: "100%",
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px'
    },
    formik: {
        marginTop: '10px'
    }
  }));
  
  

const Login = ({ actionLoginRequest, isLoggingIn, history }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.container}>
            <Card className={classes.formContainer}>
                <CardContent>
                    <Typography variant="button" gutterBottom>
                        <AccountCircleIcon />
                        {" "}
                        Sign in
                    </Typography>
                    <Formik
                        initialValues={{ email: '', password: ''}}
                        onSubmit={({email, password}) => {
                            actionLoginRequest({ email, password, history})
                        }}
                    >
                        <Form className={classes.formik}>
                            <Field 
                                className={classes.textField}
                                placeholder="Email"
                                name="email"
                                label="Email"
                                type="email"
                                component={TextField}    
                            />
                            <Field 
                                label="Password"
                                className={classes.textField}
                                placeholder="Password"
                                margin="normal"  
                                name="password"
                                type="password"      
                                component={TextField}    
                            />

                            <div className={classes.btnContainer}>
                                <Button variant="contained" color="primary" className={classes.button} type="submit" disabled={isLoggingIn}>
                                    SIGN IN
                                </Button>
                            </div>
                        </Form>
                    </Formik>
             
                </CardContent>
            </Card>
        
        </div>
    )
}

export default connect(state => ({
    isLoggingIn: state.login.isLoggingIn
}), 
dispatch => bindActionCreators({
    actionLoginRequest
}, dispatch)
)(Login);