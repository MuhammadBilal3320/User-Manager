import { useState } from 'react';
import ManagerContext from './Context.jsx'

const UseState = (props) => {

    const [mainData, setMainData] = useState([]);
    const [fetchAllDeleted, setFetchAllDeleted] = useState([]);
    const [activeComponent, setActiveComponent] = useState('My Vault'); 
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "white");
    const [leftSlider, setLeftSlider] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [createButton, setCreateButton] = useState(false);
    const [editButton, setEditButton] = useState(false);
    const [selectedData, setSelectedData] = useState({id:"", title:"", emailOrUser:"", password:"", message:""})
    const [filteredResults, setFilteredResults] = useState(mainData);
    const [activeCard, setActiveCard] = useState(null);
    const [itemHighlighter, setItemHighlighter] = useState(null);


    return (
        <ManagerContext.Provider value={{
        fetchAllDeleted, setFetchAllDeleted,
        activeCard, setActiveCard,
        mainData, setMainData,
        activeComponent, setActiveComponent,
        theme, setTheme, 
        leftSlider, setLeftSlider, 
        editModal, setEditModal, 
        createButton, setCreateButton,
        editButton, setEditButton,
        selectedData, setSelectedData,
        filteredResults, setFilteredResults,
        itemHighlighter, setItemHighlighter
        }}>
            {props.children}
        </ManagerContext.Provider>
        
    )
}

export default UseState
