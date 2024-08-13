make .PHONY: dev prod

install:
	npm install
	npx husky init
	echo 'npm run test:list' > .husky/pre-commit

dev:
	docker-compose up app

prod:
	docker-compose up production

clean:
	docker-compose down --volumes
	docker-compose rm -f