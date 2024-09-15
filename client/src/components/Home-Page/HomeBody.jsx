import React, { useContext } from 'react';
import styled from 'styled-components';
import ManagerContext from './context/Context';
import { FaSearch } from "react-icons/fa";
import MyVault from './MyVault';
import HomeEditModal from './HomeEditModal';

const HomeBody = () => {
    const { theme } = useContext(ManagerContext);

    return (
        <HomeBodyContainer theme={theme}>

            <header>
                <h1>My Vault</h1>
                <div className="searchBarContainer">
                    <div className="searchBar">
                        <FaSearch color={theme === "white" ? "#1d2a35" : "white"} fontSize={"30px"} />
                        <input className='searchInputField placeholder:text-[{theme === "white" ? "#1d2a35" : "white"}]' type="text" placeholder='Search' />
                    </div>
                </div>
            </header>

            <main>
                <MyVault/>
            </main>

        </HomeBodyContainer>
    );
};

export default HomeBody;


const HomeBodyContainer = styled.main`
    height: 100vh;
    width: 100%;
    background-color: ${props => props.theme === "white" ? "#1d2a35" : "white"};

    @media screen and (max-width: 768px) {
        padding: 32px 12px;
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 1rem 0;

        @media screen and (max-width: 768px) {
            flex-direction: column;
            gap: 1rem;
        }
    }

    .searchBarContainer {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        @media screen and (max-width: 768px) {
            width: 100%;
            gap: 1rem;
            justify-content: center;
        }
    }

    .searchBar {
        background-color: ${props => props.theme === "white" ? "white" : "#1d2a35"};
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        padding: 8px 18px;
        border: none;
        @media screen and (max-width: 768px) {
            padding: 5px 16px;
        }
    }

    .searchBar:hover .searchInputField,
    .searchInputField:focus {
        width: 300px;  
        padding: 0 10px;
    }

    .searchInputField {
        width: 0;
        color: ${props => props.theme === "white" ? "#1d2a35" : "white"};
        background-color: transparent;
        border: none;
        outline: none;
        font-weight: 600;
        transition: all 0.4s ease;
        @media screen and (max-width: 768px) {
            width: 80px;
            padding: 0px 8px;
        }
    }

    .searchInputField:not(:placeholder-shown) {
        width: 350px; 
        padding: 0 10px;
    }

    header > h1 {
        color: ${props => props.theme === "white" ? "white" : "black"};
        font-size: 30px;
        font-weight: 700;
    }


    main{
        width: 100%;
        height: 80%;

        @media screen and (max-width: 768px) {
            position: relative;
            z-index: 5;
        }
    }
`;
