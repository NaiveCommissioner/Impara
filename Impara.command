#!/bin/bash
# Double-click this file in Finder to start Impara and open it in your browser.
# Closing the Terminal window (or Ctrl+C) stops the server.

cd "$(dirname "$0")" || exit 1
exec python3 serve.py "$@"
