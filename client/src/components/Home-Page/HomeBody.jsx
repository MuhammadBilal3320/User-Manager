import React, { useContext } from 'react';
import styled from 'styled-components';
import ManagerContext from './context/Context';
import { FaSearch } from "react-icons/fa";
import MyVault from './MyVault';
import HomeEditModal from './HomeEditModal';
import DeletedItems from './DeletedItems';

const HomeBody = () => {
    const { theme, activeComponent, mainData} = useContext(ManagerContext);

    return (
        <HomeBodyContainer theme={theme}>

            <header>
                <h1 className='w-[300px]'>{activeComponent === "My Vault" ? "My Vault" : "Deleted Items"}</h1>
                <div className="searchBarContainer relative z-50">
                    <div className="searchBar">
                        <FaSearch color={theme === "white" ? "#1d2a35" : "white"} fontSize={"30px"} />
                        <input className={`searchInputField placeholder:text-[${theme === "white" ? "#1d2a35" : "white"}]`} type="text" placeholder='Search' />
                    </div>
                </div>
            </header>

            <main>

                {activeComponent === "My Vault" ? <MyVault/> : <DeletedItems/>}

            </main>

        </HomeBodyContainer>
    );
};

export default HomeBody;


const HomeBodyContainer = styled.main`
    height: 100vh;
    width: 100%;
    background-color: ${props => props.theme === "white" ? "#1d2a35" : "white"};
    overflow: hidden;

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
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

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
        padding: 20px;

        @media screen and (max-width: 768px) {
            position: relative;
            z-index: 5;
            padding: 30px 2px;
        }
    }
`;
