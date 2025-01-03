import csv
import random


POST_TYPES = ['carousel', 'reel', 'static image']
NUM_RECORDS = 10

USER_IDs = ['ga97ag','6aah4','646ag','626ah27']

# Function to generate random engagement metrics
def generate_engagement_data():
    return {
        "likes": random.randint(10, 1000), 
        "shares": random.randint(1, 500),
        "comments": random.randint(0, 200),
        "post_type": random.choice(POST_TYPES)
    }


output_file = "social_media_engagement.csv"

# Generate the dataset and save to CSV
with open(output_file, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    # Write the header
    writer.writerow(["user_id", "post_type", "likes", "shares", "comments"])
    # Write the rows
    for index in range(NUM_RECORDS):
        data = generate_engagement_data()
        writer.writerow([USER_IDs[index%4],data["post_type"], data["likes"], data["shares"], data["comments"]])

print(f"Dataset has been generated and saved to {output_file}.")

