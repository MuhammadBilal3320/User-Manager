import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ManagerContext from './context/Context';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import { CiVault } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";


const HomeSidebar = () => {
    const { theme, leftSlider, setLeftSlider, setEditModal, setEditButton, setCreateButton, selectedData, setSelectedData, activeComponent, setActiveComponent } = useContext(ManagerContext);
    const [sideSlider, setSideSlider] = useState(false);

    const sideComponents = [
        {
            title: "My Vault",
            icon: <CiVault fontSize={"25px"} />,
        },
        {
            title: "Deleted Items",
            icon: <MdDelete color='red' fontSize={"25px"} />,
        },
    ];

    // useEffect(() => {
    //     setSelectedData(null);
    // }, [selectedData]);

    const createHandler = ()=>{
        setActiveComponent("My Vault");
        setEditButton(false);
        setEditModal(true);
        setCreateButton(true);
        setSelectedData({ 
            id: "", 
            title: "", 
            emailOrUser: "", 
            password: "", 
            message: "" 
        });
    }
    

    return (
        <MainSidebar theme={theme} sideSlider={sideSlider} leftSlider={leftSlider}>
            <div className="sideBarController">
                <GiHamburgerMenu className='hamBurger md:block hidden' onClick={() => setSideSlider(!sideSlider)} />
                <span className='w-[100%] flex justify-end pr-4'>
                    <ImCross className='crossButton md:hidden block' onClick={() => setLeftSlider(false)} fontSize={"20px"} />
                </span>

                <button onClick={createHandler} className='addButton'>
                    <span className='leftSideIcons'><FaPlus fontSize={"18px"} /></span>
                    <span className='sideButtons'>Create New</span>
                </button>

                <div className="componentController">
                    {sideComponents.map((item, index) => (
                        <div
                            key={index}
                            className={`component ${activeComponent === item.title ? 'activeComponent' : ''}`}
                            onClick={() => {
                                if(item.title === "Deleted Items") {
                                    setEditModal(false);
                                }
                                setActiveComponent(item.title)
}
                            }
                        >
                            <span className='leftSideIcons'>{item.icon}</span>
                            <span className='sideButtons'>{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </MainSidebar>
    )
}

export default HomeSidebar

const MainSidebar = styled.div`
    overflow: hidden;
    position: relative;
    left: 0;
    top: -80px;
    width: ${props => props.sideSlider ? "12%" : "5%"};
    transition: all 0.3s ease-in-out;
    height: 100vh;
    background-color: #1d2a35;
    box-shadow: 0 0 6px 0px black;
    padding: 10px;
    color: white;

    @media screen and (max-width:768px) {
            position: absolute;
            z-index: 100;
            top: 0;
            left: ${props => props.leftSlider ? "0%" : "-100%"};
            transition: all 0.3s ease-in-out;
            width: 70%;
        }

        @media screen and (min-width: 767px) and (max-width: 999px) {
            width: ${props => props.sideSlider ? "26%" : "10%"};
        }

        @media screen and (min-width: 1000px) and (max-width: 1600px) {
            width: ${props => props.sideSlider ? "20%" : "10%"};
        }

    .sideBarController{
        height: 30vh;
        display: flex;
        flex-direction: column;
        align-items: ${props => props.sideSlider || props.leftSlider ? "start" : "center"};;
        justify-content: space-between;
        padding: 10px;
    }

    .hamBurger{
        margin: 0 20px;
        font-size: 25px;
        cursor: pointer;
        color: white;
        transition: all 0.3s ease-in-out;
        &:hover{
            scale: 0.90;
        }
        @media screen and (max-width:700px) {
            font-size: 20px;
        }
    }

    .addButton{
        width: ${props => (props.sideSlider || props.leftSlider) ? "150px" : "45px"};
        height: 45px;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #00dfc0;
        border-radius: 2rem;
        font-weight: 600;
        transition: all 0.2s ease-in-out;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

        &:hover{
            scale: 0.90;
        }
    }

    .leftSideIcons{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        
    }

    .sideButtons{
        display: ${props => props.sideSlider || props.leftSlider ? "block" : "none"};
        white-space: nowrap;
        overflow: hidden;
        
    }

    .componentController{
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
    }

    .component{
        font-weight: 500;
        width: 100%;
        padding: 10px 10px;
        font-size: medium;
        display: flex;
        align-items: center;
        justify-content: ${props => props.sideSlider || props.leftSlider ? "start" : "center"};
        gap: 5px;
        color: white;
        transition: all 0.3s ease-in-out;
        border-radius: 8px;
        cursor: pointer;

        &:hover{
            background-color: whitesmoke;
            color: black;
            transform: translateY(-5px);
        }
    }

    .activeComponent{
        color: black;
        background-color: whitesmoke;
    }

    `
