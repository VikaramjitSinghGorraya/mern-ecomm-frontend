import React from 'react'
import styled from 'styled-components'

const Layout = ({title, description, icon}) => {
    return (
        <OuterContainer>
            <TitleAndDescription>
                <h3>{title}</h3>
                <p>{description}</p>
            </TitleAndDescription>
            <Icon>
            <i className = {icon}/>
            </Icon>
        </OuterContainer>
    )
}

export default Layout

const OuterContainer = styled.div`
  background: linear-gradient(152deg, #004efe 0%, #00acfe 60%, #68ceff 100%);
    border-radius: 0 0 100% 40px;
    min-height: 15rem;
    display: grid;
    grid-template-columns: 50% 40%;
    justify-content: center;
    align-items: flex-start;
    padding-top: 50px;
`;
const TitleAndDescription = styled.div`
   p,h3{
       margin:0;
       color: whitesmoke;
       font-weight: 400;
   }
   p{
       margin-top:4px;
   }
`;
const Icon = styled.div`
    text-align: center;
    font-size: 3rem;
    i{
        color: whitesmoke;
    }
`;
