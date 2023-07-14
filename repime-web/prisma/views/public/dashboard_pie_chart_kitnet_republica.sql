SELECT
  (
    SELECT
      count(*) AS count
    FROM
      tb_residencia
    WHERE
      (
        tb_residencia.tipo = 'republica' :: tipos_residencia
      )
  ) AS total_republicas,
  (
    SELECT
      count(*) AS count
    FROM
      tb_residencia
    WHERE
      (tb_residencia.tipo = 'kitnet' :: tipos_residencia)
  ) AS total_kitnets;