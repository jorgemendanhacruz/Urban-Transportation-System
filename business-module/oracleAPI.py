from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
import oracledb
import random
from datetime import timedelta

DB_USER = "SYSTEM"
DB_PASSWORD = "MyStrongPass1"
DB_HOST = "localhost"
DB_PORT = 1521
DB_SERVICE = "FREEPDB1"

DB_DSN = f"{DB_HOST}:{DB_PORT}/{DB_SERVICE}"

def get_connection():
    """
    Abre uma nova ligação Oracle usando python-oracledb em modo thin.
    """
    conn = oracledb.connect(
        user=DB_USER,
        password=DB_PASSWORD,
        dsn=DB_DSN
    )
    return conn

app = Flask(__name__)
app.secret_key = "s3cr3t"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=1)


def row_to_user_dict(row):
    """
    Converte uma linha de SYSTEMUSERS num dicionário.
    0: SystemUserCode
    1: first_name
    2: last_name
    3: email
    4: birthday
    5: account_id
    6: pass
    """
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
    """
    Vai buscar um utilizador pelo SystemUserCode.
    """
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
    """
    Vai buscar um utilizador pelo email + password (campo 'pass' na BD).
    """
    if email is None or password is None:
        return None

    email = email.strip()
    password = password.strip()

    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT SystemUserCode, first_name, last_name, email, birthday, account_id, pass
        FROM SYSTEMUSERS
        WHERE LOWER(email) = LOWER(:email) AND pass = :password
    """, {"email": email, "password": password})
    row = cur.fetchone()
    cur.close()
    conn.close()
    return row_to_user_dict(row) if row else None



@app.route("/")
def index():
    user = None
    if "user_id" in session:
        user = get_user_by_id(session["user_id"])
    return render_template("index.html", user=user)


@app.route("/SystemUser", methods=["GET"])
def get_SystemUser():
    """
    Devolve todos os utilizadores de SYSTEMUSERS em JSON.
    """
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT SystemUserCode, first_name, last_name, email, birthday, account_id, pass
        FROM SYSTEMUSERS
        ORDER BY SystemUserCode
    """)

    rows = cur.fetchall()
    cur.close()
    conn.close()

    users = [row_to_user_dict(r) for r in rows]
    return jsonify(users)


@app.route("/register", methods=["GET", "POST"])
def register():
    """
    Registo de utilizador na tabela SYSTEMUSERS.
    """
    if request.method == "POST":
        first_name = request.form.get("first_name")
        last_name  = request.form.get("last_name")
        email      = request.form.get("email")
        password   = request.form.get("password")
        birthday   = request.form.get("birthday")  # formato 'YYYY-MM-DD' ou vazio

        system_user_code = random.randint(1000, 999999)
        account_id       = random.randint(1000, 999999)

        conn = None
        cur = None
        try:
            conn = get_connection()
            cur = conn.cursor()

            # verificar se email já existe
            cur.execute("""
                SELECT 1 FROM SYSTEMUSERS WHERE email = :email
            """, {"email": email})
            exists = cur.fetchone()
            if exists:
                flash("Esse email já está registado. Faz login em vez disso.", "error")
                return redirect(url_for("login"))

            # tratar birthday opcional
            if birthday:
                # deixa o TO_DATE no SQL
                cur.execute("""
                    INSERT INTO SYSTEMUSERS
                        (SystemUserCode, first_name, last_name, email, birthday, account_id, pass)
                    VALUES
                        (:code, :fn, :ln, :email, TO_DATE(:bday, 'YYYY-MM-DD'), :acc, :pwd)
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
                # sem birthday → NULL
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
            return redirect(url_for("register"))

        finally:
            if cur:
                cur.close()
            if conn:
                conn.close()

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    """
    Login simples com email + password (campo 'pass' na BD).
    """
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        print("DEBUG login -> email recebido:", repr(email))
        print("DEBUG login -> password recebida:", repr(password))

        user = get_user_by_email_and_password(email, password)
        print("DEBUG login -> user devolvido:", user)

        user = get_user_by_email_and_password(email, password)
        if user:
            session.permanent = True
            session["user_id"] = user["SystemUserCode"]
            session["user_name"] = user["first_name"]
            session["user_email"] = user["email"]

            flash("Login realizado com sucesso!", "success")
            return redirect(url_for("index"))
        else:
            flash("Email ou password incorretos.", "error")

    return render_template("login.html")


@app.route("/logout")
def logout():
    session.clear()
    flash("Terminaste a sessão.", "success")
    return redirect(url_for("index"))

@app.route("/result")
def result():
    if "user_id" not in session:
        flash("Precisas de fazer login primeiro.", "error")
        return redirect(url_for("login"))
    return render_template("result.html")


if __name__ == "__main__":
    app.run(debug=True)
