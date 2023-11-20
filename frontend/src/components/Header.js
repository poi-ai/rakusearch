// Header.js

import React from 'react';

const Header = () => {
    return (
        <div style={headerStyle}>
            <div style={brandStyle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-zoom-in" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                    <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"/>
                    <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
                <h3 style={siteNameStyle}>楽サーチ</h3>
                <div style={naviStyle}>
                    <a style={naviTextStyle} href="/">ホーム</a>
                    <span style={separateStyle}>｜</span>
                    <a style={naviTextStyle} href="/about">About</a>
                    <span style={separateStyle}>｜</span>
                    <a style={naviTextStyle} href="/contact">Contact</a>
                </div>
            </div>
        </div>
    );
};

const headerStyle = {
    backgroundColor: '#e0eaf5',
    color: '#000',
    //position: 'fixed', # ヘッダーを上部固定
    top: 0,
    width: '100%',
    //zIndex: 500,
    //'@media (max-width: 767px)': {
    //    zindex: 500,
    //},
};

const brandStyle = {
    display: 'flex',
    textAlign: 'left',
    padding: '10px',
    paddingBottom: '5px',
    alignItems: 'center',
    marginBottom: '0',
};

const siteNameStyle = {
    marginLeft: '10px',
    fontWeight: 'bold',
};

const naviStyle = {
    marginLeft: '30px',
};

const naviTextStyle = {
    fontSize: '17px',
    color: 'black',
    //style={{ display: 'flex', justifyContent: 'center' }}
};

const separateStyle = {
    color: 'gray',
    marginLeft: '5px',
    marginRight: '5px',
};

export default Header;
