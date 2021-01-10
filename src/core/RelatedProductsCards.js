import React, {useEffect} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
const RelatedProductsCards = ({product}) =>{
    const showRelatedProduct = () =>{
        return(
            <div>
                <p>{product.name}</p>
                <p>${product.price}</p>    
            </div>
        )
    }

    
    return (
            <Card>
                <ImageContainer>
                    <img src = {`https://myecommstore.herokuapp.com/api/product/photo/${product._id}`}/>
                </ImageContainer>
                <DescriptionContainer>
                    {showRelatedProduct()}
                    < ViewLink to = {'/product/'+`${product._id}`}><i className = 'fa fa-arrows-alt' />VIEW</ ViewLink>
                </DescriptionContainer>
            </Card>
    )
}

export default RelatedProductsCards
const Card = styled.div`
    display: flex;
    margin-right: 2rem;
    padding: 1rem 0;
    color:rgb(26, 115, 232);

    @media (min-width: 775px){
        flex-direction: column;
        margin-bottom: 50px;
    }
`;
const ImageContainer = styled.div`
    img{
        height: 110px;
        width: auto;
    }
`;
const ViewLink = styled(Link)`
     padding: 5px 15px;
        text-align: center;
        border-radius: 50px;
        background-color: rgb(26, 115, 232); 
        text-decoration: none;
        color: white;
        :hover{
            background-color: lightskyblue;
        }
        @media (max-width: 775px){
            padding: 5px 8px;
            font-size: 70%;
    }
`;
const DescriptionContainer = styled.div`
    p{
        margin: 0px;
    }

    div{
        margin-bottom: 20px;
    }
    /* a{
        padding: 5px 15px;
        text-align: center;
        border-radius: 50px;
        background-color: rgb(26, 115, 232); 
        text-decoration: none;
        color: white;
        :hover{
            background-color: lightskyblue;
        }
        i{
            margin-right: 5px;
        } */
    
    @media (max-width: 775px){
        margin-left: 0.475rem;
        /* a{
            padding: 5px 8px;
            font-size: 70%;
        } */
    }
    
`;
