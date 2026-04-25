-- CreateEnum
CREATE TYPE "tipos_rep" AS ENUM ('masculina', 'feminina', 'mista');

-- CreateEnum
CREATE TYPE "tipos_residencia" AS ENUM ('republica', 'kitnet');

-- CreateEnum
CREATE TYPE "motivo_vaga_deletada" AS ENUM ('Preenchida', 'Outros', 'Denunciada');

-- CreateTable
CREATE TABLE "tb_usuario" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "image" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" DATE,
    "senha" TEXT,
    "contato" VARCHAR(15),
    "nome_contato" VARCHAR(100),
    "is_administrador" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tb_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_cidade" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "pais" VARCHAR(50) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,

    CONSTRAINT "tb_cidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_foto_vaga" (
    "id" SERIAL NOT NULL,
    "id_vaga" INTEGER NOT NULL,
    "foto" TEXT NOT NULL,

    CONSTRAINT "tb_foto_vaga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_residencia" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "descricao" TEXT,
    "tem_garagem" BOOLEAN NOT NULL,
    "end_numero" INTEGER NOT NULL,
    "end_rua" VARCHAR(75) NOT NULL,
    "end_bairro" VARCHAR(75) NOT NULL,
    "end_complemento" VARCHAR(75) NOT NULL,
    "end_cep" VARCHAR(8) NOT NULL,
    "tem_animais" BOOLEAN,
    "oferece_almoco" BOOLEAN,
    "oferece_janta" BOOLEAN,
    "tipo_republica" "tipos_rep",
    "fundacao" DATE,
    "tem_trote" BOOLEAN,
    "tem_diarista" BOOLEAN,
    "tempo_de_contrato" INTEGER,
    "tempo_unifei" INTEGER,
    "tempo_centro" INTEGER,
    "internet_mbps" INTEGER,
    "instagram" TEXT,
    "agua_inclusa" BOOLEAN,
    "internet_inclusa" BOOLEAN,
    "energia_inclusa" BOOLEAN,
    "id_cidade" INTEGER NOT NULL,
    "id_user" TEXT NOT NULL,
    "tipo" "tipos_residencia" NOT NULL,

    CONSTRAINT "tb_residencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_universidade" (
    "id" SERIAL NOT NULL,
    "id_cidade" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "tb_universidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_vaga" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(200),
    "mensalidade" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT,
    "e_mobiliado" BOOLEAN,
    "id_residencia" INTEGER NOT NULL,
    "qtd_visitas" INTEGER DEFAULT 0,

    CONSTRAINT "tb_vaga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_conta" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "token_type" TEXT,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "scope" TEXT,
    "id_token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_conta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_sessoes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "session_token" TEXT NOT NULL,
    "access_token" TEXT,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_sessoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_vaga_deletada" (
    "id" SERIAL NOT NULL,
    "motivo" "motivo_vaga_deletada",

    CONSTRAINT "tb_vagas_deletadas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_usuario_email_key" ON "tb_usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_conta_user_id_key" ON "tb_conta"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_conta_provider_provider_account_id_key" ON "tb_conta"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_sessoes_session_token_key" ON "tb_sessoes"("session_token");

-- AddForeignKey
ALTER TABLE "tb_foto_vaga" ADD CONSTRAINT "tb_foto_vaga_id_vaga_fkey" FOREIGN KEY ("id_vaga") REFERENCES "tb_vaga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_residencia" ADD CONSTRAINT "tb_residencia_id_cidade_fkey" FOREIGN KEY ("id_cidade") REFERENCES "tb_cidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_residencia" ADD CONSTRAINT "tb_residencia_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_universidade" ADD CONSTRAINT "tb_universidade_id_cidade_fkey" FOREIGN KEY ("id_cidade") REFERENCES "tb_cidade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_vaga" ADD CONSTRAINT "tb_vaga_id_residencia_fkey" FOREIGN KEY ("id_residencia") REFERENCES "tb_residencia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_conta" ADD CONSTRAINT "tb_conta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_sessoes" ADD CONSTRAINT "tb_sessoes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
