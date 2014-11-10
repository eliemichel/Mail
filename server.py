#!/usr/bin/env python3
import requests
import imaplib
import email

from bottle import abort, Bottle, SimpleTemplate, static_file
from bottle import redirect, request, run

# =========
# Functions
# =========

def get_mails(server, login, passwd):
    M = imaplib.IMAP4(server)
    try:
        M.starttls()
        M.login(login, passwd)
        M.select()
        _, data = M.uid('search', None, 'ALL')
        mails = []
        for num in data[0].split():
            _, tmp = M.uid('fetch', num, '(RFC822)')
            msg = email.message_from_bytes(tmp[0][1])
            texts = []
            for part in msg.walk():
                if part.get_content_type() == 'text/plain':
                    try:
                        texts.append(part.get_payload(decode=True)
                                     .decode(part.get_content_charset(),
                                             errors='ignore'))
                    except UnicodeDecodeError:
                        pass
            mails.append({'headers': dict(msg.items()),
                          'texts': texts})
    finally:
        M.close()
        M.logout()
    return mails

# ===============
# Initializations
# ===============
app = Bottle()

# ===
# API
# ===
@app.route('/mails/<server>/<user>/<password:path>',
           name="mails")
def mails(server='', user='', password=''):
    """Get mails from user inbox"""
    return {'mails': get_mails(server, user, password)}



# ======
# Routes
# ======
@app.route("/static/<filename:path>",
           name="static")
def static(filename):
    """Routes static files"""
    return static_file(filename, root="static")


@app.route('/',
           name="index",
           template="index")
def index(user='', passwd=''):
    """Index view"""
    return {}


if __name__ == '__main__':
    # ===
    # App
    # ===
    SimpleTemplate.defaults["get_url"] = app.get_url
    run(app, host="0.0.0.0", port=8080, debug=True, reloader=True, server="cherrypy")
