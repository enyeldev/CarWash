/*
  Warnings:

  - Made the column `phone` on table `company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "company" ADD COLUMN     "description" TEXT,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "trialEndsAt" SET DEFAULT now() + interval '14 days';
