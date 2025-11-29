# Environment Variables Setup Guide

## Overview
TISA Brain uses three environment variables for API access:
- `VITE_CLAUDE_API_KEY` - Anthropic Claude API key
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Security Best Practices

### ❌ DO NOT:
- Commit `.env` files to Git
- Share API keys in messages or emails
- Hardcode secrets in the code
- Commit environment files with real credentials

### ✅ DO:
- Use `.env.local` for local development (not committed)
- Store production secrets in Vercel dashboard only
- Rotate keys if they're ever exposed
- Use `.gitignore` to prevent accidental commits

## Setup for Local Development

### 1. Create `.env.local` (NEVER committed)
```bash
# In project root, create .env.local file
cat > .env.local << 'ENVFILE'
VITE_CLAUDE_API_KEY=sk-ant-api03-[YOUR_KEY]
VITE_SUPABASE_URL=https://zcoxhpakcnkulqyfghzz.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_[YOUR_KEY]
ENVFILE
```

### 2. Add to `.gitignore`
Already configured - see `.gitignore`:
```
.env
.env.local
.env.development
.env.production
.env.test
```

### 3. Get Your API Keys

**Claude API Key:**
1. Go to https://platform.claude.com/settings/keys
2. Create a new API key or copy existing
3. Add to `.env.local`

**Supabase Keys:**
1. Go to https://supabase.com/dashboard
2. Select project: `zcoxhpakcnkulqyfghzz`
3. Go to Settings → API
4. Copy the URL and Anon Key
5. Add to `.env.local`

## Setup for Production (Vercel)

All secrets stored in Vercel Dashboard (encrypted):
1. https://vercel.com/artems-projects-262432f4/tisa-brain/settings/environment-variables
2. Add three variables: VITE_CLAUDE_API_KEY, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
3. Set for all environments: Production, Preview, Development

## If Keys Are Exposed

1. **Immediately rotate the key** in the service dashboard
2. **Update Vercel environment variables** with new key
3. **Commit the change** (no secrets in commit)
4. **Deploy** - Vercel will pick up new env vars automatically

## GitHub Secret Scanning

GitHub automatically detects and revokes Anthropic keys committed to repos.
If notified:
1. The key is already revoked and unsafe
2. Generate a new key
3. Update Vercel and local `.env.local`
4. No public action needed - GitHub handled revocation

## Files Committed to Git

✅ `.env.example` - Template with placeholder values (OK to commit)
✅ `ENV_SETUP.md` - This guide (OK to commit)
✅ Source code - No secrets anywhere (OK to commit)

❌ `.env` - Real secrets (NEVER commit)
❌ `.env.local` - Local secrets (NEVER commit)
❌ `.env.production` - Production secrets (NEVER commit)

