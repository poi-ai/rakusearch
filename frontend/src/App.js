import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from './components/ItemCard';
import Header from './components/Header';
import SideBar from './components/SideBar';

const App = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // laravelの商品情報取得API
    const url = `http://localhost:8000/api/items?page=${currentPage}`;

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(url);
                setItems(response.data.data);
                setTotalPages(response.data.last_page);
            } catch (e) {
                return e;
            }
        })();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Header />
            <div style={{ minWidth: '1000px', display: 'flex', justifyContent: 'center' }} >
                <div style={{ minwidth: '200px' }}><SideBar /></div>
                <div style={{ minwidth: '700px' }}>
                    {items.length > 0 && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                {items.map((item) => (
                                    <ItemCard item={item} key={item.id} />
                                ))}
                            </div>
                            <div>
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                    Previous
                                </button>
                                <span>{currentPage}</span> / <span>{totalPages}</span>
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
