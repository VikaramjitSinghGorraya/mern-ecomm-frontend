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
                    <CardInfoContainer>
                        <CardHeadingAndIcon>
                            <p>Demo Credit Card</p><i class="fa fa-credit-card"></i>
                        </CardHeadingAndIcon>
                        <CardNumber>
                            <p class="">4111 1111 1111 1111</p>
                        </CardNumber>
                        < ExpiryAndCVV>
                            <div>
                                <span>exp date</span>
                                <p class="exp-date">11/22</p>
                            </div>
                            <div class="cvv-no">
                                <span>CVV</span>
                                <p class="">123</p>
                            </div>
                        </ ExpiryAndCVV>
                    </CardInfoContainer>
                    {/* <CardInfoContainer>
                        Note: - Use number 4242424242424242 for card, any 3 digit for CVV and future date for expiry date.
                    </CardInfoContainer> */}
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
        width:20rem !important;
        margin-top: 10px !important;
        color: rgb(26, 115, 232) !important;
        background-color: white !important;
        outline: none !important;
        &:hover{
            color: white !important;
            background-color: rgb(26, 115, 232) !important;
            cursor: pointer !important;
        }
        /* @media (max-width: 775px){
            width:15rem !important;
        } */
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
const CardInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid rgb(26, 115, 232);
    border-radius: 10px;
    background:linear-gradient(152deg, #004efe 0%, #00acfe 60%, #68ceff 100%);
    padding: 0 3rem;
`;
const CardHeadingAndIcon = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
`;
const CardNumber = styled.div`
    text-transform: uppercase;
    font-weight: 700;
    font-size: 130%;
    text-shadow: 2px 2px 5px rgb(0 0 0 / 40%);
    color: white;
`;
const ExpiryAndCVV = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;
`;
