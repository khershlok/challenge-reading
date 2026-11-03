#!/bin/sh
# Encrypts the site (the lessons, news and app.js) and writes it into index.html (the #siteData line),
# so only people who sign in can read it. It uses the same "username|password" sign-in as the French course.
#
#   sh build.sh
#
# The sign-in is read from ~/.challenge-reading-login (one line: username|password), kept outside the repo so it can never be pushed.
# The readable files in content/, research/ and app.js also stay on this computer only (see .gitignore).
# The page unlocks it with PBKDF2-SHA256 (250,000 rounds) and AES-256: keep ITERATIONS in step with index.html.
# The salt is fixed so that "stay signed in" keeps working after each rebuild.
set -e
cd "$(dirname "$0")"
ITERATIONS=250000
SALT=ea060dd4531dfffc
LOGIN="$HOME/.challenge-reading-login"
# openssl is a Windows program, so give it the Windows form of the path (the folder name has a space).
command -v cygpath >/dev/null && LOGIN=$(cygpath -w "$LOGIN")
if [ ! -s "$LOGIN" ]; then
  echo "Missing $LOGIN: create it with one line, username|password (the same as the French course)." >&2
  exit 1
fi
# Lessons first (week-01, week-02, ...), then "Why this matters now", the news, and the app that shows them.
# With a fixed salt (-S) openssl leaves out its "Salted__" + salt header, so it is added by hand: the page reads the salt from it.
B64=$({ printf 'Salted__'; printf '%s' "$SALT" | xxd -r -p;
  { echo "// challenge-reading-v1"; for f in content/weeks/week-*.js content/now.js content/news.js app.js; do cat "$f"; echo ";"; done; } |
  openssl enc -aes-256-cbc -pbkdf2 -iter "$ITERATIONS" -md sha256 -S "$SALT" -pass "file:$LOGIN"; } | base64 -w0)
grep -q 'id="siteData"' index.html || { echo "index.html has no #siteData line" >&2; exit 1; }
sed -i "s|^<script type=\"text/plain\" id=\"siteData\">.*</script>\$|<script type=\"text/plain\" id=\"siteData\">$B64</script>|" index.html
echo "Wrote encrypted site into index.html (${#B64} characters)"
