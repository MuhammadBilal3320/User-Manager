import React, { useState } from 'react'
import styled from 'styled-components'
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseCircleFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [hamBurger, setHamBurger] = useState(false);

    return (
        <NavbarContainer onClick={() => setHamBurger(false)} hamBurger={hamBurger}>

            <h1>USER MANAGER</h1>


            <div onClick={(event) => event.stopPropagation()} className="ulContainer">
                <div className="close" onClick={() => setHamBurger(false)}><RiCloseCircleFill fontSize={"30px"} /></div>
                <Link to={"/"}><li>HOME</li></Link>
                <Link to={"/password_generator"}><li>PASSWORD GENERATOR</li></Link>
            </div>


            <ul>
                <Link to={"/"}><li>HOME</li></Link>
                <Link to={"/password_generator"}><li>PASSWORD GENERATOR</li></Link>
            </ul>

            <div onClick={(event) => { event.stopPropagation(); setHamBurger(true) }} className="hamBurger">
                <GiHamburgerMenu fontSize={"25px"} />
            </div>

        </NavbarContainer>
    )
}

export default Navbar

const NavbarContainer = styled.div`
    position: relative;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    

    h1{
        font-size: 2rem;
        font-weight: 700;
        @media screen and (max-width: 768px) {
            font-size: 1.5rem;
        }
    }

    ul{
        position: relative;
        display: flex;
        gap: 50px;
        list-style: none;
        @media screen and (max-width: 768px) {
            display: none;
        }
    }

    .ulContainer{
        display:none;
    }

    @media screen and (max-width: 768px) {
        .ulContainer{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
            position: absolute;
            right: 6px;
            top: 60px;
            background-color: whitesmoke;
            border-radius: 20px;
            height: 100px;
            width: 200px;
            font-size: small;
            transform: ${(props) => (props.hamBurger ? 'translateX(0)' : 'translateX(200%)')};
            transition: all 0.4s;

    }

    .ulContainer li{
        list-style: none;
        font-size: small;
        font-weight: 600;
        padding: 2px 10px;
        border-radius: 10px;
        &:hover{
            background-color: #00dfc0;
        }
    }

    .close{
        position: absolute;
        top: 5px;
        right: 15px;
        font-size: 25px;
        cursor: pointer;
        transition: color 0.3s ease-in-out;
        &:hover{
            color: red;
        }
    }
    
    }

    ul li{
        position: relative;
        cursor: pointer;
        font-size: large;
        transition: color 0.3s ease-in-out;
        font-weight: 600;
        &:hover::after{
            width: 100%;
            transition: all 0.2s ease-in-out;
        }

        @media screen and (max-width: 768px) {
            font-size: small;
        }           
    }

    ul li::after{
        content: '';
        position: absolute;
        bottom: 1px;
        left: 0;
        display: block;
        width: 0;
        height: 3px;
        background-color: black;
    }

    .hamBurger{
        display: none;
        cursor: pointer;
        &:hover{
            transform: scale(1.1);
        }
        @media screen and (max-width: 768px) {
            display: block;
        }
    }
    
    `