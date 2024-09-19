import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ManagerContext from './context/Context';
import HomeEditModal from './HomeEditModal';
import axios from 'axios';

const DeletedItems = () => {
    const { setEditButton, setCreateButton, selectedData, setSelectedData, mainData, setMainData } = useContext(ManagerContext);
    const { theme, setEditModal } = useContext(ManagerContext);

    const [activeCard, setActiveCard] = useState(null);
    const [fetchAllDeleted, setFetchAllDeleted] = useState([]);


    const fetchUser = async () => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGJiZDI0ZGI2ZmVmYzRhZjU2N2ZlMyIsImlhdCI6MTcyNTY3Njg1N30.kirwK8JEQ6TLKrakOk-vCDUFZuvx7x-w4JKBytV6ED0"; 
            const response = await axios.get('http://localhost:7000/data/fetchDeletedAll', {
                headers: {
                    authToken: `${token}`
                }
            });
            setFetchAllDeleted(response.data); 

        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const deleteItemHandler = async(itemId, event)=>{
        event.preventDefault();
        event.stopPropagation();
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGJiZDI0ZGI2ZmVmYzRhZjU2N2ZlMyIsImlhdCI6MTcyNTY3Njg1N30.kirwK8JEQ6TLKrakOk-vCDUFZuvx7x-w4JKBytV6ED0"; 
            const response = await axios.delete(`http://localhost:7000/data/deleteData/${itemId}`, {
                headers: {
                    authToken: `${token}`
                }
            }); 

            const newData = fetchAllDeleted.filter(item => item._id !== itemId);
            setFetchAllDeleted(newData);

        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);


    const handleClickOutside = (event) => {
        const clickedCard = event.target.closest('.card');
        const clickedDropdown = event.target.closest('.edit-Delete');

        // Case 1: Clicking outside both card and dropdown
        if (!clickedCard && !clickedDropdown) {
            setActiveCard(null);
            // setEditModal(false);
        }

        // Case 2: Clicking on a card when the edit-delete dropdown is open
        if (clickedCard ) {
            const cardIndex = [...document.querySelectorAll('.card')].indexOf(clickedCard);
        }
    };

    

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);  

    return (
        <VaultMainContainer theme={theme} >
            <main>
                {fetchAllDeleted.map((item, index) => (

                    <div
                        key={index}
                        onClick={(e) => {
                            setCreateButton(false);
                            setEditButton(false);
                            setEditModal(true);
                            setSelectedData({
                                title: item.title,
                                emailOrUser: item.emailOrUser,
                                password: item.password,
                                message: item.message
                            });
                            console.log(selectedData)
                        }}
                        className={`card ${activeCard === index? "active" : ""}`}
                    >
                        <div className="card-icon-text">
                            <div className="socialIcon"><span>{item.title ? item.title[0].toUpperCase() : ''}</span></div>
                            <div className="cardText">
                                <div className="cardTitle">{item.title[0].toUpperCase() + item.title.substring(1)}</div>
                                <div className="cardEmail">{item.emailOrUser}</div>
                            </div>
                        </div>

                        <StyledWrapper>
                            <button onClick={(e) => deleteItemHandler(item._id, e)} className="bin-button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 39 7"
                                    className="bin-top"
                                >
                                    <line strokeWidth={4} stroke="white" y2="5" x2="39" y1="5" />
                                    <line
                                        strokeWidth={3}
                                        stroke="white"
                                        y2="1.5"
                                        x2="26.0357"
                                        y1="1.5"
                                        x1="12"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 33 39"
                                    className="bin-bottom"
                                >
                                    <mask fill="white" id="path-1-inside-1_8_19">
                                        <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
                                    </mask>
                                    <path
                                        mask="url(#path-1-inside-1_8_19)"
                                        fill="white"
                                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                    />
                                    <path strokeWidth={4} stroke="white" d="M12 6L12 29" />
                                    <path strokeWidth={4} stroke="white" d="M21 6V29" />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 89 80"
                                    className="garbage"
                                >
                                    <path
                                        fill="white"
                                        d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                                    />
                                </svg>
                            </button>
                        </StyledWrapper>

                    </div>
                ))}
            </main>
            <HomeEditModal />
        </VaultMainContainer>
    );
};

export default DeletedItems;

const VaultMainContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 768px) {
        padding: 30px 2px;
    }

    main{
        width: 100%;
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

    `;

        const StyledWrapper = styled.div`
        .bin-button {
        background-color: #ec303099;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 10px;
        cursor: pointer;
        transition-duration: 0.3s;
        position: relative;
        overflow: hidden;
        &:hover{
            background-color: rgb(255, 95, 95);
            transform: translateY(-5px);
        }
        }
        .bin-bottom {
        width: 15px;
        z-index: 2;
        }
        .bin-top {
        width: 17px;
        transform-origin: right;
        transition-duration: 0.3s;
        z-index: 2;
        }
        .bin-button:hover .bin-top {
        transform: rotate(45deg);
        }
        .bin-button:hover {
        background-color: rgb(255, 0, 0);
        }
        .bin-button:active {
        transform: scale(0.9);
        }
        .garbage {
        position: absolute;
        width: 14px;
        height: auto;
        z-index: 1;
        opacity: 0;
        transition: all 0.3s;
        }
        .bin-button:hover .garbage {
        animation: throw 0.4s linear;
        }
        @keyframes throw {
        from {
        transform: translate(-400%, -700%);
        opacity: 0;
        }
        to {
        transform: translate(0%, 0%);
        opacity: 1;
        }
        }

        `;
