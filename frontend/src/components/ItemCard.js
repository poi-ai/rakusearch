import React from 'react';

function ItemCard({ item }) {

    // 商品名が30文字以上の場合は...で置き換える
    const ItemName = (name) => {
        if (name.length > 30) {
            return name.slice(0, 30) + '...';
        } else {
            return name;
        }
    }

    // 商品画像が存在しない場合はNo Imageを表示する
    const imageFlag = (imageFlag, imageUrl) => {
        if (imageFlag == 1) {
            return imageUrl;
        } else {
            return 'https://biccamera.rakuten.co.jp/c/src/img/common/img-noimage.png';
        }
    };

    // 画像データが削除されていた場合No Imageを表示
    const handleImageError = (e) => {
        e.target.src = 'https://biccamera.rakuten.co.jp/c/src/img/common/img-noimage.png';
    };

    // 個数の違いなどで商品価格が複数存在する場合は~表示を行う
    const priceRange = (minPrice, maxPrice) => {
        if (minPrice = maxPrice) {
            return addCommasToNumber(minPrice) + '円';
        } else {
            return addCommasToNumber(minPrice) + '円 ～ ' + addCommasToNumber(maxPrice) + '円';
        }
    }

    // 送料判定
    const postageFlag = (postageFlag) =>{
        if (postageFlag == 1) {
            return '+ 送料';
        } else {
            return '送料無料';
        }
    }

    // クレカ判定
    const creditFlag = (creditFlag) => {
        if (creditFlag == 1) {
            return <small class="d-inline-flex mb-3 px-2 py-1 fw-semibold text-success-emphasis bg-success-subtle border border-success-subtle rounded-2">Added in v5.2.0</small>;
        } else {
            return <span class="label label-danger">クレジット払い不可</span>;
        }
    }

    // ポイント倍率 .0の表示をなくす
    const pointRate = (pointRate) => {
        if (Number.isInteger(parseFloat(pointRate))) {
          return parseInt(pointRate);
        } else {
          return pointRate;
        }
    }

    // 3桁ごとにカンマを挿入
    function addCommasToNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="col-md-4">
            <div className="card">
                <img src={imageFlag(item.image_flag, item.medium_image_url)} className="card-img-top" onError={handleImageError} />
                <div className="card-body">
                    <h5 className="card-title"><a href={item.item_url} target="blank_">{ItemName(item.item_name)}</a></h5>
                    <p className="--bs-danger card-text">{priceRange(item.item_price_min, item.item_price_max)} {postageFlag(item.postage_flag)}</p>
                    <p className="card-text">ポイント{pointRate(item.point_rate)}倍</p>
                    <div>{creditFlag(item.credit_card_flag)}</div>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
