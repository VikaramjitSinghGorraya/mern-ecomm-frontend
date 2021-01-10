import React, {useEffect, useState} from 'react'
import Layout from '../layout/Layout'
import axios from 'axios'
import styled from 'styled-components'

const UpdateUser = (props) =>{

    const [userData, setUserData] = useState({
        name:'',
        email: '',
        password: '',
        message: '',
        error: false
    })

    const inputChangeHandler = (e) =>{
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const getToken = () =>{
        if(sessionStorage.getItem('token')){
            axios.get(`https://myecommstore.herokuapp.com/api/user/${props.match.params.userId}`, { headers: { "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token')).token}` } })
                .then(res => setUserData({...userData, name: res.data.name, email: res.data.email }) )
                .catch(err => console.log(err))
        }
    }

    const updateUser = () =>{
        const user = {
            name: userData.name,
            email: userData.email,
            password: userData.password
        }
        axios.put(`https://myecommstore.herokuapp.com/api/user/${props.match.params.userId}`, user, { headers: { "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token')).token}` } })
        .then(res => {
            console.log(res.data)
            let auth = JSON.parse(sessionStorage.getItem('token'))
            auth.user.name = res.data.name;
            auth.user.email = res.data.email;
            auth.user.role = res.data.role;
            auth.user._id = res.data._id;
            sessionStorage.setItem("token", JSON.stringify(auth));
            window.location = `/userdashboard/${props.match.params.userId}`
        } )
        .catch(err => console.log(err))
    }

    useEffect(() =>(
        getToken()
    ),[])

    const submitForm = (e) =>{
        e.preventDefault()
       updateUser()
    }

    const updateForm = () =>{
        return(
            <OuterContainer className = 'animate__animated animate__fadeIn'>
                <SignupForm onSubmit = {submitForm}>
                    <InputAndLabelContainer>
                        <div>
                            <label>Name</label>
                            <input type = "text" name = "name" value = {userData.name} onChange = {inputChangeHandler}/>
                        </div>

                        <div>
                            <label>Email</label>
                            <input type = "email" name = "email" value = {userData.email} onChange = {inputChangeHandler}/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type = "password" name = "password"  value = {userData.password} onChange = {inputChangeHandler}/>
                        </div>
                    </InputAndLabelContainer>
                    <ButtonsContainer>
                        <EnterButton type = 'submit'>
                            < i className = 'fa fa-check'/>
                        </EnterButton>
                    </ButtonsContainer>
                </SignupForm>
            </OuterContainer>
        )
    }
    return (
        <>
        <Layout title = 'Update Info' description = 'Hi' icon= 'fa fa-male'/>

        <div>
            {updateForm()}
        </div>
        </>
    )
}

export default UpdateUser

const OuterContainer = styled.div`
    display: grid;
    grid-template-columns: 100%;
    row-gap: 10px;
    width: 90%;
    margin: 50px auto 100px auto;
`;


const SignupForm = styled.form`
`;

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
    justify-content: flex-end;
    padding: 10px 10px;
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

