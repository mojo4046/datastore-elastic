# datastore-elastic

## Standard Ports

**9200**: The default port for the OpenSearch HTTP interface. This is used for RESTful operations and communications with the OpenSearch cluster.

**9300**: The default port for internal OpenSearch node-to-node communication. This port is used for the cluster’s nodes to talk to each other.

## Endpoints
`/_cat/health`: Provides a snapshot of the health of the cluster. It’s a quick way to see if your cluster is functioning correctly.

`/_cat/nodes`: Displays information about nodes in the cluster, such as IP addresses, heap usage, CPU usage, and version.

`/_cat/indices`: Lists all indices in the cluster along with their health status, number of documents, and disk size.

`/_search`: Used to execute search queries across one or more indices.

`/_cluster/stats`: Provides statistics about the cluster’s state, including the number of nodes, shards, and more.

`/_cat/master`: Displays information about the master node of the cluster.