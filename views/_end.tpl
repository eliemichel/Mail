            
        </div>

        <script type="text/javascript">
            // Constants set on the server side
            var API_URL = '{{ API_URL }}api';
        </script>
        % if defined('scripts'):
        % for script in scripts:
        <script src="{{ get_url('static', filename='js/' + script + '.js') }}"></script>
        % end
        % end
    </body>
</html>
