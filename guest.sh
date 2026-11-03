#!/bin/sh
# Makes a one-time guest login, then rebuilds index.html so the code works once it is pushed.
#
#   sh guest.sh [hours]
#
# The guest signs in with username "guest" and the code this prints. They must first sign in within [hours]
# (default 24); their visit then lasts 12 hours on that device, and the code can't be used again there.
# The code is saved in ~/.challenge-reading-guests (outside the repo); build.sh drops it once it has run out.
set -e
cd "$(dirname "$0")"
HOURS=${1:-24}
# Ten letters and digits, leaving out ones that are easy to mix up (0/o, 1/l/i).
CODE=$(openssl rand -base64 48 | tr -dc 'abcdefghjkmnpqrstuvwxyz23456789' | head -c 10)
SALT=$(openssl rand -hex 8)
USEBY=$(( $(date +%s) + HOURS * 3600 ))
printf '%s|%s|%s\n' "$CODE" "$USEBY" "$SALT" >> "$HOME/.challenge-reading-guests"
sh build.sh
echo "Guest login: username guest, code $CODE"
echo "It must be used by $(date -d "@$USEBY" '+%a %d %b %H:%M'), and lasts 12 hours from the first sign-in."
echo "Last moment it can still be open anywhere: $(date -d "@$((USEBY + 12 * 3600))" '+%a %d %b %H:%M')"
