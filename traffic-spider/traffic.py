import json
import random
import urllib.parse as p
from time import sleep

import requests
import pymysql

db = pymysql.connect(host='127.0.0.1', user='root', password='123456', port=3396, database='traffic',
                         charset='utf8')

header = {

        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
    }

def save_info(item):
    if not 'RXDMJ' in item:
        item['RXDMJ'] = '0'
    if not 'LX' in item:
        item['LX'] = '暂无'
    if not 'LDMJ' in item:
        item['LDMJ'] = '0'
    sql3 = "replace into tb_info(id, lm, qs, lx, dj, cd, rdmj, rxdmj) " \
           "values (%d, '%s', '%s', '%s', '%s', '%s', '%s', '%s') " % \
           ( item['ID'], item['LM'], item['QS'], item['LX'],
             item['DJ'], item['CD'], item['LDMJ'], item['RXDMJ'])
    cursor = db.cursor()
    cursor.execute(sql3)
    db.commit()

def save_road(item):
    # if not 'RXDMJ' in item:
    #     item['RXDMJ'] = '0'
    # if not 'LX' in item:
    #     item['LX'] = '暂无'
    # if not 'LDMJ' in item:
    #     item['LDMJ'] = '0'
    flow = random.randint(1, 99) + item['EXPONENT']*100
    sql3 = "replace into tb_road(golen, speed, time1, period, blockid, gotime, exponent, flow) " \
           "values (%lf, %lf, '%s', %d, %d, %lf, %lf, %d) " % \
           ( item['GOLEN'], item['SPEED'], item['TIME1'], item['PERIOD'],
             item['BLOCKID'], item['GOTIME'], item['EXPONENT'], flow)
    cursor = db.cursor()
    cursor.execute(sql3)
    db.commit()

def get_road_info():
    url = 'https://opendata.sz.gov.cn/api/1142747625/1/service.xhtml?appKey=bdc80b65c3b1411bb6ed8b2876de40bd&rows=700'
    # 发送json
    data = json.dumps({'page': 1, 'rows': 700})
    ret = requests.post(url, headers=header, data=data)
    json_data = json.loads(ret.text)
    for row in json_data['data']:
        print(row)
        save_info(row)

def get_traffic(page):
    url = 'https://opendata.sz.gov.cn/api/29200_00403589/1/service.xhtml?appKey=bdc80b65c3b1411bb6ed8b2876de40bd&rows=1000&page=' + page
    # 发送json
    data = json.dumps({'page': 1, 'rows': 200})
    ret = requests.post(url, headers=header, data=data)
    json_data = json.loads(ret.text)
    print(json_data)
    for row in json_data['data']:
        print(row)
        # save_info(row)
        save_road(row)

if __name__ == '__main__':
    # 目前所有的数据都已经爬取了，如果再爬取会有重复
    # 获取道路信息，已成功爬取所有 
    get_road_info()
    # 获取路况信息
    for i in range(390,400):
        print(i)
        sleep(6)
        get_traffic(str(i))