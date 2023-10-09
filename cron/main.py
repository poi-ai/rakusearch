import requests

r = requests.get('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?applicationId=applicationId&keyword=%E7%A6%8F%E8%A2%8B&sort=%2BitemPrice')

print(r.content)