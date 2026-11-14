from flask import Flask, jsonify
from flask_cors import CORS

from routes.auth import auth_bp


def create_app() -> Flask:
    app = Flask(__name__)
    # Vite proxies /api in dev, but allow the frontend origin directly too.
    CORS(app, origins=["http://localhost:3000"])

    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"})

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)
