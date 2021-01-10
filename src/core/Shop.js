import React, {useEffect, useState} from 'react'
import Layout from '../layout/Layout'
import CheckBoxes from './CheckBoxes'
import Card from './Card'
import axios from 'axios'
import styled from 'styled-components'
import {getCategory, getProducts} from './ApiCore'

const Shop = () =>{
    
    const [myFilters, setMyFilters] = useState({
        filters: { category: []}
    });
    const [filteredResults, setFilteredResults] = useState([]);
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [searchBarData, setSearchBarData] = useState({
        search: ''
    })

    const getCategories = () =>{
        getCategory()
        .then(data => setCategories(data))
        .catch(data => console.log(data))
    }

    const getProduct = () =>{
       getProducts()
            .then(data => setProducts(data))
            .catch(data => console.log(data))
    }

    useEffect(() =>{
       getCategories()
        getProduct()
    }, [])

    const loadProductsBySearchedName = (e) =>{
        e.preventDefault()
        axios.post('https://myecommstore.herokuapp.com/api/products/search', searchBarData)
            .then(res => setFilteredResults(res.data.data))
            .catch(err => console.log(err))
    }

    const loadFilteredResults = filters => {
        const data = {filters}
        if(data.filters){
            axios.post('https://myecommstore.herokuapp.com/api/products/by/search', data)
            .then(res =>{
                setFilteredResults( res.data.data)
            } )
            .catch(err => console.log(err))
        }
    };

    const displayContainer = () =>{
        document.getElementById('container').style.height === '' || document.getElementById('container').style.height === '0px' ? document.getElementById('container').style.height ='320px' : document.getElementById('container').style.height ='0px'
    }
    
    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const changeHandler = (e) =>{
        setSearchBarData({...searchBarData, [e.target.name] : e.target.value})
    }


    return (
            <>
                <Layout title = 'The Shop' description = 'Find the perfrct product' icon = 'fa fa-shopping-bag'/>
                <OuterContainer>
                    <FilterButtonContainer>
                        <button onClick = {()=>displayContainer()}><i className='fa fa-filter'/> FILTERS</button>
                    </FilterButtonContainer>

                    <FiltersContainer id = 'container'>
                        <SearchOptionsContainer>
                            <div><span>SEARCH BY CATEGORIES</span></div>
                            <SearchByCategoryContainer>
                                <CheckBoxes categories = {categories}  handleFilters={filters =>handleFilters(filters, "category")}/>
                            </SearchByCategoryContainer>
                            <hr/>
                            <div><span>SEARCH BY NAME</span></div>
                            <SearchByNameContainer>
                                <form onSubmit = {loadProductsBySearchedName}>
                                    <input  required name = 'search' type = 'search' onChange = {changeHandler} placeholder = 'Enter name of product here...'/>
                                    <button > SEARCH</button>
                                </form>
                            </SearchByNameContainer>   
                        </SearchOptionsContainer>
                    </FiltersContainer>
                    <SearchResults>
                        {filteredResults.length === 0 && products.map((product, index) =>(
                                <Card border = 'none' key = {index} product = {product}/>
                            ))}
                            { filteredResults.length!==0 && filteredResults.map((product, index) =>(
                                    <Card  border = 'none' key = {index} product = {product}/>
                            ))}
                    
                    </SearchResults>
            </OuterContainer>
        </>
    )
}

export default Shop

const OuterContainer = styled.div`
    width: 90%;
    margin: 50px auto 100px auto;
`;
const FilterButtonContainer = styled.div`
    margin-bottom: 10px;
    button{
        border: 1px solid rgb(26, 115, 232);
        border-radius: 10px;
        outline: none;
        color: rgb(26, 115, 232);
        background-color: white;
        height: 30px;
        width:90px;
        &:hover{
            color: white;
            background-color: rgb(26, 115, 232);
            cursor: pointer;
        }
    }
`;
const FiltersContainer = styled.div`
    transition: all 550ms;
    position: relative;
    overflow: hidden;
    height:0px;
   @media (max-width: 775px){
       width: 95%;
    margin: 0 auto 20px auto;
   }
`;
const SearchOptionsContainer = styled.div`
    display: grid;
    grid-template-columns: 100%;
    border: 1px solid blue;
    border-radius: 8px;
    padding: 1.1rem;
    color: rgb(26, 115, 232);
    hr{
        border-top: 1px solid rgb(26, 115, 232);
        border-bottom: none;
    }
    span{
        padding: 1.1rem;
    }
`;

const SearchByCategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5,20%);
    justify-content: space-between;
    align-items:center;

    @media (max-width: 775px){
        grid-template-columns: 30% 30% 30%;
        justify-content: start;
    }
`;
const SearchByNameContainer = styled.div`
   display: flex;
   justify-content: flex-start;
    form{
            display: flex;
            margin: 1.1rem;
            width: 100%;

            input, button{
                height: 45px;
            }
            input{
                width: 80%;
                padding:  0 1.15rem;
                border: 1px solid rgb(26, 115, 232);
                color: rgb(26, 115, 232);
                outline: none;
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
                ::placeholder{
                    color: rgb(26, 115, 232);
                }
            }

            button{
                width: 100px;
                background-color: rgb(26, 115, 232);
                color: white;
                border: 1px solid rgb(26, 115, 232);
                cursor: pointer;
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
                outline: none;
                :hover{
                    background-color: white;
                    color: rgb(26, 115, 232);
                }
            }
    }
`;

const SearchResults = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    @media (max-width: 775px){
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    /* padding: 1.25rem; */
`;

