-- AlterTable
ALTER TABLE "InvoiceImage" ADD COLUMN     "fileName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "fileOriginalName" TEXT NOT NULL DEFAULT '';
