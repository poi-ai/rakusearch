import React from 'react';

function ItemCard({ item }) {
    return (
        <div className="col-md-4">
            <div className="card">
                <img src={item.medium_image_url} className="card-img-top" alt={item.item_name} />
                <div className="card-body">
                    <h5 className="card-title"><a href={item.item_url} target="blank_">{item.item_name}</a></h5>
                    <p className="card-text">{item.item_price_min}円</p>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
