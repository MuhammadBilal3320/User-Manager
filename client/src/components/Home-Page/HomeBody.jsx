import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import ManagerContext from './context/Context';
import { FaSearch } from "react-icons/fa";
import MyVault from './MyVault';
import HomeEditModal from './HomeEditModal';
import DeletedItems from './DeletedItems';
import Fuse from 'fuse.js';

const HomeBody = () => {
    const { theme, activeComponent, mainData, setSelectedData, setItemHighlighter, fetchAllDeleted } = useContext(ManagerContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [displayField, setDisplayField] = useState('title');  // 'title', 'emailOrUser', or 'userName'

    // Select the correct data set based on the active component
    const currentData = activeComponent === "My Vault" ? mainData : fetchAllDeleted;

    // Configure Fuse.js to search within the current data set
    const fuse = new Fuse(currentData, {
        keys: ['emailOrUser', 'title', 'userName'],  // Add 'userName' to searchable keys
        threshold: 0.4,  // Adjust threshold for more or fewer results
    });

    // Handle Search Input Change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.trim()) {
            const result = fuse.search(value).map(({ item }) => item);  // Get the actual items from Fuse results
            setSearchResults(result);

            // Determine the field to display based on the query content
            if (value.includes('@')) {
                setDisplayField('emailOrUser');  // Display 'emailOrUser' for email-like queries
            } else {
                setDisplayField('title');        // Otherwise, display 'title'
            }
        } else {
            setSearchResults([]);  // Clear suggestions if no search query
        }
    };

    // Handle Card Click
    const handleCardClick = (item) => {
        setItemHighlighter(item._id);
        setSelectedData({
            title: item.title,
            emailOrUser: item.emailOrUser,
            userName: item.userName,
            password: item.password,
            message: item.message
        });

        setSearchQuery(''); // Clear the search bar after selecting an item
    };

    return (
        <HomeBodyContainer theme={theme}>
            <header>
                <h1 className='w-[300px]'>{activeComponent === "My Vault" ? "My Vault" : "Deleted Items"}</h1>
                <div className="searchBarContainer relative z-50">
                    <div className="searchBar">
                        <FaSearch color={theme === "white" ? "#1d2a35" : "white"} fontSize={"30px"} />
                        <input
                            className={`searchInputField placeholder:text-[${theme === "white" ? "#1d2a35" : "white"}]`}
                            type="text"
                            placeholder='Search'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {/* Render Search Suggestions */}
                    {searchQuery && searchResults.length > 0 && (
                        <SuggestionsContainer>
                            {searchResults.map((item, index) => (
                                <div
                                    key={index}
                                    className="suggestionItem"
                                    onClick={() => handleCardClick(item)}>
                                    {/* Conditionally render title, emailOrUser, or userName */}
                                    {displayField === 'title' && item.title}
                                    {displayField === 'emailOrUser' && item.emailOrUser}
                                </div>
                            ))}
                        </SuggestionsContainer>
                    )}
                </div>
            </header>

            <main>
                {selectedCard ? (
                    <HomeEditModal />
                ) : (
                    activeComponent === "My Vault" ? <MyVault /> : <DeletedItems />
                )}
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
        padding: 0px 12px;
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 1rem 0;

        @media screen and (max-width: 768px) {
            position: relative;
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;
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

const SuggestionsContainer = styled.div`
    width: 400px;
    position: absolute;
    top: 50px;
    background-color: white;
    z-index: 100;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    max-height: 300px;
    overflow-y: auto;
    @media screen and (max-width: 768px) {
        width: 360px;
    }
    @media screen and (max-width: 400px) {
        width: 360px;
        max-height: 50px;
    }

    .suggestionItem {
        padding: 10px;
        cursor: pointer;
        &:hover {
            background-color: #f1f1f1;
        }
    }
`;
