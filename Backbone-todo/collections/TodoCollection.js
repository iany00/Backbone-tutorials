define([
    'backbone',
    '../libs/backbone.localStorage.js'
], function(Backbone) {

    // Todo Collection
    // ---------------

    // The collection of todos is backed by *localStorage* instead of a remote
    // server.
    return Backbone.Collection.extend({

        // Save all of the todo items under the `"todos-backbone"` namespace.
        // For most web apps we would instead use the `"url"` attribute to
        // set an api resource instead of HTML5 localStorage. For example:
        // url: '/api/v1/todos',
        localStorage: new Backbone.LocalStorage("todos-backbone"),

        // Filter down the list of all todo items that are finished.
        done: function() {
            return this.filter(function(todo){ return todo.get('done'); });
        },

        // Filter down the list to only todo items that are still not finished.
        remaining: function() {
            return this.without.apply(this, this.done());
        },

        // We keep the Todos in sequential order, despite being saved by unordered
        // GUID in the database. This generates the next order number for new items.
        nextOrder: function() {
            if (!this.length) return 1;
            return this.last().get('order') + 1;
        },

        // Todos are sorted by their original insertion order.
        comparator: function(todo) {
            return todo.get('order') || this.nextOrder();
        }

    });
});
