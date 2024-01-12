import React, { useEffect, useState } from 'react';
import "./styles/main-page.css";

const MainPage = () => {
    let userParses;
    if (localStorage.getItem('User')) {
        const user: any = localStorage.getItem('User');
        userParses = JSON.parse(user);
    } 

    const chooseOptions = ["All", "Pants", "Hoodies", "T-Shirts", "Towels", "Bed Sheets"];
    const [modalOpen, setModalOpen] = useState<Boolean>(false);
    const [modalName, setModalName] = useState<string>();    
    const [modalCategory, setModalCategory] = useState<string>();
    const [modalLastTimeWashed, setModalLastTimeWashed] = useState<string>();

    return (
        <div className='main-wrapper'>
            <div className="main-container">
                <div className="header">
                    <div className="user-info-container">
                        <div className="user-photo"></div>
                        <div className="user-info">
                            <small>Hello</small>
                            <strong>{localStorage.getItem('User') ? userParses.userName : ''}</strong>
                        </div>
                    </div>
                    <div className="search-bar-container">
                        <div className="search-logo"></div>
                        <input type="text" placeholder='Search...'/>
                        <div className="search-button">Search</div>
                    </div>
                    <div className="search-options">
                        <select className='item'>
                            {chooseOptions.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                        <div onClick={() => setModalOpen(modalOpen ? false : true)} className="add-item-button">Add Item</div>
                    </div>
                </div>
                <div className="empty-box">Empty</div>
                <div style={{display: modalOpen ? 'block' : 'none'}} className="modal-window">
                    <div onClick={() => setModalOpen(modalOpen ? false : true)} className="close-btn"><p>X</p></div>
                    <div className="modal-input-wrapper">
                        <input
                        value={modalName}
                        onChange={(e) => setModalName(e.target.value)} 
                        placeholder='Name' 
                        className='modal-name' 
                        type="text" />
                        <input
                        value={modalCategory}
                        onChange={(e) => setModalCategory(e.target.value)} 
                        placeholder='Category' 
                        className='modal-category' 
                        type="text" />
                        <input
                        value={modalLastTimeWashed}
                        onChange={(e) => setModalLastTimeWashed(e.target.value)} 
                        placeholder='Last time washed' 
                        className='modal-last-time-washed' 
                        type="text" />
                        <div className="modal-add-item-button">ADD ITEM</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;