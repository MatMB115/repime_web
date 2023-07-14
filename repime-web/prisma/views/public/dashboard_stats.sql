SELECT
  (
    SELECT
      count(*) AS count
    FROM
      tb_residencia
  ) AS total_residencias,
  (
    SELECT
      count(*) AS count
    FROM
      tb_usuario
  ) AS total_usuarios,
  (
    SELECT
      sum(tb_vaga.qtd_visitas) AS sum
    FROM
      tb_vaga
  ) AS total_vagas_acessadas,
  (
    SELECT
      count(*) AS count
    FROM
      tb_vaga_deletada
  ) AS total_vagas_deletadas;