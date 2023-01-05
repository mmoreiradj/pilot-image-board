/*
  Warnings:

  - You are about to drop the column `categoryId` on the `board` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `board` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "board" DROP CONSTRAINT "board_categoryId_fkey";

-- AlterTable
ALTER TABLE "board" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "board" ADD CONSTRAINT "board_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;
