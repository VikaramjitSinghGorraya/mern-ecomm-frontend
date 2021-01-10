import React from 'react'
import RelatedProductsCards from './RelatedProductsCards'
import styled from 'styled-components'

const Order = ({address, amount, status, orderId, product}) =>{


    const showOrderDetails = () =>{
        return(
                <AddressAndDetailsContainer>
                    <DetailsContainer>
                        <span>ORDER DETAILS</span>
                        <table>
                            <tr>
                                <th><i className = 'fa fa-id-badge'/> Id</th>
                                <td>{orderId}</td>
                            </tr>
                            <tr>
                                <th><i className = 'fa fa-angle-double-right'/> Status</th>
                                <td>{status}</td>
                            </tr>
                            <tr>
                                <th> <i className = 'fa fa-dollar'/> Price</th>
                                <td>{amount}</td>
                            </tr>
                        </table>
                    </DetailsContainer>
                    <AddressContainer>
                        <span>ADDRESS</span>
                        <p>{address}</p>
                    </AddressContainer>
                </AddressAndDetailsContainer>
        )
    }

    const showProductsOrdered = () =>{
        return(
        <ProductsOuterContainer>
            <span>PRODUCTS</span>
            <ProductsContainer>
                {product.map((item, index) => (
                <Product>
                     <RelatedProductsCards key = {index} product = {item}/>
                </Product>
            ))}
            </ProductsContainer>
        </ProductsOuterContainer>
)}

    return (
        <OuterContainer>
            {showOrderDetails()}
            {showProductsOrdered()}
        </OuterContainer>
    )
}

export default Order

const OuterContainer = styled.div`
    margin: 30px auto 70px auto;
    border: 1px solid rgb(26, 115, 232);
    padding: 0 0.5rem 0.5rem 0.5rem;
    border-radius: 10px;
    color: rgb(26, 115, 232);
    span{
        font-size: 1.1rem;
        font-weight: 700;
    }
`;
const AddressAndDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top:1.1rem;
    @media (min-width: 775px){
        flex-direction: row;
        justify-content: space-between;
        margin-top:2rem;
        p{
            font-size:1.25rem;
        }
    }
`;
const AddressContainer = styled.div`
    margin-top: 2rem;
    p{
        font-size: 0.875rem;
    }
    @media (min-width: 775px){
        margin:0;
    }
`;
const DetailsContainer = styled.div`
    text-align: left;
    font-size: 0.875rem;
    border-bottom: 1px solid rgb(26, 115, 232);
    padding: 0.5rem 0;
    table{
        margin-top: 1.1rem;
    }
    th,td{
        padding:0.5rem 0rem;
    }
    i{
        margin-right: 1px
    }
    @media (min-width:775px){
        font-size: 1rem;
       border: none;
    padding:0;
    }
`;
const ProductsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: auto;
    ::-webkit-scrollbar{
        height: 1.5px;
    }
    ::-webkit-scrollbar-track-piece:start {
        margin-left: 1.25rem; 
    }
`;
const ProductsOuterContainer = styled.div`
    border-top: 1px solid rgb(26, 115, 232);
    padding: 1.8rem 0 0 0;
`;
const Product = styled.div``;