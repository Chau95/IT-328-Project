import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import { ReactiveVar } from 'meteor/reactive-var';
import { tasksCollection } from '../collections/collections.js';

import './main.html';

//pull down some published data from the server
Meteor.subscribe('userData');
userData = new Mongo.Collection('userData');

Accounts.ui.config({
  passwordSignupFields: "EMAIL_ONLY"
});

Accounts.config({
   loginExpirationInDays: null
});

Template.content.helpers({
  "isLoggedIn": function(){
    return Meteor.user() != null;
  }
});

Template.addTask.events({
    
    'click td': function(e){
        e.preventDefault();
        $('#addTask').modal('show');
    },
    
  'click #save': function(e) {
    e.preventDefault();

    var newTask = {
      "taskName" : $('#taskName').val(),
      "time" : $('#time').val(),
      "tags" : $('#tags').val(),
      "day" : $('#selectDay').val()
    };
    
    Meteor.call('taskInsert', newTask);

    $('#addTask').modal('hide');
    
  }
});

Template.TaskBar.events({
  'click #removeAll': function (e) {
    e.preventDefault();
    if (confirm("Wipe out everything for this week?")) {
        Meteor.call('taskRemoveAll');
    }
  },
  
  'click #delete': function (e) {
     e.preventDefault();
     $('#clearTask').modal('show');
     $('#clearBtn').on('click', function(){
        /*var choice = document.getElementById("selectClearDay");
        var day = choice.options[choice.selectedIndex].value;
        tasksCollection.find().forEach(function(tasks) {
            tasksCollection.remove({"_id": tasks._id});
        });*/
        Meteor.call('taskDeleteByDay', $('#selectClearDay').val());
        $('#clearTask').modal('hide');
     });
  }
});

Template.Monday.helpers({
  tasksList: function() {
    /*return tasksCollection.find({"day" : "Mon"});
    
    var message = "Add something";
    if (tasksCollection.find({"day" : "Mon"}).count() == 0) {
      return message;
    }*/
    Meteor.call('getTaskByDay', "Mon");
  }
});

Template.Tuesday.helpers({
  tasksList: function() {
    /*return tasksCollection.find({"day" : "Tue"});*/
    Meteor.call('getTaskByDay', "Tue");
  }
});
Template.Wednesday.helpers({
  tasksList: function() {
    /*return tasksCollection.find({"day" : "Wed"});*/
    Meteor.call('getTaskByDay', "Wed");
  }
});
Template.Thursday.helpers({
  tasksList: function() {
    /*return tasksCollection.find({"day" : "Thu"});*/
    Meteor.call('getTaskByDay', "Thu");
  }
});
Template.Friday.helpers({
  tasksList: function() {
    /*return tasksCollection.find({"day" : "Fri"});*/
    Meteor.call('getTaskByDay', "Fri");
  }
});
Template.Saturday.helpers({
  tasksList: function() {
    /*return tasksCollection.find({"day" : "Sat"});*/
    Meteor.call('getTaskByDay', "Sat");
  }
});
Template.Sunday.helpers({
  tasksList: function() {
    /*return tasksCollection.find({"day" : "Sun"});*/
    Meteor.call('getTaskByDay', "Sun");
  }
});



