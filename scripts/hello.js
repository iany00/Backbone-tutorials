/**
 * Created by ionut.airinei on 8/7/14.
 */
// **This example illustrates the declaration and instantiation of a minimalist View.**
//


// Self-executing wrapper
(function ($) {

    /*
     Backbone.sync: Overrides persistence storage with dummy function. This enables use of Model.destroy() without raising an error.
     */
    Backbone.sync = function(method, model, success, error){
        success();
    }

    //model
    var Item = Backbone.Model.extend({
                                         defaults: {
                                             part1: 'Ionut',
                                             part2:  ' - ',
                                             part3: 'Airinei',
                                             part4: ''
                                         }
                                     });

    //collection of models
    var List = Backbone.Collection.extend({
                                              model: Item
                                          });


    // This view is  Responsible for rendering each individual Item
    var ItemView = Backbone.View.extend({
                                            tagName: 'li', // name of (orphan) root tag in this.el // name of tag to be created

                                            events: {
                                                'click span.swap':  'swap',
                                                'click span.delete': 'remove'
                                            },


                                            initialize: function(){
                                                _.bindAll(this, 'render',  'unrender', 'swap', 'remove'); // every function that uses 'this' as the current object should be in here

                                                //now binds model change/removal to the corresponding handlers below.
                                                this.model.bind('change', this.render);
                                                this.model.bind('remove', this.unrender);
                                            },


                                            render: function(){
                                                var htmlString = '<span>' + this.model.get('part1') + this.model.get('part2') + this.model.get('part3') + ' ' + this.model.get('part4') + '</span>';
                                                htmlString += ' &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[Swap Name]</span>';
                                                htmlString += ' &nbsp; <span class="delete" style="font-family:sans-serif; color:blue; cursor:pointer;">[Delete Name]</span>';

                                                $(this.el).html(htmlString);
                                                return this; // for chainable calls, like .render().el
                                            },


                                            unrender: function(){
                                                $(this.el).remove();
                                            },


                                            /*
                                             swap() will interchange an Item's attributes.
                                             When the .set() model function is called, the event change will be triggered.
                                             */
                                            swap: function(){
                                                var swapped = {
                                                    part1: this.model.get('part3'),
                                                    part3: this.model.get('part1')
                                                };
                                                this.model.set(swapped);
                                            },


                                            /*
                                             remove(): We use the method destroy() to remove a model from its collection.
                                             Normally this would also delete the record from its persistent storage, but we have overridden that (see above).
                                             */
                                            remove: function(){
                                                this.model.destroy();
                                            }

                                        });

    // **ListView class**: Our main app view.
    var ListView =
        Backbone.View.extend({

                                 el: $('body'), // attaches `this.el` to an existing element.


                                 events    : {
                                     'click button#addHello': 'addHello',
                                     'click button#addItem': 'addItem'
                                 },

                                 // `initialize()`: Automatically called upon instantiation.
                                 // Where you make all types of bindings, _excluding_ UI events, such as clicks, etc.
                                 initialize: function () {
                                     _.bindAll(this, 'render', 'addItem', 'appendItem'); // fixes loss of context for 'this' within methods

                                     this.collection = new List();
                                     this.collection.bind('add', this.appendItem); // collection event binder

                                     this.counterHello = 0; // total number of items added thus far
                                     this.counterItem = 0; // total number of items added thus far

                                     this.render(); // not all views are self-rendering. This one is.
                                 },

                                 // `render()`: Function in charge of rendering the entire view in `this.el`. Needs to be manually called by the user.
                                 render    : function () {

                                     var self = this;
                                     $(this.el).append("<p>Hello Iany</p>");
                                     $(this.el).append("<button id='addHello'>Add Hello World</button>");
                                     $(this.el).append("<button id='addItem'>Add list item</button>");
                                     $(this.el).append("<ul id='helloWorld'></ul>");
                                     $(this.el).append("<ul id='itemList'></ul>");
                                     _(this.collection.models).each(function (item) { // in case collection is not empty
                                         self.appendItem(item);
                                     }, this);
                                 },


                                 addHello: function () {
                                     this.counterHello++;
                                     $('ul#helloWorld').append("<li>Hello Iany " + this.counterHello + "</li>");
                                 },


                                 addItem: function () {
                                     this.counterItem++;
                                     var item = new Item();
                                     item.set({
                                                  part4: this.counterItem
                                              });
                                     this.collection.add(item); // add item to collection; view is updated via event 'add'
                                 },


                                 appendItem: function (item) {
                                    /*
                                        $('ul#itemList', this.el).append("<li>" + item.get('part1') + " " + item.get('part2') + "</li>");
                                    */

                                     /*
                                        appendItem() is no longer responsible for rendering an individual Item. This is now delegated to the render() method of each ItemView instance.
                                     */
                                     var itemView = new ItemView({
                                                                     model: item
                                                                 });
                                     $('ul#itemList', this.el).append(itemView.render().el);
                                 }

                             });

    // **listView instance**: Instantiate main app view.
    var listView = new ListView();
})(jQuery);