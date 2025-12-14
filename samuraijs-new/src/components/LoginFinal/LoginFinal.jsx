import React from "react";
import styles from "./LoginFinal.module.scss";
import { Form, Field } from "react-final-form";
import { maxLengthHandle, requiredField, requiredFieldCheckbox } from "../../utils/validators/validators";
import Input from "../common/formsControls/FormsControls";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../state/authSlice";


const LoginForm = (props) => {

  const dispatch = useDispatch();
// debugger
  const onSubmit = (values, form) => {
    dispatch(login({email: values.login, password: values.password, rememberMe: values.rememberMe}))
  };
  
  return (
    <Form onSubmit={onSubmit}
          render={({handleSubmit, submitting}) => (
            <form onSubmit={handleSubmit}>
              <label className={styles.inputWrapper}>
                <Field 
                  placeholder="login" 
                  name="login"
                  type="text"
                  component={Input}
                  validate={requiredField}
                />
              </label>
              <label className={styles.inputWrapper}>
                <Field 
                  placeholder="password" 
                  name="password" 
                  type="password" 
                  component={Input}
                  autoComplete="current-password"
                  validate={maxLengthHandle(20)}
                />
              </label>
              <label htmlFor="checkbox" className={styles.inputCheckboxWrapper}>
                <Field 
                  id="checkbox"
                  type="checkbox" 
                  name="rememberMe" 
                  component={Input}
                  validate={requiredFieldCheckbox}
                /> <span>запомнить меня</span>
              </label>
              <button type="submit" disabled={submitting}>Залогиниться</button>
              <span className={styles.errorMessage}>{props.error}</span>
            </form>
          )}
     />
  );
};

const LoginFinal = (props) => {
  const { isAuth, error, } = useSelector((state) => state.auth);

  if (isAuth) return <Navigate to={"/"} />
  return (
    <>
      <div className={styles.loginPage}>
        <h1>Login-final-Toolkit</h1>
        <LoginForm login={props.login} error={error} />
      </div>
    </>
  );
};


export default LoginFinal;
