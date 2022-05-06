-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "deliveries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_client" TEXT NOT NULL,
    "id_deliveryman" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "deliveries_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliveryman" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "deliveries_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_deliveryman" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_deliveryman" ("id", "password", "username") SELECT "id", "password", "username" FROM "deliveryman";
DROP TABLE "deliveryman";
ALTER TABLE "new_deliveryman" RENAME TO "deliveryman";
CREATE UNIQUE INDEX "deliveryman_username_key" ON "deliveryman"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "clients_username_key" ON "clients"("username");
