from pyspark.sql import SparkSession
from pyspark.sql.functions import sum, desc

# Create a Spark session
spark = SparkSession.builder \
    .appName("Offline Data Analytics Processing") \
    .getOrCreate()

# Read the historical traffic data from a CSV file stored in HDFS
trafficData = spark.read.option("header", "true").csv("hdfs:///traffic_data.csv")

# Group the data by 'roadID' and aggregate the counts of vehicles
roadTrafficCounts = trafficData.groupBy("roadID") \
    .agg(sum("vehicleCount").alias("totalVehicles")) \
    .orderBy(desc("totalVehicles"))

# Show the results
roadTrafficCounts.show()

# Optionally, save the results back to HDFS in CSV format
roadTrafficCounts.write.option("header", "true").csv("hdfs:///output/roadTrafficCounts.csv")

# Stop the Spark session
spark.stop()
