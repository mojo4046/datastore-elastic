# Use the official OpenSearch image as the base
FROM opensearchproject/opensearch:2.12.0

# Set environment variables to configure the OpenSearch node
ENV cluster.name=opensearch \
    node.name=opensearch-node1 \
    discovery.seed_hosts=opensearch-node1,opensearch-node2,opensearch-node3 \
    cluster.initial_cluster_manager_nodes=opensearch-node1,opensearch-node2,opensearch-node3 \
    bootstrap.memory_lock=true \
    OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m \
    DISABLE_INSTALL_DEMO_CONFIG=true \
    DISABLE_SECURITY_PLUGIN=true

# Set memory lock limit
RUN ulimit -l unlimited

# Expose the necessary ports
EXPOSE 9200 9600

# Define the entry point to start the OpenSearch service
ENTRYPOINT ["/usr/share/opensearch/bin/opensearch"]
