from pykafka import KafkaClient
import psycopg2
 
client = KafkaClient(hosts="broker1:端口1,broker2:端口2,broker3:端口3")

topic = client.topics['指定发送的topic名称']  # 选择一个topic
 
#获得一个均衡的消费者
balanced_consumer = topic.get_balanced_consumer(
consumer_group=bytes('消费者组名',encoding='utf-8'),
auto_commit_enable=True,# 设置为False的时候不需要添加consumer_group,直接连接topic即可取到消息
#kafka在zk上的路径，这个路径应该和kafka的broker配置的zk路径一样（不然zk上会放得乱七八糟的。。。）
zookeeper_connect='zk1:端口1,zk2:端口1,zk3:端口3/kafka在zk上的路径'
)
 
 
# arrs=[]
insertarr=[]
 
for message in balanced_consumer:
    print(message)
    if message is not None:
        #print(message.offset, message.value, type(message.value), str(message.value, encoding="utf8"))
		#将接受到的数据转换成executemany能接受的数据格式
        arrs=str(message.value, encoding="utf8").split('=.=')
        for arr in arrs:
            a=arr.split('-.-')
            insertarr.append(a)
    try:
		conn = psycopg2.connect(database="数据库", user="用户名", password="密码",
                                   host="ip",
                                   port="端口")
		cur = conn.cursor()
        sql = "INSERT INTO 数据库.表名(字段1,字段2,字段3,字段4,字段5) VALUES(%s,%s,%s,%s,%s)"
        print(insertarr)
        cur.executemany(sql, insertarr)
        conn.commit()
        insertarr = []
        conn.close()
    except Exception as e:
        print("插入错误：%s" % (e))
        insertarr=[]
        conn.close()