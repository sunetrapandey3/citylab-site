-- ============================================================
-- City Lab — Database Setup Script
-- Run: mysql -u root -p < backend/config/setup.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS citylab CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE citylab;

-- Create dedicated user (skip if already exists)
CREATE USER IF NOT EXISTS 'citylab_user'@'localhost' IDENTIFIED BY 'citylab123';
GRANT ALL PRIVILEGES ON citylab.* TO 'citylab_user'@'localhost';
FLUSH PRIVILEGES;

-- ─── Tables ──────────────────────────────────────────────────

DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS tests;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  is_admin   TINYINT(1)   NOT NULL DEFAULT 0,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tests (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(150) NOT NULL,
  category    VARCHAR(80)  NOT NULL,
  price       INT          NOT NULL,
  description TEXT
);

CREATE TABLE bookings (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  user_id      INT         NOT NULL,
  test_id      INT         NOT NULL,
  booking_date DATE        NOT NULL,
  time_slot    VARCHAR(20) NOT NULL,
  status       ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
  created_at   TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
);

-- ─── Seed: Admin User (password = admin123) ───────────────────
-- bcrypt hash generated for "admin123" with salt rounds = 10
INSERT INTO users (name, email, password, is_admin) VALUES
('Admin', 'admin@citylab.com', '$2b$10$b1FK3UigZG5XUQlwR5V.0OehOZOmIsfacE0QgLUyDKcmaxZlh2LTm', 1);
-- Password: admin123

-- ─── Seed: Lab Tests ─────────────────────────────────────────

-- Blood Tests
INSERT INTO tests (name, category, price, description) VALUES
('CBC Test', 'Blood Test', 200, 'A Complete Blood Count (CBC) test is a comprehensive blood test used to evaluate overall health and detect a range of disorders, such as anemia, infection, and leukemia. It measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets.'),
('Thyroid Profile Test', 'Blood Test', 400, 'The Thyroid Profile Test measures the levels of thyroid hormones (T3, T4) and TSH in the blood. It is used to diagnose hypothyroidism, hyperthyroidism, and other thyroid disorders.'),
('Lipid Profile Test', 'Blood Test', 350, 'A Lipid Profile Test measures the levels of cholesterol and triglycerides in the blood to assess cardiovascular risk. It includes total cholesterol, LDL, HDL, and VLDL levels.'),
('Malaria Test', 'Blood Test', 200, 'A Malaria Test is a vital diagnostic tool for detecting malaria infections. This test involves examining a blood sample for the presence of Plasmodium parasites, which cause malaria. Early detection is crucial for effective treatment.');

-- Stool Tests
INSERT INTO tests (name, category, price, description) VALUES
('Stool Routine', 'Stool Test', 100, 'A routine stool examination to detect parasites, bacteria, blood, or other abnormalities in the digestive system. Helps diagnose gastrointestinal disorders.'),
('Occult Blood Test', 'Stool Test', 150, 'Detects hidden (occult) blood in the stool that cannot be seen with the naked eye. Used to screen for colorectal cancer and gastrointestinal bleeding.'),
('Stool Culture', 'Stool Test', 300, 'A stool culture identifies bacteria that may be causing a gastrointestinal infection. The culture is grown in a laboratory to identify the specific organism and determine antibiotic sensitivity.'),
('H. Pylori Stool Antigen', 'Stool Test', 400, 'Detects Helicobacter pylori (H. pylori) antigens in the stool. H. pylori is a common cause of peptic ulcers and chronic gastritis.'),
('Reducing Substances in Stool', 'Stool Test', 120, 'Tests for the presence of reducing substances (undigested sugars) in stool, often used to diagnose carbohydrate malabsorption in infants and children.');

-- Urine Tests
INSERT INTO tests (name, category, price, description) VALUES
('Urine Routine & Microscopy', 'Urine Test', 80, 'A routine urinalysis that examines the physical, chemical, and microscopic properties of urine. Used to detect UTIs, kidney disease, and diabetes.'),
('Urine Culture & Sensitivity', 'Urine Test', 250, 'Cultures urine to identify bacteria causing a urinary tract infection and determines which antibiotics will be most effective.'),
('Urine Albumin (Microalbumin)', 'Urine Test', 150, 'Measures small amounts of albumin protein in urine. An early indicator of kidney damage, especially in diabetic patients.'),
('Pregnancy Test (Urine)', 'Urine Test', 80, 'Detects the presence of human chorionic gonadotropin (hCG) hormone in urine, confirming pregnancy.'),
('24-Hour Urine Protein', 'Urine Test', 200, 'Collects all urine over 24 hours to measure the total amount of protein excreted. Used to evaluate kidney function and detect proteinuria.');

-- Plasma Tests
INSERT INTO tests (name, category, price, description) VALUES
('Plasma Glucose (Fasting)', 'Plasma Test', 80, 'Measures blood sugar levels after an overnight fast. Used to diagnose diabetes mellitus and monitor glucose control.'),
('HbA1c (Glycated Hemoglobin)', 'Plasma Test', 300, 'Provides an average blood glucose level over the past 2-3 months. Essential for managing diabetes and assessing long-term blood sugar control.'),
('Electrolytes Panel', 'Plasma Test', 250, 'Measures levels of key electrolytes (sodium, potassium, chloride, bicarbonate) in the blood. Critical for assessing fluid balance, kidney function, and heart health.'),
('Plasma Fibrinogen', 'Plasma Test', 400, 'Measures the level of fibrinogen, a protein essential for blood clotting. Used to evaluate bleeding disorders and cardiovascular risk.'),
('D-Dimer Test', 'Plasma Test', 500, 'Detects the presence of a fibrin degradation product, used to rule out serious blood clot conditions like deep vein thrombosis (DVT) and pulmonary embolism.');

-- Swab Tests
INSERT INTO tests (name, category, price, description) VALUES
('Throat Swab Culture', 'Swab Test', 200, 'Collects a sample from the back of the throat to identify bacterial or viral infections, such as strep throat or tonsillitis.'),
('Nasal Swab (COVID/Flu)', 'Swab Test', 350, 'Collects a nasal sample to detect respiratory infections including COVID-19, influenza A/B, and RSV using rapid antigen or RT-PCR methods.'),
('Wound Swab Culture', 'Swab Test', 300, 'Collects a sample from a wound to identify infecting microorganisms and determine appropriate antibiotic treatment for wound infections.');

-- Medical Testing
INSERT INTO tests (name, category, price, description) VALUES
('Electrocardiogram (ECG)', 'Medical Testing', 200, 'Records the electrical activity of the heart. Used to detect arrhythmias, heart attacks, and other cardiac conditions. Quick and non-invasive.'),
('X-Ray (Chest/Part)', 'Medical Testing', 300, 'A diagnostic imaging test using low-dose radiation to capture images of bones, lungs, and the chest cavity. Used to detect fractures, infections, and lung conditions.');
