-- CreateTable
CREATE TABLE "palindromes" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "isPalindrome" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3),

    CONSTRAINT "palindromes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "palindromes_uuid_key" ON "palindromes"("uuid");
