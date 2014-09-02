/**
 * Created by ionut.airinei on 9/1/14.
 */
(function ($)
{


    var contacts = [
        { name: "Contact 1", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "Family" },
        { name: "Contact 2", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "Family" },
        { name: "Contact 3", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "Friend" },
        { name: "Contact 4", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "Colleague" },
        { name: "Contact 5", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "Family" },
        { name: "Contact 6", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "Colleague" },
        { name: "Contact 7", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "Friend" },
        { name: "Contact 8", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "Family" }
    ];

    // Model with defaults
    // A model represents the data of an application;
    var Contact = Backbone.Model.extend({
        defaults: {
            photo: "img/placeholder.png"
        }
    });


    // A collection is a class for managing groups of models.
    var Directory = Backbone.Collection.extend({
        model: Contact
    });


    // Views are responsible for displaying the data of the application in an HTML page.
    //  Using underscore template for a contact item
    var ContactView = Backbone.View.extend({
        tagName  : "article",
        className: "contact-container",
        template : $("#contactTemplate").html(),

        render: function ()
        {
            var tmpl = _.template(this.template);

            // we use $el to set the HTML content;
            // this is a cached jQuery object representing the current element
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });


    // Master View
    var DirectoryView = Backbone.View.extend({
        el: $("#contacts"),

        initialize: function ()
        {
            this.collection = new Directory(contacts);
            this.render();

            this.$el.find("#filter").append(this.createSelect());

            this.on("change:filterType", this.filterByType, this);

            // we're listening for the reset event and the function
            // we wish to invoke is the collection's render() method.
            // We also specify that the callback should use this
            /* If we don't supply this as the third argument, we will not be able to access the collection inside the render() method when it handles the reset event.*/
            this.collection.on("reset", this.render, this);
        },

        render       : function ()
        {
            this.$el.find("article").remove(); // refresh articles
            var that = this;
            _.each(this.collection.models, function (item)
            {
                that.renderContact(item);
            }, this);
        },

        // Each html action should be an event
        events: {
            "change #filter select": "setFilter", // [event] [element element]: [function]
            "click #add"           : "addContact",
            "click #showForm"      : "showForm"
        },

        // View functions goes here
        renderContact: function (item)
        {
            var contactView = new ContactView({
                model: item
            });
            this.$el.append(contactView.render().el);
        },

        getTypes: function ()
        {
            return _.uniq(this.collection.pluck("type"));
        },

        // Select
        createSelect: function ()
        {
            var select = $("<select/>", {
                html: "<option value='all'>All</option>"
            });

            _.each(this.getTypes(), function (item)
            {
                var option = $("<option>", {
                    value: item,
                    text : item
                }).appendTo(select);
            });
            return select;
        },

        // Filter
        setFilter   : function (e)
        {
            this.filterType = e.currentTarget.value;
            this.trigger("change:filterType");
        },

        //Filter the view
        filterByType: function ()
        {
            if (this.filterType === "all")
            {
                this.collection.reset(contacts);

                contactsRouter.navigate("filter/all");
            }
            else
            {
                // we call the reset so that we have the object with all the original data for the filtering
                this.collection.reset(contacts, { silent: true });

                var filterType = this.filterType,
                    filtered = _.filter(this.collection.models, function (item)
                    {
                        return item.get("type") === filterType;
                    });

                this.collection.reset(filtered);

                contactsRouter.navigate("filter/" + filterType);
            }
        },

        addContact: function (e)
        {

        },

        showForm: function ()
        {
            this.$el.find('#addContact').slideToggle();
        }
    });

    // Router
    var ContactsRouter = Backbone.Router.extend({
        routes: {
            "filter/:type": "urlFilter"
        },

        urlFilter: function (type)
        {
            directory.filterType = type;
            directory.trigger("change:filterType");
        }
    });

    // Initialize
    var directory      = new DirectoryView();

    var contactsRouter = new ContactsRouter();

    Backbone.history.start();

}(jQuery));