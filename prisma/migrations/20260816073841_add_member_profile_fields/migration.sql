-- CreateEnum
CREATE TYPE "PaymentPlan" AS ENUM ('MONTHLY', 'ANNUAL', 'LIFETIME');

-- AlterTable
ALTER TABLE "invites" ADD COLUMN     "paymentPlan" "PaymentPlan";

-- AlterTable
ALTER TABLE "members" ADD COLUMN     "activationDate" TIMESTAMP(3),
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "customFields" JSONB,
ADD COLUMN     "loginDetails" TEXT,
ADD COLUMN     "paymentPlan" "PaymentPlan",
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "members_username_key" ON "members"("username");

