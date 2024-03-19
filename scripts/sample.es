DELETE cars

DELETE cars-queries

PUT cars 
{
  "mappings": {
    "properties": {
      "brand" : { "type" : "keyword" },
      "model" : { "type" : "keyword" },
      "price" : { "type" : "long" }
    }
  }
}

POST /cars/_doc/2
{
  "brand": "Tesla",
  "model": "4"
}

GET cars/_search
{
  "query" : {
    "query_string" : {
      "query" : "model:3"
    }
  }
}

GET cars/_search
{
  "query" : {
    "query_string" : {
      "query" : "model:3 AND brand:Tesla"
    }
  }
}

PUT cars-queries
{
  "mappings": {
    "properties": {
      "query" : {
        "type" : "percolator"
      },
      "brand" : { "type" : "keyword" },
      "model" : { "type" : "keyword" },
      "price" : { "type" : "long" }
    }
  }
}

PUT cars-queries/_doc/tesla_alert
{
  "query" : {
    "query_string" : {
      "query" : "brand:Tesla"
    }
  }
}

PUT cars-queries/_doc/tesla_model3_alert
{
  "query" : {
    "query_string" : {
      "query" : "brand:Tesla AND model:3"
    }
  }
}

GET cars-queries/_search
{
  "query": {
    "percolate": {
      "field": "query",
      "index" : "cars",
      "id" : "2"
    }
  }
}


