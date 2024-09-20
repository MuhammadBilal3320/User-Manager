import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ManagerContext from './context/Context';
import { HiDotsVertical } from "react-icons/hi";
import axios from 'axios';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import HomeEditModal from './HomeEditModal';

const MyVault = () => {
    const { setEditButton, setCreateButton, setSelectedData, mainData, setMainData, activeCard, setActiveCard } = useContext(ManagerContext);
    const { theme, setEditModal, itemHighlighter, setItemHighlighter } = useContext(ManagerContext);

    const [editDelete, setEditDelete] = useState(null);
    const [activeDots, setActiveDots] = useState(null);


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
            setActiveDots(null);
            // setEditModal(false);
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

    const toggleEditDelete = (index, e) => {
        e.stopPropagation()
        setEditDelete(prev => (prev === index ? null : index));
        setActiveDots(prev => (prev === index ? null : index));
        setActiveCard(prev => (prev === index ? null : index));
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [editDelete]);

    const deleteHandler = async (id) => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGJiZDI0ZGI2ZmVmYzRhZjU2N2ZlMyIsImlhdCI6MTcyNTY3Njg1N30.kirwK8JEQ6TLKrakOk-vCDUFZuvx7x-w4JKBytV6ED0";
            const response = await axios.post(`http://localhost:7000/data/deleteItem/${id}`, {}, {
                headers: {
                    authToken: `${token}`
                }
            });

            const newData = mainData.filter(item => item._id !== id);
            setMainData(newData);

            setEditDelete(null)

        } catch (error) {
            console.error('Error deleting data:', error);
        }
        setActiveCard(null);
    }

    return (
        <VaultMainContainer theme={theme} editDelete={editDelete}>

            <main>
                {mainData.map((item, index) => (

                    <div
                        key={index}
                        onClick={(e) => {
                            setCreateButton(false);
                            setEditButton(false);
                            // Prevent modal from opening if the click happens inside the edit-delete dropdown
                            if (!e.target.closest('.edit-Delete')) {
                                setActiveCard(index);
                                console.log("This is active card: ",activeCard)
                                setEditModal(true);
                                setActiveDots(null);
                            }
                            if(itemHighlighter === item._id){
                                setItemHighlighter(null);
                            }
                            setSelectedData({
                                title: item.title,
                                emailOrUser: item.emailOrUser,
                                password: item.password,
                                message: item.message
                            });
                            
                        }}
                        isclicked={activeDots !== null}
                        className={`card ${(activeCard === index || activeDots === index) ? "active" : ""} ${itemHighlighter === item._id ? "highlight" : ""}`}
                    >
                        <div className="card-icon-text flex justify-center items-center">
                            <div className="socialIcon"><span>{item.title ? item.title[0].toUpperCase() : ''}</span></div>
                            <div className="cardText">
                                <div className="cardTitle">{item.title}</div>
                                <div className="cardEmail">{item.emailOrUser}</div>
                            </div>
                        </div>

                        <div className={`dotsContainer py-[5px] rounded-badge ${theme === "white" ? "bg-[#1d2a35]" : "bg-[white]"}`}>
                            <div className={` cardLastDot px-1 py-1 rounded-box ${theme === "white" ? "bg-[aliceblue]" : "bg-black"} `} />
                            <HiDotsVertical onClick={(e) => toggleEditDelete(index, e)} className={`threeDots `} color={`${theme === "white" ? "white" : "black"}`} fontSize={"25px"} />

                            {editDelete === index && (
                                <div className="edit-Delete">
                                    <div onClick={(event) => {
                                        event.stopPropagation();
                                        setEditModal(true);
                                        setCreateButton(false);
                                        setEditButton(true);
                                        setSelectedData({
                                            id: item._id,
                                            title: item.title,
                                            emailOrUser: item.emailOrUser,
                                            password: item.password,
                                            message: item.message
                                        });
                                        setEditDelete(null);

                                    }}>
                                        <span className='w-[25%]'><MdModeEdit className='edit-delete-icon' /></span>
                                        <button className='w-[60%] text-left font-semibold'>Edit</button>
                                    </div>
                                    <div onClick={() => deleteHandler(item._id)}>
                                        <span className='w-[25%]'><MdDelete color='red' className='edit-delete-icon' /></span>
                                        <button className='w-[60%] text-red-600 text-left font-semibold'>Delete</button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </main>
            <HomeEditModal />
        </VaultMainContainer>
    );
};

export default MyVault;

const VaultMainContainer = styled.div`

.highlight {
        border: 2px solid #00FF00; /* Change to your preferred highlight style */
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.5); /* Optional: add a glowing effect */
    }
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 768px) {
        padding: 30px 2px;
    }

    main{
        height: 80vh;
    overflow: auto;
    overflow-x: hidden;
    }

    .card {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        margin: 15px 0;
        width: 100%;
        height: 70px;
        background-color: ${props => props.theme === "white" ? "#1d2a35" : "white"};
        transition: width 1s;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
        &:hover {
        cursor: pointer;
        border-radius: 15px;
        background-color: ${props => props.theme === "white" ? "aliceblue" : "#1d2a35"};
        color: ${props => props.theme === "white" ? "white" : "black"};

        }
        
        &.active {
        background-color: ${props => props.theme === "white" ? "aliceblue" : "#1d2a35"}; 
        width: 100%;
        transition: width 1s;
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

    .card:hover .cardLastDot{
        display: none;
    }

    .active .cardLastDot{
        display: none;
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
        
        @media screen and (max-width: 768px) {
            width: 40px;
            height: 40px;
            font-size: 25px;
        }
    }

    .cardText {
        color: ${props => props.theme === "white" ? "white" : "black"};
        font-weight: 600;
        .cardEmail {
        font-weight: normal;
        color: ${props => props.theme === "white" ? "#c5c5c9" : "#39393a"};
        }
    }

    .cardEmail{
        @media screen and (max-width: 768px) {
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
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
        z-index: 30;
        right: 0;
        top: ${props => props.editDelete !== null ? "55px" : "45px"};
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
