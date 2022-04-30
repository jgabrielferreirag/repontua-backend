CREATE DATABASE provihack;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  cep CHAR(8),
  cnpj CHAR(14),
  logo_url TEXT,
  city TEXT,
  site_url TEXT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  cpf CHAR(11),
  email TEXT,
  password TEXT
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT,
  description TEXT,
  price INT,
  img_url TEXT,
  category_id INT REFERENCES categories (id),
  partner_id INT REFERENCES partners (id),
);

CREATE TABLE address (
  id SERIAL PRIMARY KEY,
  name TEXT,
  address TEXT,
  cep CHAR(8),
  user_id INT REFERENCES users (id)
);

CREATE TABLE user_points (
  id SERIAL PRIMARY KEY,
  amount INT,
  user_id INT REFERENCES users (id)
);