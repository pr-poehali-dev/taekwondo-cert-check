INSERT INTO t_p71753210_taekwondo_cert_check.athletes (name, rank, region, weight, medals, rating)
VALUES ('Anarkulov Linar', '5 дан', '', '', 0, 100);

INSERT INTO t_p71753210_taekwondo_cert_check.certificates (cert_num, athlete_id, cert_date, status)
SELECT 'RU-05-001', id, CURRENT_DATE, 'active'
FROM t_p71753210_taekwondo_cert_check.athletes
WHERE name = 'Anarkulov Linar'
ORDER BY id DESC
LIMIT 1;
