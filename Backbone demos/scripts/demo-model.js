/**
 * Created by ionut.airinei on 8/26/14.
 *
 * Models are the heart of any JavaScript application, containing the interactive data as well
 * as a large part of the logic surrounding it: conversions, validations, computed properties, and access control.
 */
var Person = Backbone.Model.extend({
    defaults: {
        name    : 'John Doe',
        age     : 0,
        child   : '',
        childAge: 0
    },

    // If you return a string from the validate function,
    // Backbone will throw an error
    validate: function (attributes)
    {
        if (attributes.age < 0 && attributes.name != "Dr Manhatten")
        {
            return "You can't be negative years old";
        }
    },

    initialize: function ()
    {
        $('#modelResults').append("<p>Welcome to this world</p>");

        //we can bind the change listener to individual attributes or if we like simply to listen for changes to all attributes of the model.
        this.on('chnage:name', function (model)
        {
            var name = model.get("name");
            $('#modelResults').append('<p>Name changed to ' + name +'</p>');
        });

        /*the "error" event is for failures at the server, like when calling save(), whereas "invalid" is for validation errors on the client side*/
        this.bind("error", function (model, error)
        {
            // We have received an error, log it, alert it or forget it :)
            alert(error);
        });

        this.on("invalid", function (model, error)
        {
            alert(error);
        })

    },

    // Models can contain as many custom methods as you like to manipulate attributes. By default all methods are public.
    adopt     : function (newChildsName, newChildAge)
    {
        this.set({ child: newChildsName, childAge: newChildAge});
    }
});

// Setting attributes
var person = new Person({ name: "Iany", age: 27});

// or we can set afterwards, these operations are equivelent
person.set({ child: "Thomas", childAge: 12}, {'validate': true});
$('#modelResults').append('<p>Child Tomas has been added</p>');

// Get Attributes
var name = person.get("name"); // "Iany"
var age = person.get("age"); // 27
var child = person.get("child"); // 'Thomas'
var childAge = person.get("childAge"); // '12'

// Manipulating model attributes
person.adopt('johnny', 13);// this will overwrite Thomas
var child = person.get("child"); // 'Thomas'
var childAge = person.get("childAge"); // '12'
$('#modelResults').append('<p>Child Johnny is adopted</p>');

$('#modelResults').append('<p>name: ' + name +' age: ' + age + ' child: ' + child + ' childAge: ' + childAge +'</p>');




    /***
     *
     * CRUD UserMode Example
     * The following is only to make examples, now they are not made to work in the browser
     * **/


    var UserModel = Backbone.Model.extend({
        defaults: {
            name : '',
            email: ''
        }
    });


    /*** To Create/Update user */
    var user = new UserModel();
    // If the id attribute of the model is null, Backbone.js will send a POST request to the urlRoot of the server.
    var userDetails = {
        name : 'Iany',
        email: 'ionut.n.airinei@gmail.com'
    };

    user.save(userDetails, {
        success: function (user)
        {
            $('#modelResults').append(user.toJSON());
        }
    });

    /** Getting a model */
    // Here we have set the `id` of the model
    /*
        var user = new UserModel({id: 1});
    */

    // The fetch below will perform GET /user/1
    // The server should return the id, name and email from the database
    user.fetch({
        success: function (user)
        {
            $('#modelResults').append(user.toJSON());
        }
    })

    /** Deleting a model */
    /*

    var user = new UserModel({
        id   : 1,
        name : 'Iany',
        email: 'ionut.n.airinei@gmail.com'
    });

    */

    user.destroy({
        success: function ()
        {
            $('#modelResults').append('User Iany has been destroyed');
        }
    });

    /* This simply returns a copy of the current attributes. */
    var attributes = person.toJSON();
    $('#modelResults').append(attributes); // { name: "Thomas", age: 67}

    /* The line gives a direct reference to the attributes and you should be careful when playing with it.
     Best practise would suggest that you use .set() to edit attributes of a model to take advantage of backbone listeners. */
    var attributes = person.attributes;

