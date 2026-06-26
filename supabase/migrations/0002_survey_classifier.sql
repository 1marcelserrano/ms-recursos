-- 0002 — Enquete-classificador (perfil × momento × interesse + pergunta aberta)
-- Aditivo: não quebra dados existentes. Aplicar no SQL Editor do projeto ms-recursos.

alter table public.survey_responses
  add column if not exists perfil text,   -- solo | estudio | ceo | comecando
  add column if not exists momento text,  -- travado | usa-naofatura | faturando | zero
  add column if not exists pain text;     -- pergunta aberta (voz do cliente)

-- q1 (formato de aprendizado da v1) deixa de ser obrigatório:
-- a enquete nova segmenta por perfil/momento, não por formato.
alter table public.survey_responses alter column q1 drop not null;
