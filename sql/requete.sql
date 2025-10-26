-- Table principale des parties
create table public.matches (
  id uuid primary key default gen_random_uuid(),
  played_at timestamptz not null default now(),
  deck_1 text not null check (deck_1 in ('Abyssal', 'Sylvestre', 'Royal', 'Ecclésiastique', 'Esotérique', 'Draconique', 'Dimensionnel')),
  deck_2 text not null check (deck_2 in ('Abyssal', 'Sylvestre', 'Royal', 'Ecclésiastique', 'Esotérique', 'Draconique', 'Dimensionnel')),
  result text not null check (result in ('deck_1_win', 'deck_2_win', 'draw')),
  notes text
);

-- Index pour accélérer les stats
create index idx_matches_played_at on public.matches (played_at desc);
create index idx_matches_decks on public.matches (deck_1, deck_2);


-- Taux de victoire d'un deck contre un autre
create view public.matchups_stats as
select
  deck_1,
  deck_2,
  count(*) as total,
  sum(case when result = 'deck_1_win' then 1 else 0 end) as deck_1_wins,
  sum(case when result = 'deck_2_win' then 1 else 0 end) as deck_2_wins,
  sum(case when result = 'draw' then 1 else 0 end) as draws,
  round(100.0 * sum(case when result = 'deck_1_win' then 1 else 0 end) / count(*), 2) as deck_1_winrate
from public.matches
group by deck_1, deck_2;
