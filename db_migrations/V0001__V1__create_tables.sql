CREATE TABLE IF NOT EXISTS t_p71753210_taekwondo_cert_check.athletes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  rank VARCHAR(50) NOT NULL,
  region VARCHAR(100),
  weight VARCHAR(20),
  medals INT DEFAULT 0,
  rating INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p71753210_taekwondo_cert_check.certificates (
  id SERIAL PRIMARY KEY,
  cert_num VARCHAR(50) UNIQUE NOT NULL,
  athlete_id INT REFERENCES t_p71753210_taekwondo_cert_check.athletes(id),
  cert_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
