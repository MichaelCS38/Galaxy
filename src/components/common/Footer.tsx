/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './style.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="content-footer">
                <div className="footer__left">
                    © TRADEon 2025
                </div>
                <div className="footer__right">
                    <a href="#" className="footer__link">Privacy Policy</a>
                    <a href="#" className="footer__link">Term of Services</a>
                    <a href="#" className="footer__link">404</a>
                </div>
            </div>
        </footer>
    );
}
export default Footer;