-- CreateTable
CREATE TABLE "PetShop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vaccinated" BOOLEAN NOT NULL,
    "deadline_vaccination" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petShopId" TEXT NOT NULL,
    CONSTRAINT "Pet_petShopId_fkey" FOREIGN KEY ("petShopId") REFERENCES "PetShop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PetShop_cnpj_key" ON "PetShop"("cnpj");
