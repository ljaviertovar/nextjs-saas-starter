-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "resetPasswordToken" TEXT,
    "resetPasswordTokenExpiry" DATETIME,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN DEFAULT false,
    "emailVerificationToken" TEXT,
    "phone" TEXT,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerificationToken", "emailVerified", "id", "image", "name", "password", "phone", "resetPasswordToken", "resetPasswordTokenExpiry", "role", "updatedAt", "username") SELECT "createdAt", "email", "emailVerificationToken", "emailVerified", "id", "image", "name", "password", "phone", "resetPasswordToken", "resetPasswordTokenExpiry", "role", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_resetPasswordToken_key" ON "User"("resetPasswordToken");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_emailVerificationToken_key" ON "User"("emailVerificationToken");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
