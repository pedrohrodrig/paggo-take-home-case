-- CreateTable
CREATE TABLE "InvoiceImage" (
    "id" SERIAL NOT NULL,
    "transcription" TEXT,
    "transcriptionSummary" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "InvoiceImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InvoiceImage" ADD CONSTRAINT "InvoiceImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
