DELETE notifications

DELETE notification-views

PUT notifications 
{
  "mappings": {
    "properties": {
      "id" : { "type" : "text"}, 
      "title" : { "type" : "text" },
      "content" : { "type" : "text" },
      "type" : { "type" : "keyword" }
    }
  }
}

POST /notifications/_doc/1
{
  "id": "c4b3fe15-ae9c-458c-9797-82e6e1b4faae",
  "title": "Sandy Processor sent you a note re: Andy Applicant",
  "content": "Please review consumer reports",
  "type": "Note"
}

POST /notifications/_doc/2
{
  "id": "8dd7e92e-eb75-40ea-8b6e-11a260db3d33",
  "title": "Sandy Processor sent you a note re: Andy Applicant",
  "content": "Please review consumer reports",
  "type": "Message"
}

GET notifications/_search
{
  "query" : {
    "query_string" : {
      "query" : "type:Note"
    }
  }
}

GET notifications/_search
{
  "query" : {
    "query_string" : {
      "query" : "title:Sandy"
    }
  }
}

PUT notification-views
{
  "mappings": {
    "properties": {
      "query" : {
        "type" : "percolator"
      },
      "id" : { "type" : "text" },
      "title" : { "type" : "text" },
      "content" : { "type" : "text" },
      "type" : { "type" : "keyword" },
      "view_id" : { "type" : "text" }
    }
  }
}

PUT notification-views/_doc/type_note
{
  "query" : {
    "query_string" : {
      "query" : "type:Note"
    }
  },
  "view_id" : "0d8e06e8-7e6e-4e92-98fc-9498e8f49087"
}

PUT notification-views/_doc/type_message
{
  "query" : {
    "query_string" : {
      "query" : "type:Message"
    }
  },
  "view_id" : "d8b3ef58-0208-4adb-af19-6ed29c40b093"
}

PUT notification-views/_doc/from_sandy
{
  "query" : {
    "query_string" : {
      "query" : "title:Sandy"
    }
  },
  "view_id" : "a2856eab-e9f4-4fd6-b8ba-625705f516a1"
}

GET notification-views/_search
{
  "query": {
    "percolate": {
      "field": "query",
      "index" : "notifications",
      "id" : "1"
    }
  }
}
