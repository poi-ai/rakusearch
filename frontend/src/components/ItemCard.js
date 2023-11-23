import React from 'react';

function ItemCard({ item }) {

    // 半角を1文字、全角を2文字として70文字以上の場合はそれ以降を...で置き換える
    const moldItemName = (name) => {
        let length = 0;
        let truncatedName = '';

        for (const char of name) {
            // 全角半角判定
            const isFullwidth = char.match(/[^\x01-\x7E]/) !== null;
            length += isFullwidth ? 2 : 1;

            // 70文字を超えたら、全角文字を優先して切り詰め
            if (length > 70) {
                truncatedName += '...';
                break;
            }

            truncatedName += char;
        }
        return truncatedName;
    }

    // 商品画像が存在しない場合はNo Imageを表示する
    const imageCheck = (imageFlag, imageUrl) => {
        if (imageFlag === '1') {
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
    const priceRangeCheck = (minPrice, maxPrice) => {
        if (minPrice === maxPrice) {
            return addCommasToNumber(minPrice) + '円';
        } else {
            return addCommasToNumber(minPrice) + '円 ～ ' + addCommasToNumber(maxPrice) + '円';
        }
    }

    // 送料判定
    const postageCheck = (postageFlag) =>{
        if (postageFlag === '1') {
            return '+ 送料';
        } else {
            return '送料無料';
        }
    }

    // クレカ判定
    const creditCheck = (creditFlag) => {
        // 一旦非表示
        return '';
        if (creditFlag === 1) {
            return <span class="credit-ok">クレジット決済OK</span>;
        } else {
            return <span class="credit-ng">クレジット決済NG</span>;
        }
    }

    // ポイント倍率
    const pointRate = (pointRate) => {
        if (pointRate === '1.0'){
            return <div className='point-one-ratio'>ポイント1倍</div>;
        } else if (Number.isInteger(parseFloat(pointRate))) {
            return <div className='point-multi-ratio'>ポイントo{parseInt(pointRate)}倍</div>;
        } else {
            return <div className='point-multi-ratio'>ポイントo{pointRate}倍</div>;
        }
    }

    // ポイント倍率変更期間
    const pointRateTime = (startTime, endTime) => {
        if (startTime === null) {
            return '';
        }
        return startTime + '~' + endTime;
    }

    // レビュー表示
    const review = (count, rate) => {
        let html = [];
        for (let i = 1; i <= 5; i++) {
            if (rate >= i) {
                html.push(<span key={i} className="review-star">★</span>);
            } else {
                html.push(<span key={i}>☆</span>);
            }
        }

        if (count === 0) {
            html.push('-.-- (0件)');
        } else {
            html.push(rate + ' (' + count + '件)');
        }

        return <>{html}</>; // または <div>{html}</div> など、必要に応じたラップ要素を選択
    }

    //
    const moldTimeFormat = (timeStr) => {
        return timeStr.replace('T', ' ').replace('.000000Z', '');
    }

    // 3桁ごとにカンマを挿入
    function addCommasToNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="col-md-auto my-4">
            <div className="card">
                <div className="image-frame">
                    <img src={imageCheck(item.image_flag, item.medium_image_url)} className="card-img-top" alt={item.item_name} onError={handleImageError} />
                </div>
                <div className="card-body">
                    <h5 className="card-title"><a href={item.item_url} target="blank_">{moldItemName(item.item_name)}</a></h5>
                    <div className="--bs-danger card-text">
                        <span className='item-price'>{priceRangeCheck(item.item_price_min, item.item_price_max)}</span>
                        <span>{postageCheck(item.postage_flag)}</span>
                        {creditCheck(item.credit_card_flag)}
                    </div>
                    <div>
                        {pointRate(item.point_rate)}
                        {pointRateTime(item.point_rate_start_time, item.point_rate_end_time)}
                    </div>
                    <div></div>
                    <div>{review(item.review_count, item.review_average)}</div>
                    <div className="shop-name"><a href={item.shop_url} target="blank_">{item.shop_name}</a></div>
                    <div className="latest-update">最終更新: {moldTimeFormat(item.updated_at)}</div>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
