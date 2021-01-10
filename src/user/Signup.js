import React, {useState} from 'react'
import Layout from '../layout/Layout'
import styled from 'styled-components'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'

const Signup = () =>{

    const [userData, setUserData] =  useState({
        name: '',
        email: '',
        password: '',
        message: '',
        success: false,
        error: false
    })

    const inputChangeHandler = (e) =>{
        setUserData({...userData, [e.target.name]:e.target.value, error:false, success:false})
    }

    const submitForm = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:4000/api/signup', userData)
             .then(res => setUserData({...userData, name:'', email: '', password:'', message: 'Account Created! Please Signin', success: true}))
             .catch( error=> setUserData({...userData, message:error.response.data.error, error: true}))
    }

    const signupForm = () =>{
        return(
                <OuterContainer className = 'animate__animated animate__fadeIn'>
                    <Disclaimer>
                        <span>DISCLAIMER</span>
                        <p>
                            This is a demo app (not a production app). 
                            The products being showed are just placeholders.
                            Do go ahead and signup and experience what a modern ecommerce app could be like! 
                            Hope you like it.
                        </p>
                    </Disclaimer>
                    <SignupForm onSubmit = {submitForm}>
                        <InputAndLabelContainer>
                            <div>
                                <label>Full Name</label>
                                <input type = "text" name = 'name' value = {userData.name} onChange = {inputChangeHandler}/>
                            </div>
                            <div>
                                <label>Email</label>
                                <input type = "email" name = 'email' value = {userData.email} onChange = {inputChangeHandler}/>
                            </div>
                            <div>
                                <label>Password</label>
                                <input type = "password" name = 'password' value = {userData.password} onChange = {inputChangeHandler}/>
                            </div>
                        </InputAndLabelContainer>
                        <ButtonsContainer>
                            <SignupButton>
                                <span>Already Onboard?</span>
                                <SigninLink to = '/signin'>SIGNIN</SigninLink>
                            </SignupButton>
                            <EnterButton type = 'submit'>
                                <i className = 'fa fa-arrow-right'/>
                            </EnterButton>
                        </ButtonsContainer>
                    </SignupForm>
                </OuterContainer>
                )
}

const showError = () => {
    return(
        <MessageDiv style = {{color: 'red'}}>
            <p className = 'animate__animated animate__flash animate__faster'>
                <i className="fa fa-exclamation-circle"/>
                {userData.message}
            </p>
        </MessageDiv>
    )
}

const showSuccessMessage = () => {
    return(
        <MessageDiv style = {{color: 'green'}}>
            <p className = 'animate__animated animate__flash animate__faster'>
                <i className="fa fa-check-circle"/>
                {userData.message}
            </p>
        </MessageDiv>
    )
}

const displaySignupForm = () =>{
    return(
        <div>
            <Layout title = 'Signup' description = 'Lets get started!' icon = 'fa fa-user'/>
            
            {userData.error && showError()}
            
            {userData.success && showSuccessMessage()}
            
            {signupForm()} 
        </div>  
    )
}
    return (
        sessionStorage.getItem('token') ? <Redirect to = {{pathname: '/'}}/> : displaySignupForm()  
    )
}

export default Signup
const MessageDiv = styled.div`
    text-align: center;
    font-size:1.5rem;
    font-weight: 500; 
`;
const OuterContainer = styled.div`
    display: grid;
    grid-template-columns: 100%;
    row-gap: 10px;
    width: 90%;
    margin: 50px auto 100px auto;

`;

const Disclaimer = styled.div`
    padding: 10px;
    border: 1px solid rgb(26, 115, 232);
    color: rgb(26, 115, 232);
    border-radius: 10px;
    text-align: left;
    span{
        border-radius: 10px;
        background-color: rgb(26, 115, 232);
        color: white;
        padding: 5px 5px;
    }
    p{
        font-size:0.85rem;
    }
`;

const SignupForm = styled.form``;

const InputAndLabelContainer = styled.div`
    color: rgb(26, 115, 232);
    border: 1px solid rgb(26, 115, 232);
    border-radius: 10px;
    padding: 10px;
    div{
        display: grid;
        grid-template-columns: 100%;
        margin-bottom: 20px;
        padding: 10px;
    }
    label{
        margin-bottom: 10px;
    }
    input{
        border: none;
        outline: none;
        border-bottom: 0.12rem solid rgb(26, 115, 232);
        background-color: transparent;
        transition: all 200ms ease-in-out;
        height:30px;
        color: rgb(26, 115, 232);
        &::placeholder,&:focus{
            color: rgb(26, 115, 232);
        }
        &:focus{
            border-bottom: 0.12rem solid violet;
        }
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 10px;

`;
const SignupButton = styled.div`
    display: flex;
    flex-direction: column;
    color: rgb(26, 115, 232);
`;

const SigninLink = styled(Link)`
    text-decoration: none;
        text-align: center;
        border: 1px solid rgb(26, 115, 232);
        border-radius: 10px;
        padding: 5px 0;
        height: 30px;
        width:90px;
        margin-top: 10px;
        color: rgb(26, 115, 232);
        background-color: white;
        outline: none;
        &:hover{
            color: white;
            background-color: rgb(26, 115, 232);
            cursor: pointer;
        }
`;
const EnterButton = styled.button`
    height: 50px;
    width: 50px;
    border: 1px solid rgb(26, 115, 232);
    border-radius: 100%;
    background-color: white;
    color:rgb(26, 115, 232);
    outline: none;
    position: relative;
    &:hover{
            color: white;
            background-color: rgb(26, 115, 232);
            cursor: pointer;
        }
    i{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;