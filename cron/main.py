import config
import csv
import genre
import json
import os
import requests
import time

def main():
    # ジャンルIDごとに更新商品を取得
    for genre_dict in genre.genre_list:
        time.sleep(2)
        genre_id = next(iter(genre_dict))
        r = requests.get(f'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?applicationId={config.APPLICATION_ID}&genreId={genre_id}')
        item_list = json.loads(r.content)['Items']
        # 商品ごとに処理
        for item in item_list:
            item = item['Item']

            with open('rakuten_item.csv', 'a', newline='', encoding='shift-jis', errors='ignore') as file:
                writer = csv.writer(file)

                # 商品データをCSVに書き込む
                for item in item_list:
                    item = item['Item']

                    row = [
                        item['itemName'],
                        item['itemCode'],
                        item['itemUrl'],
                        item['itemPriceMax1'],
                        item['itemPriceMin1'],
                        item['imageFlag'],
                    ]

                    if item['imageFlag'] == 1:
                        row.append(item['mediumImageUrls'][0]['imageUrl'])
                    else:
                        row.append('')

                    row.extend([
                        item['taxFlag'],
                        item['postageFlag'],
                        item['creditCardFlag'],
                        item['startTime'],
                        item['endTime'],
                        item['reviewCount'],
                        item['reviewAverage'],
                        item['pointRate'],
                        item['pointRateStartTime'],
                        item['pointRateEndTime'],
                        item['shopName'],
                        item['shopCode'],
                        item['shopUrl'],
                        item['shopAffiliateUrl']
                    ])

                    writer.writerow(row)

            # ポイント10倍のみ抽出
            if item['pointRate'] <= 10:
                continue

            print('-----------------------')
            # 商品名
            print(item['itemName'])
            # 商品コード
            print(item['itemCode'])
            # 商品URL(affId設定時はaffUrl)
            print(item['itemUrl'])
            # 商品価格最大
            print(item['itemPriceMax1'])
            # 商品価格最低
            print(item['itemPriceMin1'])
            # アフィリエイトURL (GETパラメータにaffId指定必須)
            # print(item['affiliateUrl'])
            # 商品画像フラグ
            print(item['imageFlag'])
            if item['imageFlag'] == 1:
                # 商品画像(1枚目 128x128)
                print(item['mediumImageUrls'][0]['imageUrl'])
            # 税込みフラグ 0: 税込、1: 税別
            print(item['taxFlag'])
            # 送料フラグ 0: 送料込、1: 送料別
            print(item['postageFlag'])
            # クレカ利用可フラグ 0: 不可、1: 可
            print(item['creditCardFlag'])
            # タイムセール開始時刻
            print(item['startTime'])
            # タイムセール終了時刻
            print(item['endTime'])
            # レビュー件数
            print(item['reviewCount'])
            # レビュー平均
            print(item['reviewAverage'])
            # 商品別ポイント倍率
            print(item['pointRate'])
            # 商品別ポイント倍率変更開始日時
            print(item['pointRateStartTime'])
            # 商品別ポイント倍率変更終了日時
            print(item['pointRateEndTime'])
            # 店舗名
            print(item['shopName'])
            # 店舗コード
            print(item['shopCode'])
            # 店舗URL (affId指定時はaffURL)
            print(item['shopUrl'])
            # アフィリエイト店舗URL
            print(item['shopAffiliateUrl'])
            print('-----------------------')

def file_exist_check():
    # CSVファイル名
    csv_file = 'rakuten_item.csv'

    # CSVファイルが存在するか確認
    file_exists = os.path.exists(csv_file)

    if file_exists:
        return

    # ヘッダー行
    header = [
        '商品名',
        '商品コード',
        '商品URL',
        '商品価格最大',
        '商品価格最低',
        '商品画像フラグ',
        '商品画像URL',
        '税込みフラグ',
        '送料フラグ',
        'クレカ利用可フラグ',
        'タイムセール開始時刻',
        'タイムセール終了時刻',
        'レビュー件数',
        'レビュー平均',
        '商品別ポイント倍率',
        '商品別ポイント倍率変更開始日時',
        '商品別ポイント倍率変更終了日時',
        '店舗名',
        '店舗コード',
        '店舗URL',
        'アフィリエイト店舗URL'
    ]

    with open(csv_file, 'a', newline='', encoding='shift-jis') as file:
        writer = csv.writer(file)

        # ファイルが存在しない場合、ヘッダー行を書き込む
        writer.writerow(header)

file_exist_check()
main()