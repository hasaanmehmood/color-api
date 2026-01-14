##Instructions:

1. Push image color db to dockerhub
2. Apply secrets: kubectl apply -f mongodb-colordb-creds.yaml
3. Apply stateful sets:  kubectl apply -f mongodb-ss.yaml 
4. Apply service and color api:  kubectl apply -f color-api.yaml -f color-svc.yaml
5. Expose 
6. Cleanup:
kubectl delete -f mongodb-init-colordb.yaml -f mongodb-colordb-creds.yaml -f mongodb-root-creds.yaml
kubectl get pvc
kubectl delete pvc mongodb-data-mongodb-ss-0