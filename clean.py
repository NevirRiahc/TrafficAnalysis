import json
import pandas as pd

# 假设你的JSON文件名为'traffic_data.json'
file_path = 'path_to_your_json/traffic_data.json'

# 加载JSON数据
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# 将JSON数据转换为DataFrame
df = pd.DataFrame(data)

# Type check
df['路名'] = df['路名'].astype(str)
df['区属'] = df['区属'].astype(str)
df['类型'] = df['类型'].astype('category')
df['等级'] = df['等级'].astype('category')
# Value check
df['长度'] = pd.to_numeric(df['长度'], errors='coerce')
df['路段面积'] = pd.to_numeric(df['路段面积'], errors='coerce')
df['人行道面积'] = pd.to_numeric(df['人行道面积'], errors='coerce')

df = df[(df['长度'] >= 0) & (df['路段面积'] >= 0) & (df['人行道面积'] >= 0)]

# 检查数据以确认清洗结果
print(df.head())

# 如果需要，将清洗后的数据保存到新的JSON文件
cleaned_file_path = 'path_to_your_json/cleaned_traffic_data.json'
df.to_json(cleaned_file_path, orient='records', force_ascii=False)
# 确保路名、区属、类型和等级为字符串类型
# 将长度、路段面积和人行道面积转换为数值类型，并移除负值