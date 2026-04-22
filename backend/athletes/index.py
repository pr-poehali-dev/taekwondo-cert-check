"""Список и управление спортсменами ATF"""
import json
import os
import psycopg2

SCHEMA = "t_p71753210_taekwondo_cert_check"
CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}

    conn = get_conn()
    cur = conn.cursor()

    try:
        if method == "GET":
            search = params.get("search", "").strip()
            rank_filter = params.get("rank", "").strip()

            conditions = []
            values = []

            if search:
                conditions.append(
                    "(LOWER(a.name) LIKE %s OR LOWER(a.region) LIKE %s OR LOWER(a.rank) LIKE %s)"
                )
                like = f"%{search.lower()}%"
                values += [like, like, like]

            if rank_filter:
                conditions.append("a.rank = %s")
                values.append(rank_filter)

            where = ("WHERE " + " AND ".join(conditions)) if conditions else ""

            cur.execute(f"""
                SELECT a.id, a.name, a.rank, a.region, a.weight, a.medals, a.rating,
                       c.cert_num, c.cert_date, c.status
                FROM {SCHEMA}.athletes a
                LEFT JOIN {SCHEMA}.certificates c ON c.athlete_id = a.id
                {where}
                ORDER BY a.rating DESC
            """, values)

            rows = cur.fetchall()
            athletes = []
            for r in rows:
                athletes.append({
                    "id": r[0],
                    "name": r[1],
                    "rank": r[2],
                    "region": r[3],
                    "weight": r[4],
                    "medals": r[5],
                    "rating": r[6],
                    "certNum": r[7],
                    "certDate": r[8].isoformat() if r[8] else None,
                    "certStatus": r[9],
                })

            return {"statusCode": 200, "headers": CORS, "body": json.dumps({"athletes": athletes}, ensure_ascii=False)}

        if method == "POST":
            body = json.loads(event.get("body") or "{}")
            cur.execute(f"""
                INSERT INTO {SCHEMA}.athletes (name, rank, region, weight, medals, rating)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (
                body["name"], body["rank"],
                body.get("region", ""), body.get("weight", ""),
                int(body.get("medals", 0)), int(body.get("rating", 0))
            ))
            athlete_id = cur.fetchone()[0]

            if body.get("certNum") and body.get("certDate"):
                cur.execute(f"""
                    INSERT INTO {SCHEMA}.certificates (cert_num, athlete_id, cert_date, status)
                    VALUES (%s, %s, %s, 'active')
                    ON CONFLICT (cert_num) DO NOTHING
                """, (body["certNum"], athlete_id, body["certDate"]))

            conn.commit()
            return {"statusCode": 201, "headers": CORS, "body": json.dumps({"id": athlete_id})}

        if method == "PUT":
            body = json.loads(event.get("body") or "{}")
            athlete_id = body.get("id")
            cur.execute(f"""
                UPDATE {SCHEMA}.athletes
                SET name=%s, rank=%s, region=%s, weight=%s, medals=%s, rating=%s
                WHERE id=%s
            """, (
                body["name"], body["rank"],
                body.get("region", ""), body.get("weight", ""),
                int(body.get("medals", 0)), int(body.get("rating", 0)),
                athlete_id
            ))
            if body.get("certNum") and body.get("certDate"):
                cur.execute(f"""
                    INSERT INTO {SCHEMA}.certificates (cert_num, athlete_id, cert_date, status)
                    VALUES (%s, %s, %s, 'active')
                    ON CONFLICT (cert_num) DO UPDATE SET cert_date=%s, athlete_id=%s
                """, (body["certNum"], athlete_id, body["certDate"], body["certDate"], athlete_id))
            conn.commit()
            return {"statusCode": 200, "headers": CORS, "body": json.dumps({"ok": True})}

        if method == "DELETE":
            body = json.loads(event.get("body") or "{}")
            athlete_id = body.get("id")
            cur.execute(f"DELETE FROM {SCHEMA}.athletes WHERE id=%s", (athlete_id,))
            conn.commit()
            return {"statusCode": 200, "headers": CORS, "body": json.dumps({"ok": True})}

        return {"statusCode": 405, "headers": CORS, "body": "Method Not Allowed"}

    finally:
        cur.close()
        conn.close()
