import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from './components/ItemCard';
import Header from './components/Header';

const App = () => {
    const [value, setValue] = useState([]);

    // laravelの商品情報取得API
    const url = 'http://localhost:8000/api/items';

    useEffect(()=>{
        (async ()=>{
            try {
                axios.get(url).then(res => {
                    setValue(res.data)
                })
            } catch (e) {
                return e;
            }
        })();
    },[]);

    return (
        <div>
            <Header />
            {value.length > 0 && (
            <div className="container">
                <div className="row">
                    {value.map((item) => (
                        <ItemCard item = {item} />
                    ))}
                </div>
            </div>
            )}
        </div>
    );
}

export default App;