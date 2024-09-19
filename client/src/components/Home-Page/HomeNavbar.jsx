import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import ManagerContext from './context/Context';
import axios from 'axios';

const HomeNavbar = () => {
    const {theme, setTheme, setLeftSlider} = useContext(ManagerContext);
    const [dropDown, setDropDown] = useState(false);
    const [fetchUserDetails, setFetchUserDetails] = useState({ userName: "Unknown", email: "unknown@gmail.com" })
    const dropDownRef = useRef(null);


    const fetchUser = async () => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTJhZmNiMjExZTg5Mzk4OThiN2EyNSIsInVzZXJOYW1lIjoiRXNhIEtoYW4iLCJlbWFpbCI6ImVzYUFobWFkQGdtYWlsLmNvbSIsImlhdCI6MTcyNjEzMjE3MX0.5HpP9nAYyv2bteOkapqgvAHz_nP1usQt0VwwV7tGkw8"; // Retrieve token from localStorage or any secure storage
            const response = await axios.get('http://localhost:7000/data/userDetails', {
                headers: {
                    authToken: `${token}`
                }
            });
            
            setFetchUserDetails({userName:response.data.userName, email:response.data.email})

        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    // useEffect(() => {
    //     fetchUser()
    // }, [])



    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeClick = () => {
        setTheme(prevTheme => prevTheme === "white" ? "dark" : "white");
    };

    // Close dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setDropDown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <MainNavbar theme={theme} dropDown={dropDown}>

            <div className="hamBurger"><GiHamburgerMenu onClick={()=> setLeftSlider(true)} className='md:hidden' fontSize={"25px"} color={theme === "white" ? "white" : "#1d2a35"} /></div>

            <div className="logo">
                <h1>USER MANAGER</h1>
            </div>

            <div className="theme-userDetails">
                <div className="theme">
                    <div onClick={handleThemeClick} className="white-dark">
                        {theme === "white" ?
                            <FaSun className='themas' color={"#1d2a35"}  /> :
                            <FaMoon className='themas' color={"white"} />
                        }
                    </div>
                </div>

                <div className="userDetail" ref={dropDownRef}>
                    <h1 onClick={() => setDropDown(!dropDown)}>{fetchUserDetails.userName.substring(0, 2)}</h1>

                    <ul className='dropDown'>
                        <li>{fetchUserDetails.email}</li>
                        <li id='logout'><RiShutDownLine fontSize={"18px"} />LOG OUT</li>
                    </ul>
                </div>
            </div>
        </MainNavbar>
    );
};

export default HomeNavbar;

const MainNavbar = styled.div`
    box-shadow: 0 0 6px 0px black;
    padding: 20px;
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${props => props.theme === "white" ? "#1d2a35" : "white"};
    color: ${props => props.theme === "white" ? "#1d2a35" : "white"};

    .theme-userDetails{
        background-color: ${props => props.theme === "white" ? "#1d2a35" : "white"};
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }

    .logo h1{
        text-transform: uppercase;
        background-color: transparent;
        color: ${props => props.theme === "white" ? "white" : "#1d2a35"};
        font-size: 30px;
        font-weight: 800;
        transition: all 0.4s;
        scale: 1;
        cursor: pointer;
        

        &:active{
            scale: .95;
            transition: all 0.4s;
        }

        @media screen and (max-width: 500px) {
            font-size: 22px;
            font-weight: 700;
        }
    }

    .white-dark {
        box-shadow: 0 0 6px 0px ${props => props.theme === "white" ? "white" : "black"};
        cursor: pointer;
        color: ${props => props.theme === "white" ? "#1d2a35" : "white"};
        transition: color 0.3s ease-in-out;
        background-color: ${props => props.theme === "white" ? "white" : "#1d2a35"};
        padding: 10px;
        border-radius: 50%;
        transition: all 0.3s ease-in-out;

        &:hover {
            color: ${props => props.theme === "white" ? "#1d2a35" : "white"};
            scale: 0.95;
            transition: all 0.3s ease-in-out;
        }

        &:active {
            transform: scale(1.1) rotate(360deg);
            transition: transform 0.5s ease-out;
        }

        @media screen and (max-width: 500px) {
            padding: 8px;
        }
    }

    .themas{
        font-size: 18px;
        transition: all 0.5s ease-out;

        @media screen and (max-width: 500px) {
            font-size: 20px;
        }
    }

    .userDetail{
        position: relative;
        
        h1{
            box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
            display: flex;
            justify-content: center;
            align-items: center;
            text-transform: uppercase;
            background-color: #b20000;
            padding: 5px;
            width: 50px;
            height: 50px;
            border-radius: 100%;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            color: white;
            font-size: 20px;
            font-weight: 700;

            &:hover{
            scale: 0.95;
            transition: all 0.3s ease-in-out;
        }
        }
    }

    .dropDown{
        box-shadow: 0 0 6px 0px black;
        opacity: ${props => props.dropDown ? "1" : "0"};
        padding: 20px;
        border-radius: 20px;
        position: absolute;
        left: -90px;
        top: ${props => props.dropDown ? "70px" : "50px"};
        transition: all 0.3s ease-in-out;
        text-align: center;
        background-color: ${props => props.theme === "white" ? "#1d2a35" : "white"};
        border-radius: 20px;

        li{
            margin-bottom: 5px;
            cursor: pointer;
            color: ${props => props.theme === "white" ? "white" : "black"};
            background-color: transparent;
            padding: 4px 8px;
            font-weight: 500;

            &:hover{
            background-color: ${props => props.theme === "white" ? "white" : "#1d2a35"};
            color: ${props => props.theme === "white" ? "black" : "white"};
            border-radius: 20px;
            }

            @media screen and (max-width: 500px) {
                padding: 4px 6px;
                font-size: 14px;
        }
        }

        #logout{
            font-weight: 800;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            &:hover{
                background-color: #e2111be0;
                color: white;
            }
        }

        @media screen and (max-width: 500px) {
            padding: 10px;
            left: -110px;
        }

    }

    
`;
