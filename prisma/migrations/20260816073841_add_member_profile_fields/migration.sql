-- CreateEnum
CREATE TYPE "PaymentPlan" AS ENUM ('MONTHLY', 'ANNUAL', 'LIFETIME');

-- AlterTable
ALTER TABLE "invites" ADD COLUMN     "paymentPlan" "PaymentPlan";

-- AlterTable: add new member columns nullable first so existing rows survive
ALTER TABLE "members" ADD COLUMN     "activationDate" TIMESTAMP(3),
ADD COLUMN     "country" TEXT,
ADD COLUMN     "customFields" JSONB,
ADD COLUMN     "loginDetails" TEXT,
ADD COLUMN     "paymentPlan" "PaymentPlan",
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "username" TEXT;

-- Backfill any pre-existing rows (registered before these fields existed)
-- with placeholder values, so the NOT NULL constraints below can be applied.
-- Admins can fix these up via the member edit page afterwards.
UPDATE "members"
SET
  "username" = COALESCE("username", split_part("email", '@', 1) || '_' || substr(id, 1, 6)),
  "phone" = COALESCE("phone", ''),
  "country" = COALESCE("country", '')
WHERE "username" IS NULL OR "phone" IS NULL OR "country" IS NULL;

-- Now enforce NOT NULL now that every row has a value
ALTER TABLE "members" ALTER COLUMN "country" SET NOT NULL;
ALTER TABLE "members" ALTER COLUMN "phone" SET NOT NULL;
ALTER TABLE "members" ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "members_username_key" ON "members"("username");
