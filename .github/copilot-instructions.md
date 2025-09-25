# Copilot Instructions for AI Agents

## Project Overview
- NestJS (TypeScript) REST API for managing scuba diving logs with domain-driven architecture
- Core domains: users, dive logs, dive sites, buddies, and equipment
- Key technical stack: TypeORM (PostgreSQL), JWT authentication, class-validator
- All entities belong to a user and require authentication to access

## Architecture & Data Flow
- **Domain Modules**: Each domain has its own module (`src/[domain]/`) containing:
  - Entity (`.entity.ts`): Defines DB schema and relationships
  - Controller (`.controller.ts`): Handles HTTP endpoints
  - Service (`.service.ts`): Contains business logic
  - DTOs (`dto/`): Validates request payloads
- **Entity Relations (defined in `*.entity.ts`):**
  ```
  User
   ├── owns many DiveLogs
   ├── owns many Equipment items
   └── owns many Buddies
        └── optional link to another User
  
  DiveLog
   ├── belongs to one User
   ├── belongs to one DiveSite
   └── has many Buddies (through DiveLogBuddy)
  ```

## Security & Authentication
- **JWT Implementation** (`src/auth/`):
  - All routes protected by default via `JwtAuthGuard`
  - Use `@Public()` decorator to expose public endpoints
  - Permissions enforced by `PermAuthGuard` - users can only access their own data
- **Password Handling** (`src/auth/auth.service.ts`):
  - Passwords hashed with bcrypt before storage
  - Never expose `password` field in responses (see `users.controller.ts`)

## Data Validation Patterns
- **Input Validation** - Use class-validator decorators in DTOs:
```typescript
export class CreateDiveLogDto {
  @IsNotEmpty()
  userId: number;
  
  @IsDateString()
  date: string;
  
  @IsNumber()
  depth: number;
}
```
- Always validate requests through DTOs in controllers

## Error Handling & Best Practices
- **Service Layer Pattern:**
  - Controllers only transform requests/responses
  - All business logic lives in services
  - Use TypeORM repository pattern in services
- **Database Queries:**
  - Use TypeORM relations for eager loading (`relations: [...]`)
  - See `dive-logs.service.ts` for eager loading examples
  - CASCADE deletes configured in entity relations

## Common Tasks
1. **Adding New Features:**
   - Generate scaffolding: `nest g module/controller/service [name]`
   - Create entity, DTO, and register in `AppModule`
   - Add JWT protection (already global) and permission checks
   
2. **Database Changes:**
   - Add fields to entity classes
   - Update relevant DTOs
   - Development uses `synchronize: true` (auto-migration)

## Environment Setup
Required environment variables:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_NAME=scubalog
JWT_SECRET=your-secret-key
```

## Key Files for Context
- `src/app.module.ts`: Module registration and DB config
- `src/auth/perm-auth.guard.ts`: Permission enforcement logic
- `src/dive-logs/dive-logs.service.ts`: Complex relation handling

## Testing Patterns
- Unit tests: Focus on service layer logic
- E2E tests: Test full HTTP endpoints with auth
- Use `TestingModule` for dependency injection
