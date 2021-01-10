import React, {useState, useEffect} from 'react'
import { getCart, totalQuantity, totalPrice} from '../core/CartHelpers';
import styled from 'styled-components'
import Layout from '../layout/Layout'
import Card from './Card'
import Checkout from '../core/Checkout'
import { Link } from 'react-router-dom';


const Cart = () =>{

    const [items, setItems] = useState([])
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run])

    const showItems = (items) => {
        return (
            <ShowItemsContainer>
                
                {items.map((product, index) => (
                    <div>
                    <Card
                        key={index}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                    </div>
                ))}
               
            </ShowItemsContainer>
        );
    };

   
    const cartSummary = (items) =>{
        return(
            <div>
            <SummaryTable className = 'animate__animated animate__fadeIn'>
                <p>Cart Summary</p>
                <table>
                    <tr>
                        <th>Products</th>
                        <th>Total Quantity</th>
                        <th>Total Price</th>
                    </tr>
                    <tr>
                        <td>{items.length} item</td>
                        <td>{totalQuantity()} unit</td>
                        <td>{totalPrice()}</td>
                    </tr>
                </table>
                {sessionStorage.getItem('token') &&  <Checkout products = {items} setRun={setRun} run={run} /> } 
                {!sessionStorage.getItem('token') && <SignupLink to ='/signup'><button>SIGNUP TO CHECKOUT</button></SignupLink>}
            </SummaryTable> 
            </div>
        )
    }
    const emptyShoppingCartScreen = () =>{
        return(
            <EmptyCartContainer>
                <EmptyShoppingCartIconContainer>
                    <p>
                    <i className = 'fa fa-shopping-cart'/>
                    </p>
                </EmptyShoppingCartIconContainer>
                <EmptyShoppingCartMessageContainer>
                    <p>
                    There is nothing in your cart yet! No worries, lets go ahead and add some
                    </p>
                  <ShopLink to = '/shop'>
                  <button> LET'S GO SHOPPING</button>
                  </ShopLink>
                </EmptyShoppingCartMessageContainer>
            </EmptyCartContainer>
        )
    }

    const showCartItems = () =>{
    return (
            <CartInformationContainer>
                
                {items.length > 0 && cartSummary(items)}
                   
                {items.length > 0 && showItems(items) } 
            </CartInformationContainer>
        )
    }
    return (
        <>
            <Layout title = 'Your Cart' description = 'Where wishes come true' icon = 'fa fa-shopping-cart'/>
            <OuterContainer>
            {items.length > 0 ? showCartItems() : emptyShoppingCartScreen()}
            </OuterContainer>
        </>
    )
}

export default Cart

const OuterContainer = styled.div` 
   width: 100%;
    margin: 50px auto 100px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
`;

const CartInformationContainer = styled.div`
    width: 90%;
    margin: 50px auto;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
`;
const ShowItemsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 47%);
    justify-content: space-between;
    align-items: center;

    @media (max-width: 775px){
        grid-template-columns: repeat(1, 100%);
        justify-content: center;
        align-items: center;
    }
`;
const SummaryTable = styled.div`
    margin: 10px auto;
    table{
         border-collapse: collapse;
     }
     tr{
        border-top: 1px solid rgb(26, 115, 232);
     }
     td,th{
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid rgb(26, 115, 232);
     }
     color: rgb(26, 115, 232);
     button {
        border: 1px solid rgb(26, 115, 232);
        border-radius: 10px;
        height: 30px;
        width:100%;
        margin: 10px auto 10px auto;
        color: rgb(26, 115, 232);
        background-color: white;
        outline: none;
        &:hover{
            color: white;
            background-color: rgb(26, 115, 232);
            cursor: pointer;
     }
     }
`;
const SignupLink = styled(Link)`
    text-decoration: none;
    color: white;
`;

const ShopLink = styled(Link)`
    text-decoration: none;
    color: white;
`;
const EmptyCartContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const EmptyShoppingCartIconContainer = styled.div`
    i{
        font-size: 5rem;
        color: rgb(26, 115, 232);
    }
`;
const EmptyShoppingCartMessageContainer = styled.div`
    text-align: center;
    padding: 0 3.25rem;
    p{
        font-size: 5rem;
        color: rgb(26, 115, 232);
        margin:0;
    }
    @media (max-width: 775px){
        padding: 0 1.25rem;
        p{
        font-size: 2rem;
        color: rgb(26, 115, 232);
        margin:0;
    }
    }
    button{
        border: 1px solid rgb(26, 115, 232);
        border-radius: 20px;
        height: 40px;
        width:200px;
        margin-top: 10px;
        color: rgb(26, 115, 232);
        background-color: white;
        outline: none;
        &:hover{
            color: white;
            background-color: rgb(26, 115, 232);
            cursor: pointer;
        }
    }
`;
