import React from 'react'
import Logo from '../Images/Icon.png'
import styled from 'styled-components'
import axios from 'axios'
import {Link,withRouter} from 'react-router-dom'
const Menu = () =>{
    const handleNavbar = () =>{
        document.getElementById('navbar').style.height==="330px"?document.getElementById('navbar').style.height="60px":document.getElementById('navbar').style.height="330px"
    }

    const handleSignout = () =>{
        sessionStorage.removeItem('token')
        axios.get('http://localhost:4000/api/signout')
            .then((res) => console.log(res))
            .catch(err => console.log(err))
            
            window.location ='/'
    }

    const isSignedIn = () =>{
       return sessionStorage.getItem('token') ? true : false
    }

    const handleUserRedirect = () =>{
        return JSON.parse( sessionStorage.getItem('token')).user.role === 0 ? window.location = `userdashboard/${JSON.parse( sessionStorage.getItem('token')).user._id}`:''
    }
    return (
        <OuterContainer id = "navbar">
            <HeadingAndNavCionContainer>
                <HedingContainer><AccessiblityLink to ='/'><img  src ={Logo} alt = 'phot'/> <span>My Store</span></AccessiblityLink></HedingContainer>
                <NavIconContainer onClick = {handleNavbar}>
                    <div className = "bar1"></div>
                    <div className = "bar2"></div>
                    <div className = "bar3"></div>
                </NavIconContainer>
            </HeadingAndNavCionContainer>
            <OptionsContainer>
                <li><AccessiblityLink onClick = {handleNavbar} to = '/'>HOME</AccessiblityLink></li>
                <li><AccessiblityLink onClick = {handleNavbar} to = '/shop'>SHOP</AccessiblityLink></li>
                <li><AccessiblityLink onClick = {handleNavbar} to = '/cart'>CART</AccessiblityLink></li>
                <li><hr/></li>
            </OptionsContainer>
            <SingingContainer>
            {isSignedIn() && <button onClick = {handleUserRedirect}><i className="fa fa-user-circle"></i></button>}
            {isSignedIn() && <button onClick = {handleSignout}><i className="fa fa-sign-out-alt"></i>SIGNOUT</button>}
            {!isSignedIn() && <LoginLinks onClick = {handleNavbar} to ='/signin'><i className = "fa fa-sign-in"></i>SIGNIN</LoginLinks>}
            {!isSignedIn() && <LoginLinks onClick = {handleNavbar} to = '/signup'><i className="fa fa-user-plus"></i>SIGNUP</LoginLinks>}
            </SingingContainer>
            <GitLinkContainer>
            <p>DEVELOPED BY <span> VIKARAMJIT SINGH</span></p>
            <hr/>
            <AccessiblityLink to = "https://github.com/VikaramjitSinghGorraya" target = "_blank" ><i class="fa fa-github">KNOW MORE</i></AccessiblityLink>
            </GitLinkContainer>
        </OuterContainer>
    )
}

export default Menu;

const OuterContainer = styled.div`
    width: 80%;
    height:55px;
    margin: auto ;
    position: fixed;
    bottom: 0;
    right: 0;
    left:0;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background:linear-gradient(152deg, #004efe 0%, #00acfe 60%, #68ceff 100%);
    display: flex;
    flex-direction: column;
    padding: 10px 20px 10px 20px;
    transition: all 0.2s ease-in-out;
    color: white;
    @media (min-width: 765px){
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-height: 60px;
        max-height: 60px;
    }
    ${Link}{
        text-decoration: none;
        color: white;
    }
`;

const AccessiblityLink = styled(Link)`
    text-decoration: none;
    color: white;
`;

const LoginLinks = styled(Link)`
    text-decoration: none;
    color: white;
    background-color: transparent;
    margin-left: 5px;
    margin-bottom: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: color 0.2s ease;
    font-size: 0.875rem;
    text-align: center;
    i{
        margin-right: 2px;
        color: white;
    }
    @media (min-width: 765px){
        margin-left: 10px;
        margin-bottom: 0;
    }
`;

const HedingContainer = styled.div`
    img{
        width: auto;
        height: 38px;
        padding: 0!important;
        margin: 0px 10px -10px 5px!important
    }
    span{
        font-size: 1.5rem;
    }
`;
const NavIconContainer = styled.button`
        height: 40px;
        width: 40px;
        border: none;
        outline: none;
        border-radius: 50%;
        position:relative;
        background: white;
        cursor: pointer;
    div{
        width: 40%;
        height: 2px;
        background-color: rgb(26, 115, 232);
        margin: auto;
        margin-bottom: 4px;
        border: none;
    }
    @media (min-width: 765px){
        display: none;
    }
`;
const HeadingAndNavCionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;
const OptionsContainer = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding:0;
    /* z-index: 999; */
    li{
        list-style-type: none;
         padding:0;
         margin-bottom: 10px;
         width:100%;
         font-size: 0.875rem;
         hr{
            border-top: 1px solid rgba(0,0,0,.1);
            background-color: hsla(0,0%,100%,.2);
         } 
    }
    @media (min-width: 765px){
        flex-direction: row;
        align-items:center;
        justify-content:center;
        margin-left: auto;
        order: 3;
        li{
            margin-left: 10px;
            margin-bottom:0;
            border-top: none;
            cursor: pointer;
        }
        hr{
           border: 0.5px solid;
            height: 10px;
        }
    }
`;
const SingingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    button{
        background-color: transparent;
        color: white;
        border: none;
        outline: none;
        cursor: pointer;
        margin-bottom: 1.25rem;
    }

    @media (min-width: 765px){
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-left: 2px;
        order:4;
        button{
            margin-bottom: 0;
        }
    }
`;
const GitLinkContainer = styled.div`
    text-align: center;
    color: white;
    p{
        font-size: 0.8rem;
    }
    hr{
        display: none;
    }
    @media (min-width: 765px){
        display: flex;
        justify-content: space-between;
        align-items: center;
        order: 2;
        margin-left: 20px;
        i,p{
            font-size: 0.9rem;
        }
        i{
            margin-left: 10px;
        }
        hr{
            display: block;
           border: 0.5px solid;
            height: 10px;
            margin-left: 10px;
        }
    }
`;