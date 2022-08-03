-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS smt;

CREATE TABLE smt (
  id BIGINT GENERERATED ALWAYS AS IDENTITY,
  title VARCHAR,
  platform VARCHAR
);


INSERT INTO SMT (
  title, platform
) VALUES
('shin megami tensei 1', 'super famicom'),
('shin megami tensei 2', 'super famicom'),
('shin megami tensei 3', 'playstation 2'),
('shin megami tensei 4', 'nintendo ds'),
('shin megami tensei 5', 'nintendo switch');
