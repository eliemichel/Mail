<!DOCTYPE html>
<html ng-app="mail">
    <head>
        <meta charset="utf-8">
        <title>Mail</title>
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
                    <a class="active" href="{{ get_url('index') }}">Home</a>
                </nav>
            </header>

            <main ng-view></main>

        </div>

        <script src="{{ get_url('static', filename='js/angular.min.js') }}"></script>
        <script src="{{ get_url('static', filename='js/angular-route.min.js') }}"></script>
        <script src="{{ get_url('static', filename='js/mailControllers.js') }}"></script>
        <script src="{{ get_url('static', filename='js/mail.js') }}"></script>
    </body>
</html>
