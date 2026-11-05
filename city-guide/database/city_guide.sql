-- Run this once in MySQL Workbench if you prefer to create the database manually.
CREATE DATABASE IF NOT EXISTS city_guide CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE city_guide;

CREATE TABLE IF NOT EXISTS owners (
  id CHAR(36) PRIMARY KEY,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  plan ENUM('free','premium') NOT NULL DEFAULT 'free',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS businesses (
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

-- This shows every saved business together with its owner.
SELECT b.name AS business_name, CONCAT(o.first_name, ' ', o.last_name) AS owner_name, o.email
FROM businesses AS b
JOIN owners AS o ON o.id = b.owner_id
ORDER BY b.created_at DESC;
