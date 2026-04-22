ALTER TABLE t_p71753210_taekwondo_cert_check.athletes
ADD COLUMN IF NOT EXISTS title VARCHAR(100) DEFAULT '';

UPDATE t_p71753210_taekwondo_cert_check.athletes
SET title = 'Мастер спорта ATF'
WHERE name = 'Anarkulov Linar';
