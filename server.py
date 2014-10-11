#!/usr/bin/env python3
import requests
import imaplib
import email

from bottle import abort, Bottle, SimpleTemplate, static_file
from bottle import redirect, request, run
from bottlesession import PickleSession, authenticator

# =========
# Functions
# =========

def get_mails(login, passwd):
    M = imaplib.IMAP4('mail.exppad.com')
    M.starttls()
    M.login(login, passwd)
    M.select()
    typ, data = M.search(None, 'ALL')
    mails = []
    for num in data[0].split():
        typ, data = M.fetch(num, '(RFC822)')
        msg = email.message_from_bytes(data[0][1])
        mails.append(msg)
    M.close()
    M.logout()
    return mails

# ===============
# Initializations
# ===============
app = Bottle()
session_manager = PickleSession()
valid_user = authenticator(session_manager, login_url='/login')

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
@app.route('/mails/<user>/<passwd>',
           name="mails",
           template="index")
def index(user='', passwd=''):
    """Index view"""
    return {'mails': get_mails(user, passwd)}


@app.route('/login',
           name="login",
           template="login")
def login():
    """Index view"""
    return {'login': ''}


@app.route('/settings',
           name="settings",
           template="settings",
           apply=valid_user())
def settings():
    """Settings view"""
    return {}


if __name__ == '__main__':
    # ===
    # App
    # ===
    SimpleTemplate.defaults["get_url"] = app.get_url
    SimpleTemplate.defaults["API_URL"] = app.get_url("index")
    SimpleTemplate.defaults["valid_session"] = lambda: session_manager.get_session()['valid']
    run(app, host="0.0.0.0", port=8080, debug=True, reloader=True, server="cherrypy")
