# Start Minikube
minikube start --driver=docker

# Install kubectl (if not installed)
curl -LO "https://dl.k8s.io/release/v1.25.0/bin/darwin/amd64/kubectl"
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl

# Install Helm (if not installed)
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Add Traefik Helm repository
helm repo add traefik https://helm.traefik.io/traefik
helm repo update

# Install Traefik
helm install traefik traefik/traefik --namespace kube-system --create-namespace
