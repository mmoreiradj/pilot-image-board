/*
  Warnings:

  - The primary key for the `board` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `board` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `board` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `board` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `board` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `board` table. All the data in the column will be lost.
  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `category` table. All the data in the column will be lost.
  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `threadId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `post` table. All the data in the column will be lost.
  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `role` table. All the data in the column will be lost.
  - The primary key for the `thread` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `boardId` on the `thread` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `thread` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `thread` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `thread` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `thread` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `thread` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `thread` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `thread` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - The primary key for the `user_role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleId` on the `user_role` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[board_title]` on the table `board` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[category_name]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role_name]` on the table `role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `board_title` to the `board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_description` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_name` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator_id` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_description` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thread_id` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_name` to the `role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `board_id` to the `thread` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator_id` to the `thread` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thread_description` to the `thread` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thread_title` to the `thread` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_hash` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_username` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `user_role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "board" DROP CONSTRAINT "board_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_threadId_fkey";

-- DropForeignKey
ALTER TABLE "thread" DROP CONSTRAINT "thread_boardId_fkey";

-- DropForeignKey
ALTER TABLE "thread" DROP CONSTRAINT "thread_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_userId_fkey";

-- DropIndex
DROP INDEX "board_title_key";

-- DropIndex
DROP INDEX "category_name_key";

-- DropIndex
DROP INDEX "role_name_key";

-- DropIndex
DROP INDEX "user_username_key";

-- DropIndex
DROP INDEX "user_roles_user_id_role_id_index";

-- AlterTable
ALTER TABLE "board" DROP CONSTRAINT "board_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "board_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "board_description" TEXT,
ADD COLUMN     "board_id" SERIAL NOT NULL,
ADD COLUMN     "board_title" TEXT NOT NULL,
ADD COLUMN     "board_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "board_pkey" PRIMARY KEY ("board_id");

-- AlterTable
ALTER TABLE "category" DROP CONSTRAINT "category_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "category_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "category_description" TEXT NOT NULL,
ADD COLUMN     "category_id" SERIAL NOT NULL,
ADD COLUMN     "category_name" TEXT NOT NULL,
ADD COLUMN     "category_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "category_pkey" PRIMARY KEY ("category_id");

-- AlterTable
ALTER TABLE "post" DROP CONSTRAINT "post_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "creatorId",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "image",
DROP COLUMN "threadId",
DROP COLUMN "updatedAt",
ADD COLUMN     "creator_id" INTEGER NOT NULL,
ADD COLUMN     "post_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "post_description" TEXT NOT NULL,
ADD COLUMN     "post_id" SERIAL NOT NULL,
ADD COLUMN     "post_image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "post_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "thread_id" INTEGER NOT NULL,
ADD CONSTRAINT "post_pkey" PRIMARY KEY ("post_id");

-- AlterTable
ALTER TABLE "role" DROP CONSTRAINT "role_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "role_id" SERIAL NOT NULL,
ADD COLUMN     "role_name" TEXT NOT NULL,
ADD CONSTRAINT "role_pkey" PRIMARY KEY ("role_id");

-- AlterTable
ALTER TABLE "thread" DROP CONSTRAINT "thread_pkey",
DROP COLUMN "boardId",
DROP COLUMN "createdAt",
DROP COLUMN "creatorId",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "image",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "board_id" INTEGER NOT NULL,
ADD COLUMN     "creator_id" INTEGER NOT NULL,
ADD COLUMN     "thread_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "thread_description" TEXT NOT NULL,
ADD COLUMN     "thread_id" SERIAL NOT NULL,
ADD COLUMN     "thread_image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "thread_title" TEXT NOT NULL,
ADD COLUMN     "thread_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "thread_pkey" PRIMARY KEY ("thread_id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "hash",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
DROP COLUMN "username",
ADD COLUMN     "user_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_description" TEXT,
ADD COLUMN     "user_hash" TEXT NOT NULL,
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD COLUMN     "user_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_username" TEXT NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_pkey",
DROP COLUMN "roleId",
DROP COLUMN "userId",
ADD COLUMN     "role_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "user_role_pkey" PRIMARY KEY ("user_id", "role_id");

-- CreateTable
CREATE TABLE "post_answer" (
    "post_id_source" INTEGER NOT NULL,
    "post_id_targer" INTEGER NOT NULL,

    CONSTRAINT "post_answer_pkey" PRIMARY KEY ("post_id_source","post_id_targer")
);

-- CreateIndex
CREATE UNIQUE INDEX "board_board_title_key" ON "board"("board_title");

-- CreateIndex
CREATE UNIQUE INDEX "category_category_name_key" ON "category"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "role_role_name_key" ON "role"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_user_username_key" ON "user"("user_username");

-- CreateIndex
CREATE INDEX "user_roles_user_id_role_id_index" ON "user_role"("user_id", "role_id");

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board" ADD CONSTRAINT "board_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thread" ADD CONSTRAINT "thread_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "board"("board_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thread" ADD CONSTRAINT "thread_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "thread"("thread_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_answer" ADD CONSTRAINT "post_answer_post_id_source_fkey" FOREIGN KEY ("post_id_source") REFERENCES "post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_answer" ADD CONSTRAINT "post_answer_post_id_targer_fkey" FOREIGN KEY ("post_id_targer") REFERENCES "post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
