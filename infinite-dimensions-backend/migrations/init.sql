  -- Create the database (if it doesn't exist) and select it
  CREATE DATABASE IF NOT EXISTS `infinite_dimensions`;
  USE `infinite_dimensions`;

  -- Disable foreign key checks temporarily to avoid errors on table creation order
  SET FOREIGN_KEY_CHECKS = 0;

  --
  -- 1) USER TABLE (stores Admin, Employee, Client)
  --
  CREATE TABLE `user` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN','EMPLOYEE','CLIENT') NOT NULL DEFAULT 'CLIENT',
    `is_company` BOOLEAN NOT NULL DEFAULT FALSE,
    `is_approved` BOOLEAN NOT NULL DEFAULT FALSE,
    `first_name` VARCHAR(100) NULL,
    `last_name` VARCHAR(100) NULL,
    `company_name` VARCHAR(255) NULL,        -- New field for company name
    `company_tax_number` VARCHAR(255) NULL,  -- New field for company tax number
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB;

  --
  -- 2) ITEM TABLE (managed by Admin/Employee)
  --
  CREATE TABLE `item` (
    `item_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `discount` DECIMAL(10,2) NULL,
    `status` ENUM('IN_STOCK','OUT_OF_STOCK','LOW_IN_STOCK')
      NOT NULL DEFAULT 'IN_STOCK',
    `added_by` INT NULL,       -- references user who created item
    `modified_by` INT NULL,    -- references user who last updated item
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_item_added_by`
      FOREIGN KEY (`added_by`) REFERENCES `user`(`user_id`)
      ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT `fk_item_modified_by`
      FOREIGN KEY (`modified_by`) REFERENCES `user`(`user_id`)
      ON UPDATE CASCADE ON DELETE SET NULL
  ) ENGINE=InnoDB;

  --
  -- 3) ORDER TABLE (client places, admin/employee processes)
  --
  -- Updated to include new delivery address fields: delivery_address, postal_code, city.
  CREATE TABLE `order` (
    `order_id` INT AUTO_INCREMENT PRIMARY KEY,
    `client_id` INT NOT NULL,    -- references user with role=CLIENT
    `status` ENUM('PENDING','ON_HOLD','ORDERING_MATERIAL',
                  'IN_PRODUCTION','DONE','CANCELED')
      NOT NULL DEFAULT 'PENDING',
    `payment_method` ENUM('CHECK','CASH') NOT NULL DEFAULT 'CASH',
    `delivery_address` VARCHAR(255) NOT NULL,  -- New field for full delivery address
    `postal_code` VARCHAR(255) NOT NULL,       -- Updated to VARCHAR(255)
    `city` VARCHAR(255) NOT NULL,              -- New field for city
    `comments` TEXT NULL,
    `total_cost` DECIMAL(10,2) NULL,
    `processed_by` INT NULL,   -- references user (ADMIN/EMPLOYEE) who handled
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_order_client`
      FOREIGN KEY (`client_id`) REFERENCES `user`(`user_id`)
      ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `fk_order_processed_by`
      FOREIGN KEY (`processed_by`) REFERENCES `user`(`user_id`)
      ON UPDATE CASCADE ON DELETE SET NULL
  ) ENGINE=InnoDB;

  --
  -- 4) ORDER_ITEM TABLE (line items for standard shop orders)
  --
  CREATE TABLE `order_item` (
    `order_id` INT NOT NULL,
    `item_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    `unit_price` DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (`order_id`,`item_id`),
    CONSTRAINT `fk_order_item_order`
      FOREIGN KEY (`order_id`) REFERENCES `order`(`order_id`)
      ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `fk_order_item_item`
      FOREIGN KEY (`item_id`) REFERENCES `item`(`item_id`)
      ON UPDATE CASCADE ON DELETE RESTRICT
  ) ENGINE=InnoDB;

  --
  -- 5) CUSTOM_ORDER TABLE (extra details for 3D-printing requests)
  --
  CREATE TABLE `custom_order` (
    `custom_order_id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL UNIQUE,
    `design_file` VARCHAR(255) NOT NULL,
    `material` VARCHAR(100) NOT NULL,
    `color` VARCHAR(100) NULL,
    `slicer_estimate` DECIMAL(10,2) NULL,
    `final_quote` DECIMAL(10,2) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_custom_order_order`
      FOREIGN KEY (`order_id`) REFERENCES `order`(`order_id`)
      ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB;

  --
  -- 6) INVENTORY TABLE
  --
  CREATE TABLE `inventory` (
    `inventory_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `quantity` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `measurement_unit` VARCHAR(50) NOT NULL,
    `provider` VARCHAR(255) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB;

  --
  -- 7) ORDER_MATERIAL_USAGE (ties orders to multiple inventory items)
  --
  CREATE TABLE `order_material_usage` (
    `usage_id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `inventory_id` INT NOT NULL,
    `amount_used` DECIMAL(10,2) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_omu_order`
      FOREIGN KEY (`order_id`) REFERENCES `order`(`order_id`)
      ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `fk_omu_inventory`
      FOREIGN KEY (`inventory_id`) REFERENCES `inventory`(`inventory_id`)
      ON UPDATE CASCADE ON DELETE RESTRICT
  ) ENGINE=InnoDB;

  --
  -- 8) PRINTER TABLE (handles single or multicolor prints)
  --
  CREATE TABLE `printer` (
    `printer_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `printer_type` ENUM('SINGLE_COLOR','MULTICOLOR')
      NOT NULL DEFAULT 'SINGLE_COLOR',
    `status` ENUM('ACTIVE','INACTIVE','MAINTENANCE')
      NOT NULL DEFAULT 'ACTIVE',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB;

  --
  -- 9) PRINTER_ASSIGNMENT TABLE (tracks usage/time per order)
  --
  CREATE TABLE `printer_assignment` (
    `assignment_id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `printer_id` INT NOT NULL,
    `start_time` DATETIME NULL,
    `end_time` DATETIME NULL,
    `run_time_in_minutes` INT NULL,
    `notes` TEXT NULL,
    CONSTRAINT `fk_prn_asgn_order`
      FOREIGN KEY (`order_id`) REFERENCES `order`(`order_id`)
      ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `fk_prn_asgn_printer`
      FOREIGN KEY (`printer_id`) REFERENCES `printer`(`printer_id`)
      ON UPDATE CASCADE ON DELETE RESTRICT
  ) ENGINE=InnoDB;

  --
  -- 10) FINANCE TABLE (financial operations, references order optionally)
  --
  CREATE TABLE `finance` (
    `finance_id` INT AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NULL,
    `transaction_type` ENUM('INCOME','EXPENSE') NOT NULL,
    `amount` DECIMAL(10,2) NOT NULL,
    `description` TEXT NULL,
    `creation_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `saved_by` INT NULL,  -- references user (admin or employee)
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_finance_order`
      FOREIGN KEY (`order_id`) REFERENCES `order`(`order_id`)
      ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT `fk_finance_saved_by`
      FOREIGN KEY (`saved_by`) REFERENCES `user`(`user_id`)
      ON UPDATE CASCADE ON DELETE SET NULL
  ) ENGINE=InnoDB;

  --
  -- 11) CONSULTATION TABLE (client requests, employee/admin handles)
  --
  CREATE TABLE `consultation` (
    `consultation_id` INT AUTO_INCREMENT PRIMARY KEY,
    `client_id` INT NOT NULL,    -- references user with role=CLIENT
    `employee_id` INT NOT NULL,  -- references user with role=EMPLOYEE or ADMIN
    `requested_time` DATETIME NOT NULL,
    `status` ENUM('REQUESTED','CONFIRMED','COMPLETED','CANCELED')
      NOT NULL DEFAULT 'REQUESTED',
    `notes` TEXT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_consultation_client`
      FOREIGN KEY (`client_id`) REFERENCES `user`(`user_id`)
      ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `fk_consultation_employee`
      FOREIGN KEY (`employee_id`) REFERENCES `user`(`user_id`)
      ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB;

  --
  -- 12) NOTIFICATIONS TABLE (each user can receive multiple alerts)
  --
  CREATE TABLE `notifications` (
    `notification_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `content` TEXT NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT FALSE,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_notification_user`
      FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
      ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB;

  -- Add this to your migrations (e.g., in a file called 13_password_reset.sql)

  CREATE TABLE `password_reset` (
    `reset_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `reset_token` VARCHAR(255) NOT NULL,
    `expires_at` DATETIME NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_password_reset_user`
      FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
      ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB;


  CREATE TABLE `employee_cin` (
    `cin_id`      INT          NOT NULL AUTO_INCREMENT,
    `user_id`     INT          NOT NULL,
    `cin`         VARCHAR(50)  NOT NULL,
    `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`cin_id`),
    KEY `idx_employee_cin_user` (`user_id`),
    CONSTRAINT `fk_employee_cin_user`
      FOREIGN KEY (`user_id`)
      REFERENCES `user` (`user_id`)
      ON UPDATE CASCADE
      ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


  --
  -- Re-enable foreign key checks
  --
  SET FOREIGN_KEY_CHECKS = 1;