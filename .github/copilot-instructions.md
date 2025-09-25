# Copilot Instructions for AI Agents

## Project Overview
- This is a NestJS (TypeScript) REST API for managing scuba diving logs, users, buddies, dive sites, and equipment.
- The codebase is modular: each domain (users, dive-logs, dive-sites, buddies, equipment, auth) has its own folder with controller, service, entity, and DTOs.
- Data persistence uses TypeORM with PostgreSQL. Entities are defined in `src/*/*.entity.ts` and registered in `AppModule`.
- Authentication uses JWT (see `src/auth/`). Most endpoints are designed to be protected by `JwtAuthGuard` (some guards are commented for now).

## Key Files & Structure
- `src/main.ts`: App entrypoint, sets up global validation.
- `src/app.module.ts`: Root module, wires up all feature modules and TypeORM config (reads DB config from env vars).
- `src/auth/`: Handles registration, login, JWT strategy, and guards.
- `src/users/`, `src/dive-logs/`, `src/dive-sites/`, `src/buddies/`, `src/equipment/`: Each has `*.controller.ts`, `*.service.ts`, `*.entity.ts`, and `dto/` for request validation.
- `test/`: Contains e2e tests and Jest config.

## Developer Workflows
- **Install dependencies:** `npm install`
- **Run in dev mode:** `npm run start:dev`
- **Run tests:** `npm run test` (unit), `npm run test:e2e` (e2e), `npm run test:cov` (coverage)
- **Build for prod:** `npm run start:prod`
- **DB config:** Set `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` in environment variables. `synchronize: true` is enabled for dev only.
- **JWT secret:** Set `JWT_SECRET` in env vars.

## Project-Specific Patterns
- **DTOs**: All input is validated via DTOs in `dto/` folders. Use these for request bodies.
- **Entity Relations:**
  - `User` has many `DiveLog`, `Buddy`, `Equipment`.
  - `DiveLog` links to `User`, `DiveSite`, many `Buddy` and `Equipment`.
  - `DiveSite` has many `DiveLog`.
- **Password Handling:** Passwords are hashed with bcrypt before storage. Never expose `password` in API responses.
- **Guards:** Use `JwtAuthGuard` for protected routes. Some controllers have commented-out guards for future enforcement.
- **Service Pattern:** All business logic is in `*.service.ts`. Controllers are thin and delegate to services.
- **TypeORM:** Use repository pattern via `@InjectRepository`.

## Integration & Extensibility
- Add new features by creating a new module with controller, service, entity, and DTOs.
- To add new entity relations, update both entity files and register in `AppModule`.
- For new protected endpoints, apply `@UseGuards(JwtAuthGuard)`.

## Examples
- See `src/users/users.controller.ts` for user CRUD and password hiding.
- See `src/auth/auth.service.ts` for registration/login and JWT issuance.
- See `src/dive-logs/dive-logs.service.ts` for entity relations and eager loading.

## Conventions
- Use async/await and Promises for all DB and service calls.
- Always validate input with DTOs.
- Never return sensitive fields (like `password`).
- Keep controllers thin; put logic in services.

---

For more, see `README.md` and the `src/` directory for module structure and patterns.
