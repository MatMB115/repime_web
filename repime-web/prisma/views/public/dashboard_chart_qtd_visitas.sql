SELECT
  (
    SELECT
      sum(v.qtd_visitas) AS sum
    FROM
      (
        tb_vaga v
        JOIN tb_residencia r ON ((r.id = v.id_residencia))
      )
    WHERE
      (r.tipo = 'republica' :: tipos_residencia)
  ) AS qtd_visitas_republica,
  (
    SELECT
      sum(v.qtd_visitas) AS sum
    FROM
      (
        tb_vaga v
        JOIN tb_residencia r ON ((r.id = v.id_residencia))
      )
    WHERE
      (r.tipo = 'kitnet' :: tipos_residencia)
  ) AS qtd_visitas_kitnet;