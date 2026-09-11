"""Static server for StudyMon.

Plain `python -m http.server` sends no cache headers, so browsers apply
heuristic caching and keep serving an old copy of the JS and CSS after the game
is updated. That looks exactly like "my change did nothing". This server tells
the browser to revalidate every time, and raises the connection backlog so a
screen that asks for hundreds of sprites at once (the Pokedex) never gets a
refused connection.

Usage:  python tools/serve.py [port]
"""
import os
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8777


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, fmt, *args):
        # Only complain about failures; a Pokedex page is 1000+ successful GETs.
        if args and str(args[1]).startswith(('4', '5')):
            super().log_message(fmt, *args)


class Server(ThreadingHTTPServer):
    daemon_threads = True
    request_queue_size = 128


if __name__ == '__main__':
    os.chdir(ROOT)
    print('StudyMon serving ' + ROOT)
    print('Open http://localhost:%d   (close this window to stop)' % PORT)
    try:
        Server(('127.0.0.1', PORT), partial(Handler, directory=ROOT)).serve_forever()
    except KeyboardInterrupt:
        print('\nstopped')
