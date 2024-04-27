from concurrent.futures import ThreadPoolExecutor
import time
import urllib.request
import  psycopg2
from lxml import etree
from pykafka import KafkaClient
 
 
def Produce(strings):
    print('Produce:',strings)
    b="=.=".join(strings)
    try:
        client = KafkaClient(hosts="broker1:Port1,broker2:Port2")
        topic = client.topics['flume-kafka']  
        with topic.get_sync_producer() as producer:
            producer.produce(bytes(b, encoding="utf8"))
    except Exception as e:
        print("Failure%s" % (e))
      
 
def productList(rows):
    string=''
    # 将多条数据放入list中
    strings=[]
    count = 0
    for row in rows:
        file = urllib.request.urlopen(row[2],timeout=5)
 
        try: 
            data = file.read()
            isBan=str(data).find('被封号的字符串', 3000)
            if(isBan!=-1):
                string='ip被封'
            else:
                selector = etree.HTML(data)
                data = selector.xpath('//*[@id="zhengwen"]/p/span/text()')
                # 将获取到的多个正文内容拼接成一条字符串
                for i in data:
                    if (i != None):
                        string = string + i  
 
            # 打印查看
            print('正文：', string)
            # 将数据库中一条数据的多个字段通过 -.- 拼接到一起
            content=row[0]+'-.-'+row[1]+'-.-'+string+'-.-'+row[3]+'-.-'+row[4]
            # 放入list中
            strings.append(content)
            # 清空字符串
            string = ''
            print("集合：", strings)
            print("集合长度：",len(strings))
            count = count + 1
            # 每十条数据就调用一次kafka生产者的代码
            if (count >= 10):
                print('进入到insertManyRow')
                insertManyRow(strings)
                strings = []
                count = 0
        except Exception as e:
            print("线程出错：%s" % (e))
 
if __name__ == '__main__':
    conn = psycopg2.connect(database="数据库", user="用户名", password="密码",
                                   host="ip",
                                   port="端口")
    cur = conn.cursor()
    
    sql = "查询的sql，查出未处理的url"
    cur.execute(sql1)
    rows = cur.fetchall()
    print('拉取到数据')
    start=time.time()
    # 开启10个线程，每个线程每次拉取10条url
    with ThreadPoolExecutor(10) as executor:
        for i in range(0, len(rows)//10, 1):
            executor.submit(productList, rows[i*10:(i+1)*10])
    end = time.time()
    print("time: " + str(end - start))
    conn.close()
 