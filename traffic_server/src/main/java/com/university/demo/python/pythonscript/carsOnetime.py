from pyspark.sql import SparkSession
from pyspark.sql.functions import window, sum, col
from pyspark.sql.types import StructType, StringType, IntegerType, TimestampType

# Initialize a Spark session
spark = SparkSession.builder \
    .appName("HDFS Real-Time Vehicle Count") \
    .getOrCreate()

# Define the schema of the incoming data
schema = StructType() \
    .add("timestamp", TimestampType()) \
    .add("count", IntegerType())

# Create DataFrame representing the stream of input lines from HDFS
df = spark \
    .readStream \
    .option("maxFilesPerTrigger", 1)  # Optional: Define how many files to process per trigger
.schema(schema) \
    .csv("hdfs:///path/to/your/directory")

# Apply window operation to group data into 30-second intervals and sum the counts
countsByWindow = df \
    .groupBy(window(col("timestamp"), "30 seconds")) \
    .agg(sum("count").alias("totalVehicles"))

# Start running the query that prints the output to the console
query = countsByWindow \
    .writeStream \
    .outputMode("update") \
    .format("console") \
    .option("truncate", "false") \
    .start()

query.awaitTermination()
