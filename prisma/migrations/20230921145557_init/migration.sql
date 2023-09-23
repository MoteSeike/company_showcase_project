-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "delete_status" INTEGER NOT NULL,
    "registration_date" TIMESTAMP(3),
    "updated_date" TIMESTAMP(3),
    "deleted_date" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "delete_status" INTEGER NOT NULL,
    "registration_date" TIMESTAMP(3),
    "updated_date" TIMESTAMP(3),
    "deleted_date" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "feature_id" SERIAL NOT NULL,
    "feature_name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category_id" INTEGER NOT NULL,
    "delete_status" INTEGER NOT NULL,
    "registration_date" TIMESTAMP(3),
    "updated_date" TIMESTAMP(3),
    "deleted_date" TIMESTAMP(3),

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("feature_id")
);

-- CreateTable
CREATE TABLE "FeatureProject" (
    "featureproject_id" SERIAL NOT NULL,
    "feature_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "delete_status" INTEGER NOT NULL,

    CONSTRAINT "FeatureProject_pkey" PRIMARY KEY ("featureproject_id")
);

-- CreateTable
CREATE TABLE "Project" (
    "project_id" SERIAL NOT NULL,
    "project_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "delete_status" INTEGER NOT NULL,
    "registration_date" TIMESTAMP(3),
    "updated_date" TIMESTAMP(3),
    "deleted_date" TIMESTAMP(3),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "issuse_id" SERIAL NOT NULL,
    "issuse_info" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "delete_status" INTEGER NOT NULL,
    "registration_date" TIMESTAMP(3),
    "updated_date" TIMESTAMP(3),
    "deleted_date" TIMESTAMP(3),

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("issuse_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_name_key" ON "Category"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_feature_name_key" ON "Feature"("feature_name");

-- CreateIndex
CREATE UNIQUE INDEX "Project_project_name_key" ON "Project"("project_name");

-- CreateIndex
CREATE UNIQUE INDEX "Issue_issuse_info_key" ON "Issue"("issuse_info");
