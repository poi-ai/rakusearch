// App.js (React)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from './components/ItemCard';
import Header from './components/Header';
import SideBar from './components/SideBar';

const App = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemNum, setItemNum] = useState(10);

    const handlePageChange = (page) => {
        // 新しいページを計算してセット
        const newPage = currentPage + page;

        // 新しいページが有効な範囲内であればセット
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleItemNumChange = (e) => {
        setItemNum(e.target.value);
        setCurrentPage(1);
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/items?page=${currentPage}&itemNum=${itemNum}`);
                setItems(response.data.data);
                setTotalPages(response.data.last_page);
            } catch (e) {
                return e;
            }
        })();
    }, [currentPage, itemNum]);

    return (
        <div>
            <Header />
            <div style={{ minWidth: '1000px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ minWidth: '200px' }}><SideBar/></div>
                <div style={{ minWidth: '700px' }}>
                    <select value={itemNum} onChange={handleItemNumChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    {items.length > 0 && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                {items.map((item) => (
                                    <ItemCard item={item} key={item.id} />
                                ))}
                            </div>
                            <div>
                                <button onClick={() => handlePageChange(-1)} disabled={currentPage - 1 <= 0}>
                                    戻る
                                </button>
                                <button onClick={() => handlePageChange(-2)} disabled={currentPage - 2 <= 0}>
                                    {currentPage - 2}
                                </button>
                                <button onClick={() => handlePageChange(-1)} disabled={currentPage - 1 <= 0}>
                                    {currentPage - 1}
                                </button>
                                <span>{currentPage}</span>
                                <button onClick={() => handlePageChange(1)} disabled={currentPage + 1 > totalPages}>
                                    {currentPage + 1}
                                </button>
                                <button onClick={() => handlePageChange(2)} disabled={currentPage + 2 > totalPages}>
                                    {currentPage + 2}
                                </button>
                                <button onClick={() => handlePageChange(1)} disabled={currentPage + 1 > totalPages}>
                                    次へ
                                </button>
                                <span>全{totalPages}ページ</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
