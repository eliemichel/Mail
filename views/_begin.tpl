<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Mail — {{ title }}</title>
        <link rel="stylesheet" href="{{ get_url('static', filename='css/normalize.css') }}">
        <link rel="stylesheet" href="{{ get_url('static', filename='css/style.css') }}">
    </head>

    <body>
        <div id="page">
            <header>
                <a href="{{ get_url('index') }}" class="header--logo">
                    <img src="{{ get_url('static', filename='img/logo.png') }}" alt="Mail"/>
                </a>

                <nav class="header--menu horizontal-menu">
                    <a {{ !'class="active"' if page=='home' else '' }} href="{{ get_url('index') }}">Home</a>
                    <a {{ !'class="active"' if page=='settings' else '' }} href="{{ get_url('settings') }}">Settings</a>
                </nav>
            </header>
