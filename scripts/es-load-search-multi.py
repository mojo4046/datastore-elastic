import random
from multiprocessing import Process
from elasticsearch import Elasticsearch

# Possible values for 'type' and 'sender_type' fields
types = ["Note", "Email", "Text"]
sender_types = ["Applicant", "Pursuit"]

# Connect to Elasticsearch
es = Elasticsearch(['http://localhost:9200'])

# Function to generate a random search query
def generate_random_search_query():
    search_type = random.choice(types)
    search_sender_type = random.choice(sender_types)

    query = {
        "query": {
            "bool": {
                "must": [
                    {"match": {"type": search_type}},
                    {"match": {"sender_type": search_sender_type}}
                ]
            }
        }
    }
    return query

# Function to send a search request to Elasticsearch
def send_random_search_query():
    local_es = Elasticsearch(['http://localhost:9200'])
    query = generate_random_search_query()
    response = local_es.search(index="notifications", body=query)
    print(f"Search query: {query}")
    print(f"Found {response['hits']['total']['value']} results")

# Function to execute search queries in parallel processes
def execute_search_queries_in_parallel(num_processes, num_queries_per_process):
    processes = []

    for _ in range(num_processes):
        p = Process(target=send_search_queries, args=(num_queries_per_process,))
        processes.append(p)
        p.start()

    for p in processes:
        p.join()

# Function that each process will run to send search queries
def send_search_queries(num_queries):
    for _ in range(num_queries):
        send_random_search_query()

if __name__ == '__main__':
    num_processes = 50  # Number of processes to create
    num_queries_per_process = 1000  # Number of search queries each process will send

    execute_search_queries_in_parallel(num_processes, num_queries_per_process)
