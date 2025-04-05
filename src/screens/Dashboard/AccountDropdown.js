import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/cc.css';

const AccountDropdown = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = (event) => {
        event.preventDefault(); 
        setIsOpen(!isOpen);
    };

    return (
        <div className="account-wrap">
            <div className="account-item clearfix js-item-menu">
                <div className="image">
                    <img src={user.image} alt={user.name} />
                </div>
                <div className="content">
                    <a className="js-acc-btn" href="#" onClick={toggleDropdown}>
                        {user.name}
                    </a>
                    <FontAwesomeIcon icon={faChevronDown} size="1x" />
                </div>
                <div className={`account-dropdown js-dropdown ${isOpen ? 'show' : ''}`}>
                    <div className="info clearfix">
                        <div className="image">
                            <a href="#">
                                <img src={user.image} alt={user.name} />
                            </a>
                        </div>
                        <div className="content">
                            <h5 className="name">
                                <a href="#">{user.name}</a>
                            </h5>
                            <span className="email">{user.email}</span>
                        </div>
                    </div>
                    <div className="account-dropdown__body">
                        <div className="account-dropdown__item">
                            <a href="#">
                                <i className="zmdi zmdi-account" />Account
                            </a>
                        </div>
                        <div className="account-dropdown__item">
                            <a href="#">
                                <i className="zmdi zmdi-settings" />Setting
                            </a>
                        </div>
                        <div className="account-dropdown__item">
                            <a href="#">
                                <i className="zmdi zmdi-money-box" />Billing
                            </a>
                        </div>
                    </div>
                    <div className="account-dropdown__footer">
                        <a href="#">
                            <i className="zmdi zmdi-power" />Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDropdown;
