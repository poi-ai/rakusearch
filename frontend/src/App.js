import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from './components/ItemCard';
import Header from './components/Header';
import SideBar from './components/SideBar';

const App = () => {
    const [value, setValue] = useState([]);

    // laravelの商品情報取得API
    const url = 'http://localhost:8000/api/items';

    useEffect(() => {
        (async () => {
            try {
                axios.get(url).then(res => {
                    setValue(res.data)
                })
            } catch (e) {
                return e;
            }
        })();
    }, []);

    return (
        <div>
            <Header />
            <div style={{ minWidth: '1000px', display: 'flex', justifyContent: 'center' }} >
                <div style={{ minwidth: '200px' }}><SideBar /></div>
                <div style={{ minwidth: '700px' }}>
                    {value.length > 0 && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                {value.map((item) => (
                                    <ItemCard item={item} key={item.id} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
