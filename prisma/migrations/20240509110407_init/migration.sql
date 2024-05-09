-- CreateTable
CREATE TABLE "Edge" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "node1_alias" TEXT NOT NULL,
    "node2_alias" TEXT NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("id")
);
