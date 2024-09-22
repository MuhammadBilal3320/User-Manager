import React, { useContext } from 'react'
import styled from 'styled-components'
import ManagerContext from './context/Context'
import { FaPlus } from 'react-icons/fa';

const HomeEmpty = () => {

    const {theme, activeComponent, setActiveComponent, setEditButton,  setEditModal, setCreateButton, setSelectedData} = useContext(ManagerContext);

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
        <EmptyMainContainer activeComponent={activeComponent} theme={theme}>


            <img className={`${theme === "white" ? "invert" : "invert-1"}`} src="./images/empty.png" alt="empty" width={"200px"}  />

            <div className="textArea">{ activeComponent === "Deleted Items" ? "No Deleted Items":"Protect Yourself" } </div>
            
            <button onClick={createHandler} className={`addButton`} >
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
        display: ${(props)=> props.activeComponent === "Deleted Items" ? "none":"flex"};
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
