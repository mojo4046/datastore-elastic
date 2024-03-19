from elasticsearch import Elasticsearch
from faker import Faker
import uuid
import random
import time
from datetime import datetime, timedelta

# Connect to Elasticsearch
es = Elasticsearch(['http://localhost:9200'])

start_date = datetime.now() - timedelta(days=60)
end_date = datetime.now()

# Function to generate a random document
def generate_random_document():
    fake = Faker()
    doc_id = str(uuid.uuid4())
    title = fake.sentence()
    
    random_days = random.randint(0, (end_date - start_date).days)
    random_date = start_date + timedelta(days=random_days)
    notification_date = random_date.isoformat()
 
    summary = fake.sentence()
    content = fake.paragraph()
    doc_type = random.choice(["Note", "Email", "Text"])  # Randomly select a type

    sender_type = random.choice(["Applicant", "Pursuit"])
    sender_id = str(uuid.uuid4())
    
    return {
        "id": doc_id,
        "title": title,
        "notficiation_date": notification_date,
        "summary": summary,
        "content": content,
        "type": doc_type,
        "sender_type": sender_type,
        "sender_id": sender_id
    }

# Function to send random documents to Elasticsearch
def send_random_documents(num_docs):
    index_name = "notifications"
    for i in range(num_docs):
        doc_data = generate_random_document()
        es.index(index=index_name, body=doc_data)
        print(f"Document {i+1} indexed successfully!")
        time.sleep(0.5)
        
# Configurable number of documents to send
num_documents_to_send = 1000  # Change this to the desired number of documents

# Send random documents
send_random_documents(num_documents_to_send)
