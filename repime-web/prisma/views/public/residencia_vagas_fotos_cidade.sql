SELECT
  v.id AS id_vaga,
  v.mensalidade,
  v.descricao,
  ft.id AS id_foto_vaga,
  ft.foto,
  r.id AS id_residencia,
  r.nome AS residencia_nome,
  r.tem_garagem,
  r.end_numero,
  r.end_rua,
  r.end_bairro,
  r.end_complemento,
  r.end_cep,
  r.tem_animais,
  r.oferece_almoco,
  r.oferece_janta,
  r.tipo_republica,
  r.fundacao,
  r.tem_trote,
  r.tem_diarista,
  r.tempo_de_contrato,
  r.agua_inclusa,
  r.internet_inclusa,
  r.energia_inclusa,
  r.tipo,
  c.id AS id_cidade,
  c.nome AS cidade_nome,
  c.pais,
  c.uf
FROM
  (
    (
      (
        tb_vaga v
        JOIN tb_foto_vaga ft ON ((v.id = ft.id_vaga))
      )
      JOIN tb_residencia r ON ((r.id = v.id_residencia))
    )
    JOIN tb_cidade c ON ((c.id = r.id_cidade))
  );