SELECT
  (
    SELECT
      count(*) AS count
    FROM
      tb_vaga_deletada
    WHERE
      (
        tb_vaga_deletada.motivo = 'Preenchida' :: motivo_vaga_deletada
      )
  ) AS count_preenchida,
  (
    SELECT
      count(*) AS count
    FROM
      tb_vaga_deletada
    WHERE
      (
        tb_vaga_deletada.motivo = 'Denunciada' :: motivo_vaga_deletada
      )
  ) AS count_denunciada,
  (
    SELECT
      count(*) AS count
    FROM
      tb_vaga_deletada
    WHERE
      (
        tb_vaga_deletada.motivo = 'Outros' :: motivo_vaga_deletada
      )
  ) AS count_outros;