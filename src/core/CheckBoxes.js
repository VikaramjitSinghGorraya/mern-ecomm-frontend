import React, {useState} from 'react'
import styled from 'styled-components'

const CheckBoxes = ({ categories, handleFilters }) =>{

    const [checked, setCheked] = useState([]);

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];

        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        
        setCheked(newCheckedCategoryId);
        console.log(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId);
    };

    return (
        <>
            {categories.map((category, index) =>(
                <CheckboxContainer key = {index}>
                    <input onChange = {handleToggle(category._id)} name = {category.name} type = 'checkbox' value = {checked.indexOf(category._id === -1)} />
                    <label>{category.name}</label>
                </CheckboxContainer>
            ))}
        </>
    )
}

export default CheckBoxes
const CheckboxContainer = styled.div`
        margin: 1.2rem;
        display: flex;
        align-items: center;
        label{
            margin-left: 0.12rem;
            font-size: 90%;
        }
`;
