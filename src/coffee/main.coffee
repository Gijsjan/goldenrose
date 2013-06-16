require.config 
    paths:
        'jquery': '../lib/jquery/jquery'
        'underscore': '../lib/underscore-amd/underscore'
        'backbone': '../lib/backbone-amd/backbone'
        'domready': '../lib/requirejs-domready/domReady'
        'text': '../lib/requirejs-text/text'
        'ace': '../lib/ace/lib/ace'
        'html': '../html'

    shim:
        'underscore':
            exports: '_'
        'backbone':
            deps: ['underscore', 'jquery']
            exports: 'Backbone'

require ['domready', 'app'], (domready, app) ->
    domready ->
        app.initialize()