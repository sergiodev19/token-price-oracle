#!/bin/bash

# Start Minikube (if not running)
minikube start --driver=docker

# Get Minikube IP
MINIKUBE_IP=$(minikube ip)

# Update /etc/hosts to point your services to Minikube IP
echo "$MINIKUBE_IP account-service.local price-oracle.local" | sudo tee -a /etc/hosts

SCRIPT_DIR=$(dirname "$0")

# Deploy MongoDB
kubectl apply -f "$SCRIPT_DIR/manifests/mongo-deployment.yaml"
# Deploy Redis
kubectl apply -f "$SCRIPT_DIR/manifests/redis-deployment.yaml"

# Deploy microservices
helm install account-service "$SCRIPT_DIR/charts/account-service"
helm install price-oracle-service "$SCRIPT_DIR/charts/price-oracle-service"

echo "Deployment complete!"
