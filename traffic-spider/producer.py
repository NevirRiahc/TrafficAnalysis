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
    strings=[]
    count = 0
    for row in rows:
        file = urllib.request.urlopen(row[2],timeout=5)
 
        try: 
            data = file.read()
            isBan=str(data).find('baned str', 3000)
            if(isBan!=-1):
                string='ip band'
            else:
                selector = etree.HTML(data)
                data = selector.xpath('//*[@id="zhengwen"]/p/span/text()')

                for i in data:
                    if (i != None):
                        string = string + i  
 

            content=row[0]+'-.-'+row[1]+'-.-'+string+'-.-'+row[3]+'-.-'+row[4]
            # put in list
            strings.append(content)
            # clean
            string = ''
  
            print("list len：",len(strings))
            count = count + 1

            if (count >= 10):
 
                insertManyRow(strings)
                strings = []
                count = 0
        except Exception as e:
            print("error：%s" % (e))
 
if __name__ == '__main__':
    conn = psycopg2.connect(database=database, user=user,password=password,
                                   host=ip,
                                   port=port)
    cur = conn.cursor()
    
    cur.execute(sql1)
    rows = cur.fetchall()

    start=time.time()
    # 10 threads
    with ThreadPoolExecutor(10) as executor:
        for i in range(0, len(rows)//10, 1):
            executor.submit(productList, rows[i*10:(i+1)*10])
    end = time.time()
    print("time: " + str(end - start))
    conn.close()
 