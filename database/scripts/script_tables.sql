CREATE TABLE tb_cidade(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    pais  VARCHAR(50) NOT NULL,
    uf VARCHAR(2) NOT NULL
);

CREATE TABLE tb_universidade(
    id SERIAL PRIMARY KEY,
    id_cidade int NOT NULL,
    nome VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_cidade) REFERENCES tb_cidade(id)
);

CREATE TABLE tb_usuario(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    foto text,
    senha text NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    contato VARCHAR(50),
    is_administrador boolean
);

CREATE TABLE tb_residencia_endereco(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    e_mobiliado boolean NOT NULL,
    tem_garagem boolean NOT NULL,
    tem_empregada boolean NOT NULL,
    tem_animais boolean NOT NULL,
    oferece_almoco boolean NOT NULL,
    oferece_janta boolean NOT NULL,
    end_numero int NOT NULL,
    end_rua VARCHAR(75) NOT NULL,
    end_bairro VARCHAR(75) NOT NULL,
    end_complemento VARCHAR(75) NOT NULL,
    end_cep VARCHAR(8) NOT NULL,
    id_cidade int NOT NULL,
    id_user int NOT NULL,
    FOREIGN KEY (id_cidade) REFERENCES tb_cidade(id),
    FOREIGN KEY (id_user) REFERENCES tb_usuario(id)
);

CREATE TABLE tb_kitnet(
    id SERIAL PRIMARY KEY,
    tempo_de_contato VARCHAR(10),
    id_residencia int NOT NULL,
    FOREIGN KEY (id_residencia) REFERENCES tb_residencia_endereco(id)
);

CREATE TABLE tb_republica(
    id SERIAL PRIMARY KEY,
    fundacao VARCHAR(50),
    tem_trote boolean NOT NULL,
    e_masculina boolean NOT NULL,
    id_residencia int NOT NULL,
    FOREIGN KEY (id_residencia) REFERENCES tb_residencia_endereco(id)
);

CREATE TABLE tb_vaga(
    id SERIAL PRIMARY KEY,
    mensalidade float NOT NULL,
    informacoes_adicionais VARCHAR(100),
    id_residencia int NOT NULL,
    FOREIGN KEY (id_residencia) REFERENCES tb_residencia_endereco(id)
);

CREATE TABLE tb_foto_vaga(
    id SERIAL PRIMARY KEY,
    id_vaga int NOT NULL,
    foto text NOT NULL,
    FOREIGN KEY (id_vaga) REFERENCES tb_vaga(id)
);