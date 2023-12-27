/*
  Warnings:

  - The primary key for the `board` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `board_created_at` on the `board` table. All the data in the column will be lost.
  - You are about to drop the column `board_description` on the `board` table. All the data in the column will be lost.
  - You are about to drop the column `board_id` on the `board` table. All the data in the column will be lost.
  - You are about to drop the column `board_title` on the `board` table. All the data in the column will be lost.
  - You are about to drop the column `board_updated_at` on the `board` table. All the data in the column will be lost.
  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_created_at` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `category_description` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `category_name` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `category_updated_at` on the `category` table. All the data in the column will be lost.
  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_created_at` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `post_description` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `post_image` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `post_updated_at` on the `post` table. All the data in the column will be lost.
  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role_id` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `role_name` on the `role` table. All the data in the column will be lost.
  - The primary key for the `thread` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `thread_created_at` on the `thread` table. All the data in the column will be lost.
  - You are about to drop the column `thread_description` on the `thread` table. All the data in the column will be lost.
  - You are about to drop the column `thread_id` on the `thread` table. All the data in the column will be lost.
  - You are about to drop the column `thread_image` on the `thread` table. All the data in the column will be lost.
  - You are about to drop the column `thread_title` on the `thread` table. All the data in the column will be lost.
  - You are about to drop the column `thread_updated_at` on the `thread` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_description` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_hash` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_updated_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_username` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `board` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `thread` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `thread` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "board" DROP CONSTRAINT "board_category_id_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_thread_id_fkey";

-- DropForeignKey
ALTER TABLE "post_answer" DROP CONSTRAINT "post_answer_post_id_source_fkey";

-- DropForeignKey
ALTER TABLE "post_answer" DROP CONSTRAINT "post_answer_post_id_target_fkey";

-- DropForeignKey
ALTER TABLE "thread" DROP CONSTRAINT "thread_board_id_fkey";

-- DropForeignKey
ALTER TABLE "thread" DROP CONSTRAINT "thread_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_role_id_fkey";

-- DropForeignKey
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_user_id_fkey";

-- DropIndex
DROP INDEX "board_board_title_key";

-- DropIndex
DROP INDEX "category_category_name_key";

-- DropIndex
DROP INDEX "role_role_name_key";

-- DropIndex
DROP INDEX "user_user_username_key";

-- AlterTable
ALTER TABLE "board" DROP CONSTRAINT "board_pkey",
DROP COLUMN "board_created_at",
DROP COLUMN "board_description",
DROP COLUMN "board_id",
DROP COLUMN "board_title",
DROP COLUMN "board_updated_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "board_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "category" DROP CONSTRAINT "category_pkey",
DROP COLUMN "category_created_at",
DROP COLUMN "category_description",
DROP COLUMN "category_id",
DROP COLUMN "category_name",
DROP COLUMN "category_updated_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "post" DROP CONSTRAINT "post_pkey",
DROP COLUMN "post_created_at",
DROP COLUMN "post_description",
DROP COLUMN "post_id",
DROP COLUMN "post_image",
DROP COLUMN "post_updated_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "post_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "role" DROP CONSTRAINT "role_pkey",
DROP COLUMN "role_id",
DROP COLUMN "role_name",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "thread" DROP CONSTRAINT "thread_pkey",
DROP COLUMN "thread_created_at",
DROP COLUMN "thread_description",
DROP COLUMN "thread_id",
DROP COLUMN "thread_image",
DROP COLUMN "thread_title",
DROP COLUMN "thread_updated_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "thread_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "user_created_at",
DROP COLUMN "user_description",
DROP COLUMN "user_hash",
DROP COLUMN "user_id",
DROP COLUMN "user_updated_at",
DROP COLUMN "user_username",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "username" TEXT NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "board_title_key" ON "board"("title");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board" ADD CONSTRAINT "board_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thread" ADD CONSTRAINT "thread_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thread" ADD CONSTRAINT "thread_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_answer" ADD CONSTRAINT "post_answer_post_id_source_fkey" FOREIGN KEY ("post_id_source") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_answer" ADD CONSTRAINT "post_answer_post_id_target_fkey" FOREIGN KEY ("post_id_target") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
