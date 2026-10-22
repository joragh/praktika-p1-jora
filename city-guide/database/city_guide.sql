-- Import this file in MySQL Workbench: File > Open SQL Script, then click Execute.
CREATE DATABASE IF NOT EXISTS city_guide CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE city_guide;

CREATE TABLE owners (
  id CHAR(36) PRIMARY KEY,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  plan ENUM('free','premium') NOT NULL DEFAULT 'free',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE businesses (
  id CHAR(36) PRIMARY KEY,
  owner_id CHAR(36) NOT NULL,
  name VARCHAR(160) NOT NULL,
  category VARCHAR(100) NOT NULL,
  google_maps_url VARCHAR(2048) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  opening_hours VARCHAR(140) NULL,
  website VARCHAR(2048) NULL,
  is_promoted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_business_owner FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
);

CREATE TABLE subscriptions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  owner_id CHAR(36) NOT NULL,
  plan ENUM('premium') NOT NULL DEFAULT 'premium',
  status ENUM('active','cancelled','expired') NOT NULL DEFAULT 'active',
  monthly_price DECIMAL(10,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'EUR',
  starts_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ends_at DATETIME NULL,
  CONSTRAINT fk_subscription_owner FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
);

-- Helpful queries for the project presentation:
-- SELECT b.name, b.category, o.first_name, o.last_name, o.email, o.plan FROM businesses b JOIN owners o ON o.id = b.owner_id;
-- SELECT * FROM businesses WHERE is_promoted = TRUE;
