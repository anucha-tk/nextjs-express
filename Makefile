dev-postgres-local:
	docker compose --env-file .env.development up -d postgres
stop:
	docker compose stop
down:
	docker compose --env-file .env.development down
restart:
	docker compose restart
logs:
	docker compose logs -f
