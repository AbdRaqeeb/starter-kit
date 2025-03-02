# Define a variable that will hold the arguments passed from the command line
ARGS :=

migrate-add:
	bunx knex migrate:make $(ARGS) --knexfile ./knex/knexfile.ts -x ts

migrate-run:
	bun --bun --env-file .env.local knex migrate:latest --knexfile ./knex/knexfile.ts

migrate-rollback:
	bun --bun --env-file .env.local knex migrate:rollback --knexfile ./knex/knexfile.ts

migrate-rollback-all:
	bun --bun --env-file .env.local knex migrate:rollback --all --knexfile ./knex/knexfile.ts

migrate-run-test:
	bun --bun --env-file .env.test knex migrate:latest --knexfile ./knex/knexfile.ts --env test

migrate-rollback-test:
	bun --bun --env-file .env.test knex migrate:rollback --knexfile ./knex/knexfile.ts --env test

migrate-rollback-all-test:
	bun --bun --env-file .env.test knex migrate:rollback --all --knexfile ./knex/knexfile.ts --env test

seed-add:
	bunx knex seed:make $(ARGS) --knexfile ./knex/knexfile.ts --timestamp-filename-prefix -x ts

seed-run:
	bun --bun --env-file .env.local knex seed:run --knexfile ./knex/knexfile.ts

seed-run-test:
	bun --bun --env-file .env.test knex seed:run --knexfile ./knex/knexfile.ts --env test

ba-migrate-add:
	bunx @better-auth/cli@latest generate --config src/lib/better_auth/index.ts --output knex/ba_migrations/$$(date +"%Y%m%d_%H%M%S")_auth_migration.sql --y

ba-migrate-run:
	bunx @better-auth/cli@latest migrate --config src/lib/better_auth/index.ts

.PHONY: dev build test
