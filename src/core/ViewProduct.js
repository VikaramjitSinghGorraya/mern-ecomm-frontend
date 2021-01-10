import React, {useEffect, useState} from 'react'
import Layout from '../layout/Layout'
import RelatedProductsCards from '../core/RelatedProductsCards'
import {addItem} from './CartHelpers'
import {read, listRelated} from './ApiCore'
import {Redirect } from 'react-router-dom';
import styled from 'styled-components';

const ViewProduct = (props) =>{
    var productId = props.match.params.productId
    const [productDetails, setProductDetails] = useState([])
    const [relatedProductDetails, setRelatedProductDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [redirect, setRedirect] = useState(false);

    const getProductDetails = () =>{
        read(props.match.params.productId)
        .then(data => setProductDetails(data))
        .catch(data => console.log(data))
    }

    const getRealtedProducts = () =>{
        listRelated(props.match.params.productId)
        .then(data => setRelatedProductDetails(data))
        .catch(data => console.log(data))
       
    }

    const addToCart = () => {
        addItem(productDetails, setRedirect(true));
      };

      const shouldRedirect = redirect => {
        if (redirect) {
          return <Redirect to="/cart" />;
        }
      }
    useEffect(() =>{
        getProductDetails()
        getRealtedProducts()
        setTimeout(()=>{
            setLoading(false)
        },900)
    }, [])
    return (
        <>
        {shouldRedirect(redirect)}
            <Layout title = {productDetails.name} description = {productDetails.description} icon = 'fa fa-shopping-basket'/>
            <OuterContainer className = 'animate__animated animate__fadeIn'>
                <CurrentProudctContainer>
                    <ImageContainer>
                        <img src = {`https://myecommstore.herokuapp.com/api/product/photo/${productId}`} alt = 'product'/>
                    </ImageContainer>
                    <hr/>
                    <DetailsContainer>
                        <h4>{productDetails.name}</h4>
                        <p>{productDetails.description}</p>
                        <div>
                            <p>${productDetails.price}</p>
                            <p>SOLD:{productDetails.sold}</p>
                        </div>
                        <button onClick = {addToCart}>
                            < i className = 'fa fa-cart-plus'/>
                            ADD To CART
                        </button>
                    </DetailsContainer>
                </CurrentProudctContainer>
                
                <RelatedProductsCotaier>
                <span>RELATED PRODUCTS</span>
                    {relatedProductDetails.length === 0 && !loading && <p> No Products Foud</p>}
                    {relatedProductDetails.map((product, index) =>(
                        <RelatedProductsCards index = {index} product = {product}/>
                    ))}
                </RelatedProductsCotaier>
            </OuterContainer>
        </>
    )
}

export default ViewProduct

const OuterContainer = styled.div`
    width: 90%;
    margin: 50px auto 100px auto;
    color:rgb(26, 115, 232);

    @media (min-width: 775px){
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
`;
const CurrentProudctContainer = styled.div`
    margin: 0 auto; 
    padding: 1.25rem;
    text-align: center;
    hr{
        border-top: 1px solid rgb(26, 115, 232);
        border-bottom: none;
        height: 1.5px;
    }
`;
const ImageContainer = styled.div`
    padding: 0 1.25rem;
    img{
        height: 40vh;
    }
`;
const DetailsContainer = styled.div`
    text-align: center;
    h4,p{
        margin:0;
        margin-bottom: 10px;
    }
    h4{
        font-size: 2rem;
        font-weight: 400;
    }
    p{
        font-size: 1.2rem;
        font-weight: 400;
    }
    div{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    button{
        width: 100%;
        height: 45px;
        border-radius: 50px;
        border: 1px solid rgb(26, 115, 232);
        color: rgb(26, 115, 232);
        background-color: white;
        outline: none;
        :hover{
            color: white;
            background-color: rgb(26, 115, 232);
            cursor: pointer;
        }
        i{
            margin-right: 5px;
        }
    }

    @media (max-width: 775px){
        h4{
        font-size: 1.3rem;
    }
    p{
        font-size: 0.875rem;
    }
    }
`;
const RelatedProductsCotaier = styled.div`
    overflow-x: auto;
    display: flex;
    align-items: flex-start;
    padding: 0 1.25rem;
    
    ::-webkit-scrollbar{
        height: 1.1px;
    }
    color: rgb(26, 115, 232);
    span{
        display: none;
    }
    
    @media (min-width:775px){
        span{
        display: block;
    }
        flex-direction: column;
        border-left: 1px solid rgb(26, 115, 232);
    }

`;