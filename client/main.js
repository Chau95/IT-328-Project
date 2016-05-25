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
    
  'click #save': function() {
    var taskname = $('#taskname').val();
    var time = $('#time').val();
    var tags = $('#tags').val();
    
    var choice = document.getElementById("selectDay");
    var day = choice.options[choice.selectedIndex].value;
        
    tasksCollection.insert({
      "taskname": taskname,
      "time": time,
      "tags": tags,
      "day": day
    });

    $('#addTask').modal('hide');
    
  }
});

Template.TaskBar.events({
  'click #delete': function () {
    if (confirm("Wipe out everything for this week?")) {
        tasksCollection.find().forEach(function(tasks) {
          tasksCollection.remove({"_id": tasks._id});
        });
    }
  },
  
  'click #clear': function () {
     $('#clearTask').modal('show');
     $('#clearBtn').on('click', function(){
        var choice = document.getElementById("selectClearDay");
        var day = choice.options[choice.selectedIndex].value;
        tasksCollection.find().forEach(function(tasks) {
            tasksCollection.remove({"_id": tasks._id});
        });
        $('#clearTask').modal('hide');
     });
  }
});

Template.Monday.helpers({
  tasksList: function() {
    return tasksCollection.find({"day" : "Mon"});
    
    var message = "Add something";
    if (tasksCollection.find({"day" : "Mon"}).count() == 0) {
      return message;
    }
  }
});

Template.Tuesday.helpers({
  tasksList: function() {
    return tasksCollection.find({"day" : "Tue"});
  }
});
Template.Wednesday.helpers({
  tasksList: function() {
    return tasksCollection.find({"day" : "Wed"});
  }
});
Template.Thursday.helpers({
  tasksList: function() {
    return tasksCollection.find({"day" : "Thu"});
  }
});
Template.Friday.helpers({
  tasksList: function() {
    return tasksCollection.find({"day" : "Fri"});
  }
});
Template.Saturday.helpers({
  tasksList: function() {
    return tasksCollection.find({"day" : "Sat"});
  }
});
Template.Sunday.helpers({
  tasksList: function() {
    return tasksCollection.find({"day" : "Sun"});
  }
});



