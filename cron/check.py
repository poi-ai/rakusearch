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

            # ポイント10倍以上の商品のみ出力
            if item['pointRate'] <= 10:
                continue

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