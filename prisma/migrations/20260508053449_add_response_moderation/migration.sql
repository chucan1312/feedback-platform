-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "isFlagged" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "moderationResult" JSONB;
