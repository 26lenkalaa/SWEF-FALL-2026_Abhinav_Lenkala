import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, setToken } from "../api.js";
import { AuthShell, ErrorText, Field, primaryButton, secondaryButton } from "../components/Form.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // The backend checks the credentials. Nothing is verified here.
      const { access_token } = await login(username, password);
      setToken(access_token);
      navigate("/landing", { replace: true });
    } catch (err) {
      setError(err.message);
      setPassword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Log in"
      intro={
        <>
          <p>
            This is my personal site: a bit about me, what I&apos;ve built, and too many
            opinions about Tottenham.
          </p>
          <p>
            It&apos;s behind a login while I learn how server-side auth works. If we know
            each other, ask for an account and I&apos;ll let you in.
          </p>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          autoCapitalize="none"
          autoFocus
          required
        />
        <Field
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <ErrorText>{error}</ErrorText>
        <button type="submit" disabled={loading} className={primaryButton}>
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6">
        <p className="text-sm text-muted">Don&apos;t have an account?</p>
        <Link to="/signup" className={`${secondaryButton} text-center`}>
          Sign up
        </Link>
      </div>
    </AuthShell>
  );
}
