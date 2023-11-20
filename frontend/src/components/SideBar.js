// SideBar.js

import React from 'react';

const SideBar = () => {
    return (
        <nav className="d-md-block ">
            <div className="">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a href="/" className="nav-link">ダッシュボード</a>
                    </li>
                    <li className="nav-item">
                        <a href="/users" className="nav-link">ユーザー</a>
                    </li>
                    <li className="nav-item">
                        <a href="/products" className="nav-link">製品</a>
                    </li>
                    {/* 追加のサイドバーメニューアイテムをここに追加できます */}
                 </ul>
            </div>
        </nav>
    );
};

export default SideBar;