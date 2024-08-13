make .PHONY: dev prod

dev:
	docker-compose up app

prod:
	docker-compose up production

clean:
	docker-compose down --volumes
	docker-compose rm -f