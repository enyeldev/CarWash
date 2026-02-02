/*
  Warnings:

  - A unique constraint covering the columns `[stripeCustomerId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserPlan" AS ENUM ('BASIC', 'PRO', 'ADVANCE');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELED', 'PAST_DUE', 'TRAILING', 'INCOMPLETE');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "plan" "UserPlan" NOT NULL DEFAULT 'BASIC',
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT,
ADD COLUMN     "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'TRAILING',
ADD COLUMN     "trialEndsAt" TIMESTAMP(3) DEFAULT now() + interval '14 days';

-- CreateIndex
CREATE UNIQUE INDEX "user_stripeCustomerId_key" ON "user"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "user_stripeSubscriptionId_key" ON "user"("stripeSubscriptionId");
