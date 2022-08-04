-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS smt;
DROP TABLE IF EXISTS consoles;
DROP TABLE IF EXISTS tmnt;

CREATE TABLE smt (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  title VARCHAR,
  platform VARCHAR
);

CREATE TABLE consoles (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  console VARCHAR,
  released NUMERIC
);

CREATE TABLE tmnt (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR,
  weapon VARCHAR
);

INSERT INTO tmnt (
  name, weapon
) VALUES
('leonardo', 'katana'),
('raphael', 'sai'),
('michelangelo', 'nun-chuck'),
('donatello', 'bo');

INSERT INTO consoles (
  console, released
) VALUES
('famicom', 1983),
('super famicom', 1990),
('sega genesis', 1989);

INSERT INTO SMT (
  title, platform
) VALUES
('shin megami tensei 1', 'super famicom'),
('shin megami tensei 2', 'super famicom'),
('shin megami tensei 3', 'playstation 2'),
('shin megami tensei 4', 'nintendo ds'),
('shin megami tensei 5', 'nintendo switch');
