# ジャンルの階層情報をDB(genresテーブル)に追加する処理
# 最初の一回だけ起動
import config
import genre
import json
import pymysql
import requests
import time

class GenreInsert:
    def __init__(self):
        self.db_config = {
            'host': config.HOST_NAME,
            'user': config.USER_NAME,
            'password': config.PASSWORD,
            'db': config.DB_NAME,
            'port': config.PORT
        }
        self.connection = None

    def connect(self):
        self.connection = pymysql.connect(**self.db_config)

    def main(self):
        # 最上位階層のジャンルを取得
        for genre_dict in genre.genre_list:
            # ジャンルID・ジャンル名を抽出
            genre_id = next(iter(genre_dict))
            genre_name = next(iter(genre_dict.values()))

            self.genre_operate(genre_id, genre_name, 1)

    def genre_operate(self, genre_id, genre_name, hierarchy, genres_dict = None):

        # テーブル用エンティティを取得
        if genres_dict == None:
            genres_dict = self.genres_entity()
        genres_dict['genre_id'] = genre_id
        genres_dict['genre_name'] = genre_name
        genres_dict['hierarchy'] = hierarchy
        genres_dict[f'genre{hierarchy}_id'] = genre_id

        # 現階層より下の階層はリセット
        for index in range(hierarchy + 1, 6):
            genres_dict[f'genre{index}_id'] = None

        # レコード追加
        self.insert_genres(genres_dict)

        # 5階層目ならそれ以下はないので返す
        if hierarchy == 5:
            return

        # APIで子ジャンルを取得する
        time.sleep(2)
        r = requests.get(f'https://app.rakuten.co.jp/services/api/IchibaGenre/Search/20140222?applicationId={config.APPLICATION_ID}&genreId={genre_id}')
        genres_info = json.loads(r.content)

        # 子ジャンルをリストで取得
        children = genres_info['children']

        if len(children) == 0:
            return

        # 子ジャンルがあればそれに対して再帰で処理
        for child in children:
            genre_id = child['child']['genreId']
            genre_name = child['child']['genreName']
            genre_level = child['child']['genreLevel']

            self.genre_operate(genre_id, genre_name, genre_level, genres_dict)

    def insert_genres(self, genres_dict):
        try:
            if not self.connection:
                self.connect()

            with self.connection.cursor() as cursor:
                # カラム名と値を含む辞書からINSERT文を生成
                columns = ', '.join(genres_dict.keys())
                placeholders = ', '.join(['%s'] * len(genres_dict))
                sql = f"INSERT INTO genres ({columns}) VALUES ({placeholders})"
                cursor.execute(sql, list(genres_dict.values()))
                self.connection.commit()
        except Exception as e:
            print(e)
            return

    def genres_entity(self):
        # カラム名をキーに持つ空の辞書を返す
        return {
            'genre_id': None,
            'genre_name': None,
            'hierarchy': None,
            'genre1_id': None,
            'genre2_id': None,
            'genre3_id': None,
            'genre4_id': None,
            'genre5_id': None
        }

if __name__ == '__main__':
    gi = GenreInsert()
    gi.main()
