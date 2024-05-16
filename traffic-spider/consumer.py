from pykafka import KafkaClient
import psycopg2
 
client = KafkaClient(hosts="broker1:port1,broker2:port2,broker3:port3")

topic = client.topics['topcons']  #
 

balanced_consumer = topic.get_balanced_consumer(
consumer_group=bytes('consumer1',encoding='utf-8'),
auto_commit_enable=True,
zookeeper_connect='zk1:port1,zk2:port1,zk3:port3/path'
)
 
 
# arrs=[]
insertarr=[]
 
for message in balanced_consumer:
    print(message)
    if message is not None:

        arrs=str(message.value, encoding="utf8").split('=.=')
        for arr in arrs:
            a=arr.split('-.-')
            insertarr.append(a)
    try:
		conn = psycopg2.connect(database=database, user=user, password=password,
                                   host=ip,
                                   port=port)
		cur = conn.cursor()
        print(insertarr)
        cur.executemany(sql, insertarr)
        conn.commit()
        insertarr = []
        conn.close()
    except Exception as e:

        insertarr=[]
        conn.close()