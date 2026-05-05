-- CreateTable
CREATE TABLE "ResponseAnalysis" (
    "id" TEXT NOT NULL,
    "responseId" TEXT NOT NULL,
    "tone" TEXT NOT NULL,
    "intent" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "summary" TEXT NOT NULL,
    "isFlagged" BOOLEAN NOT NULL DEFAULT false,
    "moderationCategory" TEXT,
    "moderationReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResponseAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormInsight" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "themes" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormInsight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResponseAnalysis_responseId_key" ON "ResponseAnalysis"("responseId");

-- AddForeignKey
ALTER TABLE "ResponseAnalysis" ADD CONSTRAINT "ResponseAnalysis_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormInsight" ADD CONSTRAINT "FormInsight_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
