-- sql/schema.sql
create table matches (
  id uuid primary key default gen_random_uuid(),
  deck text not null,
  opponent text not null,
  result text check (result in ('Win', 'Loss')) not null,
  created_at timestamp with time zone default now()
);
