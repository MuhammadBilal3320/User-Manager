import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ManagerContext from './context/Context';
import { HiDotsVertical } from "react-icons/hi";
import axios from 'axios';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import HomeEditModal from './HomeEditModal';

const MyVault = () => {
    const [mainData, setMainData] = useState([]);
    const [editDelete, setEditDelete] = useState(null);
    const [activeCard, setActiveCard] = useState(null); // Track the active card

    const fetchUser = async () => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGJiZDI0ZGI2ZmVmYzRhZjU2N2ZlMyIsImlhdCI6MTcyNTY3Njg1N30.kirwK8JEQ6TLKrakOk-vCDUFZuvx7x-w4JKBytV6ED0"; // Replace with secure token retrieval
            const response = await axios.get('http://localhost:7000/data/fetchAllData', {
                headers: {
                    authToken: `${token}`
                }
            });
            setMainData(response.data); // Store the fetched data in state

        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleClickOutside = (event) => {
        const clickedCard = event.target.closest('.card');
        const clickedDropdown = event.target.closest('.edit-Delete');

        // Case 1: Clicking outside both card and dropdown
        if (!clickedCard && !clickedDropdown) {
            setActiveCard(null);
            setEditDelete(null);
        }

        // Case 2: Clicking on a card when the edit-delete dropdown is open
        if (clickedCard && editDelete !== null) {
            const cardIndex = [...document.querySelectorAll('.card')].indexOf(clickedCard);

            // If the clicked card is different from the one with the open dropdown, close the dropdown
            if (editDelete !== cardIndex) {
                setEditDelete(null);
            }
        }
    };

    const toggleEditDelete = (index) => {
        setEditDelete(prev => (prev === index ? null : index));
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [editDelete]);  // Add editDelete to dependency array to reflect changes properly


    const { theme, setEditModal } = useContext(ManagerContext);

    return (
        <VaultMainContainer theme={theme} editDelete={editDelete}>
            <main>
                {mainData.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {setActiveCard(index); setEditModal(true)}} // Set the active card index
                        className={`card ${activeCard === index ? "active" : ""}`}
                    >
                        <div className="card-icon-text">
                            <div className="socialIcon"><span>{item.title[0].toUpperCase()}</span></div>
                            <div className="cardText">
                                <div className="cardTitle">{item.title}</div>
                                <div className="cardEmail">{item.emailOrUser}</div>
                            </div>
                        </div>

                        <div className="dotsContainer">
                            <HiDotsVertical onClick={() => toggleEditDelete(index)} className='threeDots' fontSize={"25px"} />

                            {editDelete === index && (
                                <div className="edit-Delete">
                                    <div>
                                        <span className='w-[25%]'><MdModeEdit className='edit-delete-icon' /></span>
                                        <button className='w-[60%] text-left font-semibold'>Edit</button>
                                    </div>
                                    <div>
                                        <span className='w-[25%]'><MdDelete color='red' className='edit-delete-icon' /></span>
                                        <button className='w-[60%] text-red-600 text-left font-semibold'>Delete</button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </main>
            <HomeEditModal/>
        </VaultMainContainer>
    );
};

export default MyVault;

const VaultMainContainer = styled.div`
    padding: 30px;
    /* display: flex;
    justify-content: space-between;
    gap: 50px; */

    @media screen and (max-width: 768px) {
        padding: 30px 2px;
    }

    .card {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        margin: 15px;
        width: 100%;
        height: 70px;
        background-color: ${props => props.theme === "white" ? "#1d2a35" : "white"};
        
        &:hover {
        cursor: pointer;
        border-radius: 15px;
        background-color: ${props => props.theme === "white" ? "aliceblue" : "#1d2a35"};
        color: ${props => props.theme === "white" ? "white" : "black"};
        }
        
        &.active {
        background-color: ${props => props.theme === "white" ? "aliceblue" : "#1d2a35"};
        color: ${props => props.theme === "white" ? "white" : "black"};
        z-index: 10; 
        }

        @media screen and (max-width: 768px) {
        margin: 15px 0;
    }

    }

    .card:hover .socialIcon, .card.active .socialIcon {
        background-color: ${props => props.theme === "white" ? "#1d2a35" : "white"};
        color: ${props => props.theme === "white" ? "white" : "black"};
    }

    .card:hover .cardText, .card.active .cardText {
        color: ${props => props.theme === "white" ? "black" : "white"};
        .cardEmail {
        color: ${props => props.theme === "white" ? "#39393a" : "#c5c5c9"};
        }
    }

    .card:hover .threeDots, .card.active .threeDots {
        display: block;
        color: ${props => props.theme === "white" ? "black" : "white"};
    }


    .card-icon-text {
        display: flex;
        gap: 20px;
    }

    .socialIcon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-weight: 700;
        width: 45px;
        height: 45px;
        background-color: ${props => props.theme === "white" ? "white" : "#1d2a35"};
        color: ${props => props.theme === "white" ? "black" : "white"};
        border-radius: 10px;
        margin-left: 10px;
    }

    .cardText {
        color: ${props => props.theme === "white" ? "white" : "black"};
        font-weight: 600;
        .cardEmail {
        font-weight: normal;
        color: ${props => props.theme === "white" ? "#c5c5c9" : "#39393a"};
        }
    }

    .threeDots {
        display: none;
        font-size: 25px;
        transition: all 0.3s ease-in-out;
        margin: 0 10px;
        &:hover {
        transform: scale(1.1);
        cursor: pointer;
        }
    }

    .edit-Delete {
        position: absolute;
        opacity: ${props => props.editDelete!==null ? "1" : "0"};
        z-index: 30;
        right: 0;
        top: ${props => props.editDelete!==null ? "55px" : "45px"};
        background-color: ${props => props.theme === "white" ? "white" : "#1d2a35"};
        color: ${props => props.theme === "white" ? "black" : "white"};
        padding: 5px;
        height: 120px;
        width: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        font-size: large;
        border-radius: 15px;
        box-shadow: 0 0 6px 0px black;
        transition: all 0.3s ease-in-out;

        & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        width: 100%;
        padding: 2px;

        &:hover {
            background-color: ${props => props.theme === "white" ? "#1d2a35" : "aliceblue"};
            color: ${props => props.theme === "white" ? "white" : "black"};
            border-radius: 5px;
        }
        &:hover .edit-delete-icon {
            color: ${props => props.theme === "white" ? "white" : "black"};
        }
        }

        & > button {
        color: ${props => props.theme === "white" ? "black" : "white"};
        border: none;
        font-weight: 800;
        cursor: pointer;
        }

        .edit-delete-icon {
        font-size: 25px;
        color: ${props => props.theme === "white" ? "black" : "white"};
        }
    }
    `;
