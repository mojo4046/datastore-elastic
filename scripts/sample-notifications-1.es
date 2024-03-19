DELETE notifications


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
