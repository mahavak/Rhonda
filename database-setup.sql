-- Create tables for Rhonda Patrick wellness tracking
-- Run this in Hostinger's phpMyAdmin

-- User tracking table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Supplement tracking
CREATE TABLE IF NOT EXISTS supplement_tracking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    supplement_id VARCHAR(50),
    taken BOOLEAN DEFAULT TRUE,
    notes TEXT,
    tracked_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Sauna sessions
CREATE TABLE IF NOT EXISTS sauna_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    duration INT,
    temperature INT,
    notes TEXT,
    session_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- User notes
CREATE TABLE IF NOT EXISTS user_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes for performance
CREATE INDEX idx_supplement_user_date ON supplement_tracking(user_id, tracked_date);
CREATE INDEX idx_sauna_user_date ON sauna_sessions(user_id, session_date);