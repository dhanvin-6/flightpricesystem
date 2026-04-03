from flask import Flask, send_from_directory, jsonify, request, redirect, url_for
import mysql.connector

app = Flask(__name__)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="admin",   # 🔴 change if needed
    database="flightdatabase"
)

cursor = db.cursor()

# ================= ROUTES =================

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
        user = cursor.fetchone()

        if user:
            return redirect(url_for('dashboard'))   # ✅ FIXED REDIRECT
        else:
            return "Invalid Login ❌"

    return send_from_directory(".", "login.html")

# ✅ NEW API FOR FETCH LOGIN (IMPORTANT)
@app.route("/login-check", methods=["POST"])
def login_check():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
    user = cursor.fetchone()

    if user:
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "fail"})

@app.route("/search")
def search():
    return send_from_directory(".", "search.html")

@app.route("/dashboard")
def dashboard():
    return send_from_directory(".", "dashboard.html")

@app.route("/deals")
def deals():
    return send_from_directory(".", "deals.html")

@app.route("/bookings")
def bookings():
    return send_from_directory(".", "bookings.html")

@app.route("/booking_insights")
def booking_insights():
    return send_from_directory(".", "booking_insights.html")

# ================= FLIGHT DATA =================

@app.route("/get-flights")
def get_flights():
    cursor.execute("SELECT * FROM flights")
    data = cursor.fetchall()

    flights = []
    for row in data:
        flights.append({
            "id": row[0],
            "airline": row[1],
            "from": row[2],
            "to": row[3],
            "departure": row[4],
            "arrival": row[5],
            "price": row[6]
        })

    return jsonify({"flights": flights})

# ================= RUN =================

if __name__ == "__main__":
    app.run(debug=True)