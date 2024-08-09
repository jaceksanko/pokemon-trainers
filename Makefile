.PHONY: dev prod

dev:
	docker-compose up app

prod:
	docker-compose up production