#!/usr/bin/env python3
"""Run Impara: start the local server and open it in your browser.

    python3 serve.py              # serve on 8123 and open a browser tab
    python3 serve.py 9000         # pick a different port
    python3 serve.py --no-open    # server only, don't touch the browser

Stop it with Ctrl+C.
"""

import argparse
import os
import socket
import sys
import threading
import urllib.request
import webbrowser
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
DEFAULT_PORT = 8123
PORT_ATTEMPTS = 10          # 8123, 8124, … if the port is taken


class Handler(SimpleHTTPRequestHandler):
    # ES modules need correct MIME types, and nothing here should be cached
    # while you're editing it. (The service worker caches deliberately, which
    # is unaffected by this header.)
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        '.webmanifest': 'application/manifest+json',
        '.js': 'text/javascript',
        '.mjs': 'text/javascript',
    }

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        # A service worker may only control pages at or below its own path;
        # serving it from the root is what gives it the whole app.
        if self.path.endswith('/sw.js'):
            self.send_header('Service-Worker-Allowed', '/')
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write('%s\n' % (fmt % args))


def port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.3)
        return s.connect_ex(('127.0.0.1', port)) == 0


def impara_at(port):
    """True if what's on this port is Impara, not some unrelated dev server."""
    try:
        with urllib.request.urlopen(f'http://127.0.0.1:{port}/index.html', timeout=1) as r:
            return b'Impara' in r.read(2048)
    except Exception:
        return False


def start_server(port):
    """Bind the first free port at or after `port`. Returns (server, port)."""
    handler = partial(Handler, directory=ROOT)
    last_error = None
    for candidate in range(port, port + PORT_ATTEMPTS):
        try:
            return ThreadingHTTPServer(('127.0.0.1', candidate), handler), candidate
        except OSError as exc:
            last_error = exc
    raise SystemExit(
        f'Could not bind a port between {port} and {port + PORT_ATTEMPTS - 1}: {last_error}'
    )


def main():
    parser = argparse.ArgumentParser(description='Run the Impara Italian trainer.')
    parser.add_argument('port', nargs='?', type=int, default=DEFAULT_PORT,
                        help=f'port to serve on (default {DEFAULT_PORT})')
    parser.add_argument('--no-open', action='store_true',
                        help="don't open a browser window")
    args = parser.parse_args()

    # Already running from an earlier session? Just point the browser at it
    # rather than starting a second copy on another port.
    if port_in_use(args.port) and impara_at(args.port):
        url = f'http://localhost:{args.port}'
        print(f'Impara is already running at {url} — opening it.', flush=True)
        if not args.no_open:
            webbrowser.open(url)
        return

    os.chdir(ROOT)
    server, port = start_server(args.port)
    url = f'http://localhost:{port}'

    if port != args.port:
        print(f'\n  Port {args.port} was busy — using {port} instead.', flush=True)
    print(f'\n  Impara is running at {url}')
    print('  Press Ctrl+C to stop.\n', flush=True)

    if not args.no_open:
        # Give the socket a moment to start accepting before the tab loads.
        threading.Timer(0.4, webbrowser.open, args=(url,)).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n  Stopped. Your progress is saved in the browser.\n', flush=True)
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
