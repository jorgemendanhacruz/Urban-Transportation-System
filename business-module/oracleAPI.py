from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
import oracledb
import random
import requests
from datetime import timedelta

# -----------------------------------------
# CONFIG ORACLE
# -----------------------------------------
DB_USER = "SYSTEM"
DB_PASSWORD = "MyStrongPass1"
DB_HOST = "localhost"
DB_PORT = 1521
DB_SERVICE = "FREEPDB1"

DB_DSN = f"{DB_HOST}:{DB_PORT}/{DB_SERVICE}"

def get_connection():
    return oracledb.connect(
        user=DB_USER,
        password=DB_PASSWORD,
        dsn=DB_DSN
    )

# -----------------------------------------
# CONFIG NEO4J (NODE SERVICE)
# -----------------------------------------
NEO4J_API_URL = "http://localhost:3000/route"
# podes mudar para env var depois


# -----------------------------------------
app = Flask(__name__)
app.secret_key = "s3cr3t"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=1)


# ------------------------ USERS ORACLE ------------------------

def row_to_user_dict(row):
    return {
        "SystemUserCode": row[0],
        "first_name": row[1],
        "last_name": row[2],
        "email": row[3],
        "birthday": row[4].strftime("%Y-%m-%d") if row[4] else None,
        "account_id": row[5],
        "pass": row[6],
    }


def get_user_by_id(user_id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT SystemUserCode, first_name, last_name, email, birthday, account_id, pass
        FROM SYSTEMUSERS
        WHERE SystemUserCode = :id
    """, {"id": user_id})
    row = cur.fetchone()
    cur.close()
    conn.close()
    return row_to_user_dict(row) if row else None


def get_user_by_email_and_password(email, password):
    if not email or not password:
        return None
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT SystemUserCode, first_name, last_name, email, birthday, account_id, pass
        FROM SYSTEMUSERS
        WHERE LOWER(email)=LOWER(:email) AND pass=:password
    """, {"email": email.strip(), "password": password.strip()})
    row = cur.fetchone()
    cur.close()
    conn.close()
    return row_to_user_dict(row) if row else None


# --------------------------------------------------------------
# HOME
# --------------------------------------------------------------
@app.route("/")
def index():
    user = get_user_by_id(session["user_id"]) if "user_id" in session else None
    return render_template("index.html", user=user)


# --------------------------------------------------------------
# REGISTER
# --------------------------------------------------------------
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        first_name = request.form.get("first_name")
        last_name  = request.form.get("last_name")
        email      = request.form.get("email")
        password   = request.form.get("password")
        birthday   = request.form.get("birthday")

        system_user_code = random.randint(1000, 999999)
        account_id       = random.randint(1000, 999999)

        try:
            conn = get_connection()
            cur = conn.cursor()

            cur.execute("SELECT 1 FROM SYSTEMUSERS WHERE LOWER(email)=LOWER(:email)", {"email": email})
            if cur.fetchone():
                flash("Esse email já está registado.", "error")
                return redirect(url_for("login"))

            if birthday:
                cur.execute("""
                    INSERT INTO SYSTEMUSERS
                    (SystemUserCode, first_name, last_name, email, birthday, account_id, pass)
                    VALUES
                    (:code, :fn, :ln, :email, TO_DATE(:bday,'YYYY-MM-DD'), :acc, :pwd)
                """, {
                    "code": system_user_code,
                    "fn": first_name,
                    "ln": last_name,
                    "email": email,
                    "bday": birthday,
                    "acc": account_id,
                    "pwd": password
                })
            else:
                cur.execute("""
                    INSERT INTO SYSTEMUSERS
                    (SystemUserCode, first_name, last_name, email, birthday, account_id, pass)
                    VALUES
                    (:code, :fn, :ln, :email, NULL, :acc, :pwd)
                """, {
                    "code": system_user_code,
                    "fn": first_name,
                    "ln": last_name,
                    "email": email,
                    "acc": account_id,
                    "pwd": password
                })

            conn.commit()

            session["user_id"] = system_user_code
            session["user_name"] = first_name
            session["user_email"] = email

            flash("Registo efetuado com sucesso!", "success")
            return redirect(url_for("index"))

        except Exception as e:
            flash(f"Erro no registo: {e}", "error")
        finally:
            cur.close()
            conn.close()

    return render_template("register.html")


# --------------------------------------------------------------
# LOGIN
# --------------------------------------------------------------
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        user = get_user_by_email_and_password(email, password)

        if user:
            session.permanent = True
            session["user_id"] = user["SystemUserCode"]
            session["user_name"] = user["first_name"]
            session["user_email"] = user["email"]
            flash("Login realizado com sucesso!", "success")
            return redirect(url_for("index"))

        flash("Email ou password incorretos.", "error")

    return render_template("login.html")


# --------------------------------------------------------------
# LOGOUT
# --------------------------------------------------------------
@app.route("/logout")
def logout():
    session.clear()
    flash("Terminaste a sessão.", "success")
    return redirect(url_for("index"))


# --------------------------------------------------------------
# RESULT — INTEGRAR EXPRESS (NEO4J)
# --------------------------------------------------------------

@app.route("/result")
def result():
    if "user_id" not in session:
        flash("Precisas de fazer login primeiro.", "error")
        return redirect(url_for("login"))

    from_stop = request.args.get("from")
    to_stop   = request.args.get("to")
    type_req  = request.args.get("type", "simple")

    # Mapear os endpoints do Node:
    if type_req == "details":
        endpoint = "details"
    elif type_req == "transfer":
        endpoint = "with-transfer"
    else:
        endpoint = ""   # rota simples

    try:
        url = f"http://127.0.0.1:3000/route/{endpoint}?from={from_stop}&to={to_stop}"
        if endpoint == "":
            url = f"http://127.0.0.1:3000/route?from={from_stop}&to={to_stop}"

        response = requests.get(url)
        data = response.json()

    except Exception as e:
        data = {"error": str(e)}

    return render_template("result.html", route_data=data)

@app.route("/favorites")
def favorites():
    user_id = session["user_id"]
    resp = requests.get(f"http://localhost:4000/api/favorite/{user_id}")
    return render_template("result_generic.html",
                           title="Favoritos",
                           data=resp.json())

@app.route("/notifications")
def notifications():
    user_id = session["user_id"]
    resp = requests.get(f"http://localhost:4000/api/notification/{user_id}")
    return render_template("result_generic.html",
                           title="Notificações",
                           data=resp.json())

@app.route("/history")
def history():
    user_id = session["user_id"]
    resp = requests.get(f"http://localhost:4000/api/userTripHistory/{user_id}")
    return render_template("result_generic.html",
                           title="Histórico",
                           data=resp.json())


    

# --------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
