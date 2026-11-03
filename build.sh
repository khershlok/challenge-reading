#!/bin/sh
# Encrypts the site (the lessons, news and app.js) and writes it into index.html, so only people who sign in can read it.
#
#   sh build.sh
#
# How the lock works:
# - Each build encrypts the site with a new random key (#siteData).
# - That key is then locked once for each login that may open it (#siteKeys): your own login (the same
#   "username|password" as the French course, read from ~/.challenge-reading-login) and any guest codes
#   still in ~/.challenge-reading-guests. Both files stay outside the repo so they can never be pushed.
# - A login unlocks its copy of the key with PBKDF2-SHA256 (250,000 rounds) and AES-256: keep ITERATIONS in step with index.html.
# Your login's salt is fixed so that "stay signed in" keeps working after each rebuild.
# Guest codes are made with guest.sh. Once a guest code's last sign-in time plus its 12 hours has passed,
# this script drops it, so after the next push it no longer opens anything.
# The readable files in content/, research/ and app.js stay on this computer only (see .gitignore).
set -e
cd "$(dirname "$0")"
ITERATIONS=250000
OWNER_SALT=ea060dd4531dfffc
GUEST_HOURS=12
LOGIN="$HOME/.challenge-reading-login"
GUESTS="$HOME/.challenge-reading-guests"
# openssl is a Windows program, so give it the Windows form of the path (the folder name has a space).
winpath() { if command -v cygpath >/dev/null; then cygpath -w "$1"; else printf '%s' "$1"; fi; }
if [ ! -s "$LOGIN" ]; then
  echo "Missing $LOGIN: create it with one line, username|password (the same as the French course)." >&2
  exit 1
fi
NOW=$(date +%s)
KEY=$(openssl rand -hex 32)
IV=$(openssl rand -hex 16)

# Lessons first (week-01, week-02, ...), then "Why this matters now", the news, and the app that shows them.
DATA=$({ echo "// challenge-reading-v1"; for f in content/weeks/week-*.js content/now.js content/news.js app.js; do cat "$f"; echo ";"; done; } |
  openssl enc -aes-256-cbc -K "$KEY" -iv "$IV" | base64 -w0)

# Locks the site key with one login. $1 is the salt, $2 how openssl gets the password (file:... or env:...).
# With a fixed salt (-S) openssl leaves out its "Salted__" + salt header, so it is added by hand: the page reads the salt from it.
wrap() {
  { printf 'Salted__'; printf '%s' "$1" | xxd -r -p;
    printf 'challenge-key-v1 %s %s' "$KEY" "$IV" | openssl enc -aes-256-cbc -pbkdf2 -iter "$ITERATIONS" -md sha256 -S "$1" -pass "$2"; } | base64 -w0
}
KEYS="{\"kind\":\"owner\",\"wrap\":\"$(wrap "$OWNER_SALT" "file:$(winpath "$LOGIN")")\"}"

# Guest codes: one line each, "code|useBy|salt", where useBy is the last moment (Unix seconds) to sign in for the first time.
GUEST_COUNT=0
if [ -s "$GUESTS" ]; then
  KEPT=""
  while IFS='|' read -r code useby salt; do
    [ -n "$code" ] || continue
    [ "$NOW" -gt $((useby + GUEST_HOURS * 3600)) ] && continue
    KEPT="$KEPT$code|$useby|$salt
"
    export GUEST_LOGIN="guest|$code"
    KEYS="$KEYS,{\"kind\":\"guest\",\"useBy\":$useby,\"hours\":$GUEST_HOURS,\"wrap\":\"$(wrap "$salt" env:GUEST_LOGIN)\"}"
    GUEST_COUNT=$((GUEST_COUNT + 1))
  done < "$GUESTS"
  unset GUEST_LOGIN
  printf '%s' "$KEPT" > "$GUESTS"
fi

grep -q 'id="siteData"' index.html && grep -q 'id="siteKeys"' index.html || { echo "index.html is missing its #siteData or #siteKeys line" >&2; exit 1; }
sed -i -e "s|^<script type=\"text/plain\" id=\"siteData\">.*</script>\$|<script type=\"text/plain\" id=\"siteData\">$DATA</script>|" \
  -e "s|^<script type=\"application/json\" id=\"siteKeys\">.*</script>\$|<script type=\"application/json\" id=\"siteKeys\">[$KEYS]</script>|" index.html
echo "Wrote encrypted site into index.html (${#DATA} characters, $GUEST_COUNT guest code(s))"
