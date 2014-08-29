// The Application
// ---------------

// Our overall **Backbone.Router** is the top-level piece of UI.
define([
    'jquery',
    'backbone'
], function($, Backbone) {
    return Backbone.Router.extend({
        // Hashtag routes and their handlers
        routes: {
            'todos': 'todos',
            '': 'todos' // default route, called on Router init
        },
        todos: function() {
            this.setView({
                name: 'TodoListView'
            });
            return this;
        },
        // start Backbone Hashtag routing
        initialize: function(options) {
            Backbone.history.start();
            return this;
        },
        setView: function(options) {
            $.proxy(require(['views/'+options.name], function(View) {
                if (this.view)
                    this.view.remove();
                this.view = new View(options);
                $('#todoapp').append(this.view.render().$el);
            }), this);
            return this;
        }
    });
});
