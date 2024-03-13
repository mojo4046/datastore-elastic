DELETE queries

PUT /queries
{
  "mappings": {
    "properties": {
      "query": {
        "type": "percolator"
      },
      "brand": { "type": "text" }
    }
  }
}

PUT /documents
{
  "mappings": {
    "properties": {
      "first_name": { "type": "text" },
      "last_name": { "type": "text"},
      "state_code": { "type": "text"}
      }
    }
  }
}

POST /my_document_index/_doc/1
{
  "brand": "Tesla",
  "model": "Model 3"
}

// add sample query to queries index
PUT my_queries_index/_doc/tesla_model_3_alert
{
  "query" : {
    "query_string" : {
      "query" : "brand:Tesla"
    }
  }
}

GET my_queries_index/_search
{
  "query": {
    "percolate": {
      "field": "query",
      "index" : "my_document_index",
      "id" : "1"
    }
  }
}