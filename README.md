## Kando Backend

This backend provides a API for task management, including user registration, authentication, and CRUD operations for tasks

### Requirements

Supabase PostgreSQL database with two tables: users and tasks

```sql
-- Status Enum
CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'completed');

-- Tasks
create table public.tasks (
  id uuid not null default gen_random_uuid (),
  status public.tasks_status_enum not null default 'todo'::tasks_status_enum,
  created_at timestamp without time zone not null default now(),
  updated_at timestamp without time zone not null default now(),
  title character varying not null,
  description character varying not null,
  constraint tasks_pkey primary key (id)
) TABLESPACE pg_default;

create trigger update_task_updated_at BEFORE
update on tasks for EACH row
execute FUNCTION update_updated_at_column ();

-- Users
create table public.users (
  id uuid not null default extensions.uuid_generate_v4 (),
  email character varying not null,
  password character varying not null,
  created_at timestamp without time zone not null default now(),
  updated_at timestamp without time zone not null default now(),
  constraint users_pkey primary key (id)
) TABLESPACE pg_default;

create trigger update_user_updated_at BEFORE
update on users for EACH row
execute FUNCTION update_updated_at_column ();
```

### Project setup

```bash
$ npm install
```

### Configure environment variables

Create a .env file at the root of the project based on .env.example

### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

API base URL: http://localhost:3001

Swagger documentation: http://localhost:3001/api

### License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
