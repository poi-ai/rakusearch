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
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {items.map((item) => (
                                    <ItemCard item={item} key={item.id} style={{ flex: '0 0 calc(33.33% - 10px)' }} />
                                ))}
                            </div>
                            <div>
                                <ul class="pagination">
                                    <li class={`page-item ${currentPage - 1 <= 0 ? 'disabled' : ''}`}>
                                        <a class="page-link" onClick={() => handlePageChange(-1 * currentPage + 1)}>
                                            &laquo;
                                        </a>
                                    </li>
                                    <li class={`page-item ${currentPage - 1 <= 0 ? 'disabled' : ''}`}>
                                        <a class="page-link" onClick={() => handlePageChange(-1)}>
                                            &lt;
                                        </a>
                                    </li>
                                    <li class={`page-item ${currentPage - 5 <= 0 ? 'disabled' : ''}`}>
                                        <a class="page-link" onClick={() => handlePageChange(-5)}>
                                            {currentPage - 5 <= 0 ? '・' : currentPage - 5}
                                        </a>
                                    </li>
                                    <li class={`page-item ${currentPage - 4 <= 0 ? 'disabled' : ''}`}>
                                        <a class="page-link" onClick={() => handlePageChange(-4)}>
                                            {currentPage - 4 <= 0 ? '・' : currentPage - 4}
                                        </a>
                                    </li>
                                    <li class={`page-item ${currentPage - 3 <= 0 ? 'disabled' : ''}`}>
                                        <a class="page-link" onClick={() => handlePageChange(-3)}>
                                            {currentPage - 3 <= 0 ? '・' : currentPage - 3}
                                        </a>
                                    </li>
                                    <li class={`page-item ${currentPage - 2 <= 0 ? 'disabled' : ''}`}>
                                        <a class="page-link" onClick={() => handlePageChange(-2)}>
                                            {currentPage - 2 <= 0 ? '・' : currentPage - 2}
                                        </a>
                                    </li>
                                    <li class={`page-item ${currentPage - 1 <= 0 ? 'disabled' : ''}`}>
                                        <a class="page-link" onClick={() => handlePageChange(-1)}>
                                            {currentPage - 1 <= 0 ? '・' : currentPage - 1}
                                        </a>
                                    </li>
                                    <li class="page-item active">
                                        <span class="page-link">{currentPage}</span>
                                    </li>
                                    <li class={`page-item ${currentPage + 1 > totalPages ? 'disabled' : ''}`}>
                                        <a class="page-link" onClick={() => handlePageChange(1)}>
                                            {currentPage + 1 > totalPages ? '・' : currentPage + 1}
                                        </a>
                                    </li>
                                    <li class={`page-item ${currentPage + 2 > totalPages ? 'disabled' : ''}`}>
                                        <a class="page-link" onClick={() => handlePageChange(2)}>
                                            {currentPage + 2 > totalPages ? '・' : currentPage + 2}
                                        </a>
                                    </li>
                                    <li class={`page-item ${currentPage + 3 > totalPages ? 'disabled' : ''}`}>
                                        <a class="page-link" onClick={() => handlePageChange(3)}>
                                            {currentPage + 3 > totalPages ? '・' : currentPage + 3}
                                        </a>
                                    </li>
                                    <li class={`page-item ${currentPage + 4 > totalPages ? 'disabled' : ''}`}>
                                        <a class="page-link" onClick={() => handlePageChange(4)}>
                                            {currentPage + 4 > totalPages ? '・' : currentPage + 4}
                                        </a>
                                    </li>
                                    <li class={`page-item ${currentPage + 5 > totalPages ? 'disabled' : ''}`}>
                                        <a class="page-link" onClick={() => handlePageChange(5)}>
                                            {currentPage + 5 > totalPages ? '・' : currentPage + 5}
                                        </a>
                                    </li>
                                    <li class={`page-item ${currentPage + 1 > totalPages ? 'disabled' : ''}`}>
                                        <a class="page-link" onClick={() => handlePageChange(1)}>
                                            &gt;
                                        </a>
                                    </li>
                                    <li class={`page-item ${currentPage + 1 > totalPages ? 'disabled' : ''}`}>
                                        <a class="page-link" onClick={() => handlePageChange(totalPages - currentPage)}>
                                            &raquo;
                                        </a>
                                    </li>
                                    <span>全{totalPages}ページ</span>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
