from elasticsearch import Elasticsearch
from faker import Faker
import uuid
import random
import time
from datetime import datetime, timedelta
from multiprocessing import Process, current_process

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
        "notification_date": notification_date,
        "summary": summary,
        "content": content,
        "type": doc_type,
        "sender_type": sender_type,
        "sender_id": sender_id
    }

# Function to send random documents to Elasticsearch
def send_random_documents(num_docs):
    es_local = Elasticsearch(['http://localhost:9200'])
    index_name = "notifications"
    for i in range(num_docs):
        doc_data = generate_random_document()
        es_local.index(index=index_name, id=doc_data["id"], body=doc_data)
        print(f"{current_process().name} indexed document {doc_data['id']} successfully!")
        time.sleep(random.uniform(0.001, 2))

# Function to start multiprocessing
def start_processes(num_docs, num_processes):
    jobs = []
    docs_per_process = num_docs // num_processes

    for i in range(num_processes):
        process = Process(target=send_random_documents, args=(docs_per_process,))
        jobs.append(process)
        process.start()

    for job in jobs:
        job.join()

if __name__ == '__main__':
    num_documents_to_send = 100000  # Total documents to send
    num_processes = 100  # Number of processes to spin up

    start_processes(num_documents_to_send, num_processes)
