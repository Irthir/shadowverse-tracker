-- sql/views.sql
create view match_stats as
select
  deck,
  opponent,
  count(*) as total,
  sum(case when result = 'Win' then 1 else 0 end)::float / count(*) as winrate
from matches
group by deck, opponent;
