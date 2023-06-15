SELECT
  v.id AS id_vaga,
  v.mensalidade,
  v.informacoes_adicionais,
  ft.id AS id_foto_vaga,
  ft.foto,
  r.id AS id_residencia,
  r.nome AS residencia_nome,
  r.e_mobiliado,
  r.tem_garagem,
  r.tem_animais,
  r.oferece_almoco,
  r.oferece_janta,
  r.end_numero,
  r.end_rua,
  r.end_bairro,
  r.end_complemento,
  r.end_cep,
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