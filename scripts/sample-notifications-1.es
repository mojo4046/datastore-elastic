DELETE notifications

DELETE notifications_percolate

DELETE notification_views


PUT /notifications
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1
  },
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "title": {
        "type": "text",
        "analyzer": "standard"
      },
      "notification_date": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "summary": {
        "type": "text",
        "analyzer": "standard"
      },
      "content": {
        "type": "text",
        "analyzer": "standard"
      },
      "type": {
        "type": "keyword"
      },
      "sender_type": {
        "type": "keyword"
      },
      "sender_id": {
        "type": "keyword"
      }
    }
  }
}

POST /notifications/_doc/1
{
  "id": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
  "title": "Andy Applicant's status changed to Processing",
  "notification_date": "2024-03-19T15:00:00Z",
  "summary": "Please review",
  "content": "Changed to processing",
  "type": "Note",
  "sender_type": "applicant",
  "sender_id": "83c1184f-323e-4875-ac08-4eca9bae571f"
}

GET notifications/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "type": "Note"
          }
        },
        {
          "match": {
            "sender_type": "Applicant"
          }
        }
      ]
    }
  }
}

PUT /notification_views
{
  "mappings": {
    "properties": {
      "query": {
        "type": "percolator"
      },
      "type": {
        "type": "keyword"
      },
      "sender_type": {
        "type": "keyword"
      }
    }
  }
}

// Add view to index
POST /notification_views/_doc/1
{
  "query": {
    "bool": {
      "must": [
        {"match": {"type": "Note"}},
        {"match": {"sender_type": "Applicant"}}
      ]
    }
  }
}

// Percolate a document
GET /notification_views/_search
{
  "query": {
    "percolate": {
      "field": "query",
      "document": {
        "id": "d130f2b6-c3fa-499d-935c-faa92acec587",
        "title": "Success heavy prepare call true follow.",
        "notification_date": "2024-02-12T15:44:19.664724",
        "summary": "Medical water yard.",
        "content": "Environmental writer point four among mouth sit. Again film right. Stock reality meet moment word position.",
        "type": "Note",
        "sender_type": "Applicant",
        "sender_id": "47955d4c-7692-4202-9130-74c160abd972"
        }
    }
  }
}

