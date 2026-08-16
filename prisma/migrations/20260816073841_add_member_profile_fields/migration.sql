-- CreateEnum (idempotent: an earlier partial run may have already created this)
DO $$ BEGIN
    CREATE TYPE "PaymentPlan" AS ENUM ('MONTHLY', 'ANNUAL', 'LIFETIME');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- AlterTable (idempotent)
ALTER TABLE "invites" ADD COLUMN IF NOT EXISTS "paymentPlan" "PaymentPlan";

-- AlterTable: add new member columns nullable first so existing rows survive
ALTER TABLE "members" ADD COLUMN IF NOT EXISTS "activationDate" TIMESTAMP(3);
ALTER TABLE "members" ADD COLUMN IF NOT EXISTS "country" TEXT;
ALTER TABLE "members" ADD COLUMN IF NOT EXISTS "customFields" JSONB;
ALTER TABLE "members" ADD COLUMN IF NOT EXISTS "loginDetails" TEXT;
ALTER TABLE "members" ADD COLUMN IF NOT EXISTS "paymentPlan" "PaymentPlan";
ALTER TABLE "members" ADD COLUMN IF NOT EXISTS "phone" TEXT;
ALTER TABLE "members" ADD COLUMN IF NOT EXISTS "username" TEXT;

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

-- CreateIndex (idempotent)
CREATE UNIQUE INDEX IF NOT EXISTS "members_username_key" ON "members"("username");
