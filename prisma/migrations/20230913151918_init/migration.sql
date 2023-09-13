-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `delete_status` INTEGER NOT NULL,
    `registration_date` DATETIME(3) NULL,
    `updated_date` DATETIME(3) NULL,
    `deleted_date` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(191) NOT NULL,
    `delete_status` INTEGER NOT NULL,
    `registration_date` DATETIME(3) NULL,
    `updated_date` DATETIME(3) NULL,
    `deleted_date` DATETIME(3) NULL,

    UNIQUE INDEX `Category_category_name_key`(`category_name`),
    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feature` (
    `feature_id` INTEGER NOT NULL AUTO_INCREMENT,
    `feature_name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `category_id` INTEGER NOT NULL,
    `delete_status` INTEGER NOT NULL,
    `registration_date` DATETIME(3) NULL,
    `updated_date` DATETIME(3) NULL,
    `deleted_date` DATETIME(3) NULL,

    UNIQUE INDEX `Feature_feature_name_key`(`feature_name`),
    PRIMARY KEY (`feature_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeatureProject` (
    `featureproject_id` INTEGER NOT NULL AUTO_INCREMENT,
    `feature_id` INTEGER NOT NULL,
    `project_id` INTEGER NOT NULL,
    `delete_status` INTEGER NOT NULL,

    PRIMARY KEY (`featureproject_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `project_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_name` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `delete_status` INTEGER NOT NULL,
    `registration_date` DATETIME(3) NULL,
    `updated_date` DATETIME(3) NULL,
    `deleted_date` DATETIME(3) NULL,

    UNIQUE INDEX `Project_project_name_key`(`project_name`),
    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Issue` (
    `issuse_id` INTEGER NOT NULL AUTO_INCREMENT,
    `issuse_info` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `project_id` INTEGER NOT NULL,
    `delete_status` INTEGER NOT NULL,
    `registration_date` DATETIME(3) NULL,
    `updated_date` DATETIME(3) NULL,
    `deleted_date` DATETIME(3) NULL,

    UNIQUE INDEX `Issue_issuse_info_key`(`issuse_info`),
    PRIMARY KEY (`issuse_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
