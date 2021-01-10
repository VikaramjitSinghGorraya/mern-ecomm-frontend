import React, {useState, useEffect} from 'react'
import {getProducts} from './ApiCore'
import Layout from '../layout/Layout'
import Card from './Card'
import SearchBar from './SearchBar'
import styled from 'styled-components'

const Home = () =>{

    const [productsBySale, setProductsBySale] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])

    const getProductsBySale = () =>{
        getProducts('sold')
        .then(data => setProductsBySale(data))
        .catch(data => console.log(data))
    }

    const getProductsByArrival = () =>{
        getProducts('createdAt')
        .then(data => setProductsByArrival(data))
        .catch(data => console.log(data))
    }

    useEffect(() =>{
            getProductsByArrival()
            getProductsBySale()
    }, [])

    const showProducts = () =>{
        return(
            <div>
                     <Layout title  = 'My Store' description = 'Yours To Explore' icon = 'fa fa-home'/>
            
            <div className = 'animate__animated animate__fadeIn animate__delay-900ms'>
            <SearchBar/>
            <NewArrivalsContainer >
                <p>NEW ARRIVALS</p>
                <CardContainer>
                    {productsByArrival.length > 0 && productsByArrival.map((product, index)=>(
                        <Card key = {index} product = {product}/>
                    ))}
                </CardContainer>
            </NewArrivalsContainer >
            <BestSellersContainer>
                <p>BEST SELLERS</p>
                <CardContainer>
                    {productsBySale.length >0 && productsBySale.map((product, index)=>(
                        <Card key ={index} product = {product}/>
                    ))}
                </CardContainer>
            </BestSellersContainer>
            </div>
            </div>
           
        )
    }
    return (
        <div>
            {productsByArrival.length > 0 && productsBySale.length > 0 && showProducts()}
            {productsByArrival.length <= 0 && productsBySale.length <= 0 &&  <i className="fa fa-spinner fa-pulse" style={{fontSize:"48px", color: "white"}}/>}

        </div>
    )
}

export default Home
const CardContainer = styled.div`
    padding: 1.25rem;
    overflow-x: auto;
    display: flex;
    margin: 0 auto;
    ::-webkit-scrollbar{
        height: 1.5px;
    }
    ::-webkit-scrollbar-track-piece:start {
        margin-left: 1.25rem; 
    }
    
`;

const NewArrivalsContainer = styled.div`
margin: 50px auto;
  p{
      padding-left: 1.25rem;
      margin:0;
      color: rgb(26, 115, 232);
  }  
`;

const BestSellersContainer  = styled.div`
margin: 50px auto 100px auto;
     p{
      padding-left: 1.25rem;
      margin:0;
      color: rgb(26, 115, 232);
  }
`;
