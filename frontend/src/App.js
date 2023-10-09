import React from 'react';
import ProductCard from './components/ProductCard';

function App() {
  return (
    <div className="container">
      <h1>ECサイトの検索結果</h1>
      <div className="row">
        <div className="col-md-4">
          <ProductCard
            title="商品1"
            price={1000}
            description="この商品は素晴らしい商品です。"
          />
        </div>
        <div className="col-md-4">
          <ProductCard
            title="商品2"
            price={1500}
            description="別の素晴らしい商品です。"
          />
        </div>
        {/* 他の商品カードも同様に追加 */}
      </div>
    </div>
  );
}

export default App;
