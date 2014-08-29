/**
 * Created by ionut.airinei on 8/28/14.
 */

var Appointment = Backbone.Model.extend({urlRoot: '/appointment'});
var appointment = new Appointment();

var AppointmentView = Backbone.View.extend({
    el: $('#todoResults ul'), // attaches `this.el` to an existing element.
    render: function(){
        $(this.el).html('<li>'+ this.model.get('id') + ": " + this.model.get('title') + '</li>');
    }
});

appointment.set({title: 'Video meeting', id: 1});

var appointmentItem =  new Appointment({title: 'Second video meeting', id: 2});
console.log(appointmentItem.attributes);

var appointmentView = new AppointmentView({model: appointment});

appointmentView.render();

$('#todoResults').html(appointmentView.el);
