import React,{useState, useEffect} from 'react'
import {getBraintreeClientToken, processPayment, createOrder} from './ApiCore'
import {totalPrice, totalQuantity, emptyCart} from './CartHelpers'
import styled from 'styled-components'
import StripeCheckout from 'react-stripe-checkout'
import  { Redirect } from 'react-router-dom'

const Checkout = ({ products, setRun = f => f, run = undefined }) =>{
    
    var token, userId

    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        addressLine: '',
        ZipCode: 0,
        state: ''
    });

    if(sessionStorage.getItem('token')){
        userId = JSON.parse(sessionStorage.getItem('token')).user._id
        
    }

    
    const buy = (token) => {
        const body = {
            token}
       processPayment(userId, token, body)
                    .then(response => {
                       
                        const createOrderData = {
                            products: products,
                            amount: totalPrice(),
                            address: response.address_line1 +', '+response.address_city + ', ' + response.address_state+', '+response.address_zip
                        }

                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                    console.log('payment success and empty cart');
                                    setData({
                                        loading: false,
                                        success: true
                                    });
                                    if(localStorage.getItem('cart')){
                                        localStorage.removeItem('cart')
                                        window.location.reload()
                                    }
                                    
                                })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
         
    };


    const showDropin = () =>(
            
            <CheckOutAndAddressContainer>
                {/* <AddressContainer>
                    {/* <div>
                        <label>Address Line 1</label>
                        <input name = 'addressLine' placeholder = 'Address line 1 here...' type = 'text' value = {data.addressLine} onChange = {handleAddress} required/>
                    </div>
                    
                    <div>
                        <label>State</label>
                        <input name = 'state' placeholder = 'Your stete here...' type = 'text' value = {data.state} onChange = {handleAddress} required/>
                    </div>
                    
                    <div>
                        <label>Zipcode</label>
                        <input name = 'zipcode' placeholder = 'Your zip code here...' type = 'number' min = '1' value = {data.ZipCode} onChange = {handleAddress} required/>
                    </div> */}
                {/* </AddressContainer> */} 
                <CheckoutContainer >
                    {products.length >= 1 ?
                        <StripeCheckout
                        token={buy}
                        stripeKey= {process.env.REACT_APP_STRIPE_KEY}
                        shippingAddress
                        amount = {totalPrice() * 100}
                      >
                    <button >
                        Pay
                    </button>
                      </StripeCheckout>
                            :
                            null
                    }
                </CheckoutContainer>
            </CheckOutAndAddressContainer>
        )
                    
    
    return (
        <div>
            {products.length >=1 && showDropin()}
        </div>
    )
}

export default Checkout

const CheckOutAndAddressContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-items:center;
    align-items: center;
    position: relative;
    /* top:0;
    bottom:0;
    left:0;
    right:0; */
    /* z-index:-1; */
    button{
        border: 1px solid rgb(26, 115, 232) !important;
        border-radius: 10px !important;
        height: 30px !important;
        width:100% !important;
        margin-top: 10px !important;
        color: rgb(26, 115, 232) !important;
        background-color: white !important;
        outline: none !important;
        &:hover{
            color: white !important;
            background-color: rgb(26, 115, 232) !important;
            cursor: pointer !important;
        }
    }
`;
const AddressContainer = styled.div`
    
    border: 1px solid rgb(26, 115, 232);
    border-radius: 10px;
    padding: 1.25rem;

    div{
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
    label{
        border: none;
        margin-bottom: 20px;
    }
    input{
        border: none;
        outline: none;
        border-bottom: 1px solid rgb(26, 115, 232);
        ::placeholder{
            color: rgb(26, 115, 232);
        }
    }
`;
const CheckoutContainer = styled.div`
`;
