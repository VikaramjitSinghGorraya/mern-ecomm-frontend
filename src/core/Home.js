import React, {useState, useEffect} from 'react'
import {getProducts} from './ApiCore'
import Layout from '../layout/Layout'
import Card from './Card'
import SearchBar from './SearchBar'
import styled from 'styled-components'
import Menu from '../layout/Menu'
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
        setTimeout(() =>(
            getProductsByArrival(),
            getProductsBySale()
        ),1000)
          
    }, [])
    const showSipnner = () =>{
        return(
            <SpinnerContainer>
                 {/* <SpinnerIcon className = 'fa fa-circle-o-notch fa-spin'/> */}
            </SpinnerContainer>
        )
    }
    const showProducts = () =>{
        return(
            <div>
                <Layout title  = 'My Store' description = 'Yours To Explore' icon = 'fa fa-home'/>
            <div className = 'animate__animated animate__fadeInUp animate__delay-900ms'>
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
            <Menu/>
            </div>
           
        )
    }
    return (
        <OuterContainer >
            {productsByArrival.length > 0 && productsBySale.length > 0 && showProducts()}
            {productsByArrival.length <= 0 && productsBySale.length <= 0 && showSipnner()}
        </OuterContainer >
    )
}

export default Home
const OuterContainer = styled.div`
    min-height: 100%;
    position: relative;
`;
const CardContainer = styled.div`
    padding: 1.25rem 0;
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

const SpinnerIcon = styled.i`
    /* color: rgb(26, 115, 232);
    font-size: 42px;
 border: 1px solid; */
  
`;
const SpinnerContainer = styled.div`
    position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 50 50'%3E%3Cpath d='M28.43 6.378C18.27 4.586 8.58 11.37 6.788 21.533c-1.791 10.161 4.994 19.851 15.155 21.643l.707-4.006C14.7 37.768 9.392 30.189 10.794 22.24c1.401-7.95 8.981-13.258 16.93-11.856l.707-4.006z'%3E%3CanimateTransform attributeType='xml' attributeName='transform' type='rotate' from='0 25 25' to='360 25 25' dur='0.6s' repeatCount='indefinite'/%3E%3C/path%3E%3C/svg%3E") center / 50px no-repeat;

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
