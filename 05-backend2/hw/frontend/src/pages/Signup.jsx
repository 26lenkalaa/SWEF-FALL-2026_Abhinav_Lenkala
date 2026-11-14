import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../api.js";
import { AuthShell, ErrorText, Field, primaryButton } from "../components/Form.jsx";

const empty = { name: "", username: "", password: "", confirm: "", note: "" };

export default function Signup() {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentAs, setSentAs] = useState(null);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("The two passwords don't match.");
      return;
    }
    setLoading(true);
    try {
      // The server validates everything again and emails Abhi to approve.
      await signup({
        name: form.name,
        username: form.username,
        password: form.password,
        note: form.note,
      });
      setSentAs(form.username.trim().toLowerCase());
      setForm(empty);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (sentAs) {
    return (
      <AuthShell
        title="Request sent"
        intro={
          <p>
            I&apos;ve been emailed about it. Once I approve it, you can log in as{" "}
            <span className="font-semibold text-paper">{sentAs}</span> with the password you just
            picked.
          </p>
        }
      >
        <Link to="/login" className="underline underline-offset-4 hover:text-white">
          Back to log in
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Sign up"
      intro={
        <>
          <p>
            Accounts are approved by hand. When you send this, I get an email and decide
            whether to let you in.
          </p>
          <p>
            Already have one? <Link to="/login" className="text-paper underline underline-offset-4 hover:text-white">Log in</Link>
          </p>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field id="name" label="Your name" value={form.name} onChange={update("name")} autoComplete="name" maxLength={60} required />
        <Field
          id="new-username"
          label="Username"
          hint="3–20 characters: lowercase letters, numbers or _"
          value={form.username}
          onChange={update("username")}
          autoComplete="username"
          autoCapitalize="none"
          pattern="[a-zA-Z0-9_]{3,20}"
          required
        />
        <Field
          id="new-password"
          label="Password"
          hint="At least 8 characters"
          type="password"
          value={form.password}
          onChange={update("password")}
          autoComplete="new-password"
          minLength={8}
          required
        />
        <Field id="confirm" label="Confirm password" type="password" value={form.confirm} onChange={update("confirm")} autoComplete="new-password" required />
        <Field
          id="note"
          label="How do we know each other? (optional)"
          rows={3}
          value={form.note}
          onChange={update("note")}
          maxLength={300}
        />
        <ErrorText>{error}</ErrorText>
        <button type="submit" disabled={loading} className={primaryButton}>
          {loading ? "Sending…" : "Send request"}
        </button>
      </form>
    </AuthShell>
  );
}
