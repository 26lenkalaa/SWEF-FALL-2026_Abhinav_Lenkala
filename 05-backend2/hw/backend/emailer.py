"""Sends Abhi the 'someone wants an account' email."""
import smtplib
from email.message import EmailMessage
from html import escape

from config import ADMIN_EMAIL, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER


def email_configured() -> bool:
    return bool(ADMIN_EMAIL and SMTP_USER and SMTP_PASSWORD)


def send_signup_request(display_name, username, note, approve_url, deny_url) -> bool:
    """Email the approve/deny links. Returns False (and prints the links) if
    SMTP isn't set up, so local development still works."""
    if not email_configured():
        print("\n[signup] Email not configured -- approve or deny here instead:")
        print(f"  approve: {approve_url}\n  deny:    {deny_url}\n", flush=True)
        return False

    msg = EmailMessage()
    msg["Subject"] = f"{display_name} wants an account on your site"
    msg["From"] = SMTP_USER
    msg["To"] = ADMIN_EMAIL

    note_line = f"Their note: {note}\n\n" if note else ""
    msg.set_content(
        f"{display_name} (username: {username}) asked for an account.\n\n"
        f"{note_line}"
        f"Approve: {approve_url}\n"
        f"Deny:    {deny_url}\n\n"
        "Links expire in 7 days."
    )
    note_html = f"<p><em>&ldquo;{escape(note)}&rdquo;</em></p>" if note else ""
    msg.add_alternative(
        f"""<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#1a1f3a">
<p><strong>{escape(display_name)}</strong> (username <code>{escape(username)}</code>) asked for an account on your site.</p>
{note_html}
<p>
  <a href="{approve_url}" style="display:inline-block;padding:8px 16px;background:#0e163e;color:#f0dede;text-decoration:none;border-radius:6px">Approve</a>
  &nbsp;
  <a href="{deny_url}" style="color:#8a2a2a">Deny</a>
</p>
<p style="color:#666;font-size:13px">These links expire in 7 days.</p>
</div>""",
        subtype="html",
    )

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as smtp:
            smtp.starttls()
            smtp.login(SMTP_USER, SMTP_PASSWORD)
            smtp.send_message(msg)
        return True
    except (smtplib.SMTPException, OSError) as exc:
        print(f"[signup] Couldn't send email ({exc}). Links:\n  {approve_url}\n  {deny_url}", flush=True)
        return False
