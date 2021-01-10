import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
const SearchBar = () =>{
    return (
        <OuterContainer >
            <ShopLink to = '/shop'>
            <button>
                <span>SEARCH MARKET PLACE</span>
                <i className = 'fa fa-search'/>
            </button>
            </ShopLink>
        </OuterContainer >
    )
}

export default SearchBar

const OuterContainer = styled.div`
    margin: 50px auto;
    text-align: center;
    button{
        width: 35%;
        height: 40px;
        border-radius: 50px;
        border: 1px solid rgb(26, 115, 232);
        outline: none;
        background-color: white;
        color: rgb(26, 115, 232);
        position: relative;
        cursor: pointer;
        :hover{
            background-color: rgb(26, 115, 232);
            color: white;
        }
        i{
            position: absolute;
            right:10px;
        }
    }

    @media (max-width: 775px){
        button{
            width: 90%;
        }
    }
`;

const ShopLink = styled(Link)`
    text-decoration: none;
    color: white;
`;