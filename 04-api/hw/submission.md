# Homework 4 submission

Keep this short. Do not paste your API key.

## What POST /ask does (2–3 sentences)

It accepts a prompt, sends it to OpenAI's gpt-4o-mini model, and returns the model's reply as `{ reply: "..." }`. If the prompt is missing it returns a 400 error, and if the OpenAI request fails it returns an error instead of a reply.

## Confirm

- [ ] Insomnia got `{ reply: ... }`
- [x] I ran `git status` — `.env` and `node_modules` were **not** staged
