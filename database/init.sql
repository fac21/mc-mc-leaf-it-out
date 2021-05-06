BEGIN;

DROP TABLE IF EXISTS users, sessions, plants CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE sessions (
    sid TEXT PRIMARY KEY,
    data JSON NOT NULL
);

CREATE TABLE plants (
    plant_id SERIAL PRIMARY KEY,
    plant_type TEXT NOT NULL,
    plant_content TEXT NOT NULL,
    img BYTEA,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP
);

INSERT INTO users (username, email, password) VALUES
(
  'tiarama',
  'craig@craig.com',
  'password1234'
),
(
  'Chisha',
  'chisha@chisha.com',
  'chisha'
);

INSERT INTO sessions (sid, data) VALUES
(
  'abc123',
  '{"test":"stuff"}'
);

INSERT INTO plants ( plant_type, plant_content, img_url, user_id, created_at) VALUES
  ('cactus',  'I am a cactus, please buy me', 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FjdHVzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60', 1, (SELECT CURRENT_TIMESTAMP)),
  ('fern',  'Lets have some fern', 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FjdHVzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60', 2, (SELECT CURRENT_TIMESTAMP))
;

COMMIT;