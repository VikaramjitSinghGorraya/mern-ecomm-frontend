import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton';
import {addItem, editItem, removeItem} from '../core/CartHelpers'
import {Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';

const Card = ({
    product,
    border,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined
    }) =>{

    const [loading, setLoading] = useState(true)
    const [stockStatus, setStockStatus] = useState(false)
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    useEffect(() => (
        product.quantity <= 0 ? setStockStatus(true) : setStockStatus(false),
        setTimeout(() => {
           setLoading(false)
        },1000)
    ),[])

    const handleChange = productId => event => {
        setRun(!run)
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if (event.target.value >= 1) {
          editItem(productId, event.target.value)
        }}

    const displaySkeleton = () =>{
      return(
              <Skeleton width='20rem' height='30rem' style = {{marginRight:'20px'}}/>
      )
    }

    const shouldRedirect = redirect => {
        if (redirect) {
          return <Redirect to="/cart" />;
        }}

      const addToCart = () => {
        addItem(product, setRedirect(true));
      };

    const displayCard = () =>{
        return (
            <Carrd border ={border}>
                {shouldRedirect(redirect)}
                <ImageAndDescription>
                    <ImageDiv>
                        <img src = {'https://myecommstore.herokuapp.com/api/product/photo/'+`${product._id}`} alt='img'/>
                    </ImageDiv>
                    <DescriptionDiv>
                        <p>{product.description.substring(0,15)}...</p>
                        <p>${product.price}/-</p>
                        {product.quantity <= 0 ? <OutOfStockSpan>OUT OF STOCK</OutOfStockSpan> : <InStockSpan>IN STOCK</InStockSpan>}
                    </DescriptionDiv>
                </ImageAndDescription>
           <hr/>
                <ButtonsContainer>
                    <ViewLink to = {'product/'+`${product._id}`}><i className = 'fa fa-arrows-alt' />VIEW</ViewLink>
                    {showAddToCartButton && <AddToCartButton disabled = {stockStatus} onClick = {addToCart}><i className = 'fa fa-cart-plus'/> Add To Cart</AddToCartButton>}
                    {showRemoveProductButton &&  <RemoveFromCartButton onClick={() => {removeItem(product._id); setRun(!run);}}><i className = 'fa fa-trash'/></RemoveFromCartButton>}
                    {cartUpdate && <span>QTY</span>}
                    {cartUpdate &&  <UpdateCartButton><input type = 'number' min = '0' value={count} onChange={handleChange(product._id)}/></UpdateCartButton>}
                </ButtonsContainer>
            </Carrd>)
}


return (
    <>
    {loading && displaySkeleton()}
    {!loading && displayCard()}
    </>
)
}

export default Card

const Carrd = styled.div`
    border: ${props => props.border ? props.border : '1px solid rgb(26, 115, 232)'};
    width: 20rem;
    height: 30rem;
    padding: 1.25rem;
    margin: 0 1.25rem 1.1rem 1.25rem;
    border-radius: 10px;
    hr{
        width: 95%;
        border-top: 1px solid rgb(26, 115, 232);
        border-bottom: none;
    }

    @media (max-width: 775px){
        min-width: 16rem;
        max-height: 20rem;
        width: 16rem;
        margin: 1.25rem 1.25rem;
    }
`;

const ImageAndDescription = styled.div`
 display: flex;
 flex-direction: column;
`;
const ImageDiv = styled.div`
margin: auto;
text-align: center;
    img{
        width: 18rem;
        height: 18rem;
    }
@media (max-width: 775px){
    img{
        width: auto;
        height: 8rem;
    }
}
`;
const DescriptionDiv = styled.div`
    text-align: center;
    color: rgb(26, 115, 232);
    p{
        margin:0;
        margin-bottom: 10px;
    }
`;
const ViewLink = styled(Link)`
    text-align: center;
        border-radius: 50px;
        background-color: rgb(26, 115, 232); 
        text-decoration: none;
        padding: 0.3em 0.6em;
        color: white;
        :hover{
            background-color: lightskyblue;
        }
        @media (max-width: 775px){
            font-size: 70%;
            padding: 5px 18px;
    }
`;
const ButtonsContainer = styled.div`
    display: flex;
    justify-content:space-around;
    align-items: center;
    margin-top: 20px;
    span{
       
        text-align: center;
        padding: .12rem .4rem;
        font-size: 80%;
        background-color: rgb(26, 115, 232);
        border-radius: 10px;
        color: white;
    }
    /* a{
        text-align: center;
        border-radius: 50px;
        background-color: rgb(26, 115, 232); 
        text-decoration: none;
        padding: 0.3em 0.6em;
        color: white;
        :hover{
            background-color: lightskyblue;
        }
    } */
    i{
        margin-right: 5px;
    }

    @media (max-width: 775px){
        justify-content: center;
        button{
            font-size: 70%;
            margin-left: 10px;
        }
        /* a{
            font-size: 70%;
            padding: 5px 18px;
        } */
    }
`;
const InStockSpan = styled.span`
    background-color: rgb(26, 115, 232);
    color: white;
    border-radius: 10px;
    padding: 0 0.5rem;
`;
const OutOfStockSpan = styled.span`
    background-color: red;
    color: white;
    border-radius: 10px;
    padding: 0 0.5rem;
`;
const AddToCartButton = styled.button`
    background-color: rgb(26, 115, 232);
    color: white;
    border-radius: 20px;
    height: 30px;
    border: none;
    /* width:135px; */
    outline: none;
    font-size: 1.1rem;
    :hover{
            background-color: lightskyblue;
        }
    cursor: pointer;
`;
const RemoveFromCartButton = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    i{
        font-size: 1.75rem;
        color: red;
        cursor: pointer;
    }
`;

const UpdateCartButton = styled.button`
border: none;
outline: none;
background-color: transparent;
text-align: center;
    input{
        width: 70px;
        border-radius: 5px;
        outline: none;
        border: 1px solid rgb(26, 115, 232);
        color: rgb(26, 115, 232);
        margin: auto;
    }
`;