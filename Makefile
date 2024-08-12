.PHONY: dev prod

dev:
	docker-compose up app

prod:
	docker-compose up production

down:
	docker-compose down --volumes

clean:
	docker-compose down --volumes
	docker-compose rm -f