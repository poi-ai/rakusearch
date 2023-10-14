import config
import genre
import json
import pymysql
import re
import requests
import time

class Main():
    def __init__(self):
        self.itemdb = ItemsTableHandler()

    def main(self):
        # ジャンルIDごとに更新商品を取得
        for genre_dict in genre.genre_list:
            # ジャンルID取得
            genre_id = next(iter(genre_dict))

            # 楽天市場APIから指定したジャンルの最新更新商品を取得
            time.sleep(2)
            r = requests.get(f'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?applicationId={config.APPLICATION_ID}&genreId={genre_id}')

            # dict変換
            item_list = json.loads(r.content)['Items']

            # 1商品ごとに処理
            for item in item_list:
                item = item['Item']
                item_entity = self.itemdb.entity()

                # カラム処理
                for key, value in item.items():
                    # レスポンスカラムのキャメルケースをDBカラムのスネークケースに書き直す
                    snake_key = self.camel_to_snake(key)

                    # 例外ケースのみ個別対応
                    if snake_key == 'item_price_max1':
                        item_entity['item_price_max'] = value
                        continue

                    if snake_key == 'item_price_min1':
                        item_entity['item_price_min'] = value
                        continue

                    if snake_key == 'image_flag' and value == 1:
                        item_entity['medium_image_url'] = item['mediumImageUrls'][0]['imageUrl'].replace('?_ex=128x128', '')

                    # エンティティにキー(=テーブルにカラム)があり、NULLでなければ追加
                    if snake_key in item_entity and value != '':
                        item_entity[snake_key] = value
                        
                #print(item_entity)
                #exit()

                # レコード追加
                self.itemdb.insert_item(item_entity)

    def camel_to_snake(self, name):
        '''キャメルケースをスネークケースに'''
        s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
        return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

class ItemsTableHandler:
    def __init__(self):
        self.db_config = {
            'host': config.HOST_NAME,
            'user': config.USER_NAME,
            'password': config.PASSWORD,
            'db': config.DB_NAME,
            'port': config.PORT
        }
        self.connection = pymysql.connect(**self.db_config)

    def entity(self):
        # カラム名と同名のキーを持ち、値は全てNoneのdict型エンティティを生成
        entity = {
            'item_code': None,
            'item_name': None,
            'item_url': None,
            'item_price_max': None,
            'item_price_min': None,
            'affiliate_url': None,
            'image_flag': None,
            'medium_image_url': None,
            'tax_flag': None,
            'postage_flag': None,
            'credit_card_flag': None,
            'start_time': None,
            'end_time': None,
            'review_count': None,
            'review_average': None,
            'point_rate': None,
            'point_rate_start_time': None,
            'point_rate_end_time': None,
            'shop_name': None,
            'shop_code': None,
            'shop_url': None,
            'shop_affiliate_url': None
        }
        return entity

    def insert_item(self, item_entity):
        with self.connection.cursor() as cursor:
            sql = '''
                INSERT INTO items
                (item_code, item_name, item_url, item_price_max, item_price_min, affiliate_url, image_flag,
                medium_image_url, tax_flag, postage_flag, credit_card_flag, start_time, end_time,
                review_count, review_average, point_rate, point_rate_start_time, point_rate_end_time,
                shop_name, shop_code, shop_url, shop_affiliate_url)
                VALUES
                (%(item_code)s, %(item_name)s, %(item_url)s, %(item_price_max)s, %(item_price_min)s, %(affiliate_url)s, %(image_flag)s,
                %(medium_image_url)s, %(tax_flag)s, %(postage_flag)s, %(credit_card_flag)s, %(start_time)s, %(end_time)s,
                %(review_count)s, %(review_average)s, %(point_rate)s, %(point_rate_start_time)s, %(point_rate_end_time)s,
                %(shop_name)s, %(shop_code)s, %(shop_url)s, %(shop_affiliate_url)s) 
                ON DUPLICATE KEY UPDATE
                item_name = VALUES(item_name),
                item_url = VALUES(item_url),
                item_price_max = VALUES(item_price_max),
                item_price_min = VALUES(item_price_min),
                affiliate_url = VALUES(affiliate_url),
                image_flag = VALUES(image_flag),
                medium_image_url = VALUES(medium_image_url),
                tax_flag = VALUES(tax_flag),
                postage_flag = VALUES(postage_flag),
                credit_card_flag = VALUES(credit_card_flag),
                start_time = VALUES(start_time),
                end_time = VALUES(end_time),
                review_count = VALUES(review_count),
                review_average = VALUES(review_average),
                point_rate = VALUES(point_rate),
                point_rate_start_time = VALUES(point_rate_start_time),
                point_rate_end_time = VALUES(point_rate_end_time),
                shop_name = VALUES(shop_name),
                shop_code = VALUES(shop_code),
                shop_url = VALUES(shop_url),
                shop_affiliate_url = VALUES(shop_affiliate_url)
            '''
            cursor.execute(sql, item_entity)
            self.connection.commit()

if __name__ == '__main__':
    m = Main()
    m.main()
