/*
  Warnings:

  - The primary key for the `post_answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_id_targer` on the `post_answer` table. All the data in the column will be lost.
  - Added the required column `post_id_target` to the `post_answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post_answer" DROP CONSTRAINT "post_answer_post_id_targer_fkey";

-- AlterTable
ALTER TABLE "post_answer" DROP CONSTRAINT "post_answer_pkey",
DROP COLUMN "post_id_targer",
ADD COLUMN     "post_id_target" INTEGER NOT NULL,
ADD CONSTRAINT "post_answer_pkey" PRIMARY KEY ("post_id_source", "post_id_target");

-- AddForeignKey
ALTER TABLE "post_answer" ADD CONSTRAINT "post_answer_post_id_target_fkey" FOREIGN KEY ("post_id_target") REFERENCES "post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
