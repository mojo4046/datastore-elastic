from elasticsearch import Elasticsearch
from faker import Faker
import uuid
import random
import time

# Connect to Elasticsearch
es = Elasticsearch(['http://localhost:9200'])

# Function to generate a random document
def generate_random_document():
    fake = Faker()
    doc_id = str(uuid.uuid4())
    title = fake.sentence()
    content = fake.paragraph()
    doc_type = random.choice(["Note", "Reminder", "Alert"])  # Randomly select a type
    return {
        "id": doc_id,
        "title": title,
        "content": content,
        "type": doc_type
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
num_documents_to_send = 10000  # Change this to the desired number of documents

# Send random documents
send_random_documents(num_documents_to_send)
