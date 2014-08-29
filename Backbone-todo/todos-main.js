// RequireJS config
// ---------------

// Here we setup path aliases and dependencies
require.config({
    paths: {
        'jquery': 'libs/jquery',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'backbone.localStorage': 'libs/backbone.localStorage'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone.localStorage'
        }
    }
});

// Load todos-router.js as TodosRouter
require([
    'todos-router'
], function(TodosRouter) {

    // We kick things off by creating the **App**.
    window.app = new TodosRouter();
});
