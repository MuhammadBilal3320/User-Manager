import React, { useContext } from 'react'
import styled from 'styled-components'
import ManagerContext from './context/Context'
import { FaPlus } from 'react-icons/fa';

const HomeEmpty = () => {

    const {theme} = useContext(ManagerContext);

    return (
        <EmptyMainContainer theme={theme}>


            <img className={`${theme === "white" ? "invert" : "invert-1"}`} src="./images/empty.png" alt="empty" width={"200px"}  />

            <div className="textArea">Protect Yourself </div>
            
            <button className='addButton'>
                    <span className='leftSideIcons'><FaPlus fontSize={"18px"} /></span>
                    <span className='sideButtons'>Create New</span>
                </button>



        </EmptyMainContainer>
    )
}

export default HomeEmpty

const EmptyMainContainer = styled.main`

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    background-color: ${props => props.theme === "white" ? "#1d2a35" : "white"};;
    color: ${props => props.theme === "white" ? "white" : "black"};
    padding: 25px;
    margin: 10px;

    .textArea{
        font-size: 25px;
        font-weight: 600;
        margin: 20px 0;
        text-align: center;
    }

    .addButton{
        width: 150px;
        height: 45px;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        background-color: #00dfc0;
        border-radius: 2rem;
        font-weight: 600;
        transition: all 0.2s ease-in-out;
        &:hover{
            scale: 0.90;
        }
    }

`;
