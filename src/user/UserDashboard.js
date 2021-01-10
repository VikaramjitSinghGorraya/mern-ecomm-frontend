import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Layout from '../layout/Layout'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {getOrders} from '../core/ApiCore'
import Order from '../core/Order'
import {Link} from 'react-router-dom'
const UserDashboard = (props) =>{
    const [userData, setUserData] = useState({
        name: '',
        email:'',
        role: 'Registered User'
    })

    const [orderData, setOrderData] =  useState([])
    const [orderedProductData, setOrderedProductData] = useState([])
    const getToken = () =>{
        if(sessionStorage.getItem('token')){
            axios.get(`http://localhost:4000/api/user/${props.match.params.userId}`, { headers: { "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token')).token}` } })
                .then(res => setUserData({...userData, name: res.data.name, email: res.data.email }) )
                .catch(err => console.log(err))
        }
    }

    const getOrdersInformation = (id) =>{
        getOrders(id)
        .then(res => setOrderData(res))
        .catch(err => console.log(err))
    }
    useEffect(() =>(
        getToken(),
        getOrdersInformation(props.match.params.userId)
    ),[])

    const displayUserInfo = () =>{
        return(
            <>
                <Layout title = 'Dashboard' description = {`Hi ${userData.name}`} icon= 'fa fa-hand-peace-o'/>
                <OuterContainer className = 'animate__animated animate__fadeIn'>
                    <UserContainer>
                        <Heading>
                            <p>User Information</p>
                            <UserUpdateLink to = {`/userdashboard/update/${props.match.params.userId}`}><i className = 'fa fa-edit'/>Edit</UserUpdateLink>
                        </Heading>
                        <hr/>
                        <table>
                            <tr>
                                <th>Name</th>
                                <td>{userData.name}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{userData.email}</td>
                            </tr>
                            <tr>
                                <th>Role</th>
                                <td>{userData.role}</td>
                            </tr>
                        </table> 
                    </UserContainer>
                <hr/>
                    <div style = {{margin:'auto'}}>
                        <p>Purchase History</p>
                    </div>
                    <PurchaeHistoryContainer>
                        {
                            orderData.length > 0 
                            ?
                                orderData.map((order, index) =>(
                                    <div>
                                        <Order key = {index} address = {order.address} amount = {order.amount} status = {order.status} username = {userData.name} userId = {order.user._id} orderId = {order._id} serialNumber = {index} product = {order.products} />
                                    </div>
                                ))
                            :
                            <NoPurchaseDiv><i className = 'fa fa-exclamation-circle'/> No Purchases Made Yet !</NoPurchaseDiv>
                        }
                    </PurchaeHistoryContainer>
                </OuterContainer>
            </>
        )
    }
    return (
        sessionStorage.getItem('token') ? displayUserInfo() : <Redirect to = {{pathname: '/signin'}}/>
    )}

export default UserDashboard

const OuterContainer = styled.div`
    width: 90%;
    margin: 50px auto;
    color: rgb(26, 115, 232);
    hr{
        width: 95%;
        border-top: 1px solid rgb(26, 115, 232);
        border-bottom: none;
    }
`;

const PurchaeHistoryContainer = styled.div`
    min-height: 10rem;
`;
const NoPurchaseDiv = styled.div`
    text-align: center;
    font-size:1.2rem;
    font-weight: 600; 
    color: rgb(26, 115, 232);
`;
const UserContainer = styled.div`
   margin-bottom: 10px;
    min-height: 15rem;
    border: 1px solid rgb(26, 115, 232);
    border-radius: 10px;
     table{
         
         border-collapse: collapse;
         width: 95%;
         margin: auto;
     }
     td,th{
         padding: 0.75rem;
     }
     color: rgb(26, 115, 232);
     tr:nth-child(odd) {background-color: rgb(26, 115, 232); color: white;}
`;
const Heading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    margin: auto;
    i{
        font-size: 1.2rem;
    }
`;
const UserUpdateLink = styled(Link)`
    font-size: 1.2rem;
    text-decoration: none;
    color: rgb(26, 115, 232);
`;
