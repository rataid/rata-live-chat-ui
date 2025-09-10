```
docker-compose -f docker-compose.prod.yml build frontend
docker tag nxsdvlpr/rata-dynamic-frontend:latest 775410964859.dkr.ecr.ap-southeast-1.amazonaws.com/nxsdvlpr/rata-dynamic-frontend:latest
docker push 775410964859.dkr.ecr.ap-southeast-1.amazonaws.com/nxsdvlpr/rata-dynamic-frontend:latest

kubectl rollout restart deployment frontend

kubectl apply -f k8s/frontend
```
