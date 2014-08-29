/**
 * Created by ionut.airinei on 8/27/14.
 *
 * Backbone views are used to reflect what your applications' data models look like.
 * They are also used to listen to events and react accordingly.
 * This tutorial will not be addressing how to bind models and collections to views but will
 * focus on view functionality and how to use views with a
 * JavaScript templating library, specifically Underscore.js's _.template.
 */

    var SearchView = Backbone.View.extend({
        // The initialize function is always called when instantiating a Backbone View.
        // Consider it the constructor of the class.
        initialize: function ()
        {
            this.render();
        },


        render: function ()
        {
            // Compile the template using underscore
            var template = _.template($("#search_template").html(), {});

            // Load the compiled HTML into the Backbone "el"
            this.el.html(template);
        },

        events:
        {
            "click input[type=button]": "doSearch"
        },

        doSearch: function()
        {
            // Button clicked, you can access the element that was clicked with event.currentTarget
            var isValid = this.validate($("#search_input").val());

            if(isValid) {
                $('#errors').empty();
                $('#search_result').empty().append('Searching for: '+ $("#search_input").val());
            }
        },

        validate: function (searchValue)
        {
            if (searchValue == '')
            {
                $('#errors').empty().append("Search value is empty!");
                return false;
            }
            return true;
        }


    });


    /*The "el" property references the DOM object created in the browser.
     Every Backbone.js view has an "el" property, and if it not defined, Backbone.js will construct its own, which is an empty div element.
     Let us set our view's "el" property to div#search_container, effectively making Backbone.View the owner of the DOM element.*/

    var search_view = new SearchView({ el: $("#search_container") });


