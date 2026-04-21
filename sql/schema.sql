CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY, game TEXT, user_id TEXT, nominal TEXT, payment_method TEXT, status TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
