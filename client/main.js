import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Session.set('TaskCollection', ' ');

Template.Table.events({
  'click tr': function(e){
        e.preventDefault();
        $('#addTask').modal('show');
    }
});

Template.addTask.events({
  'click #save': function(e) {
    e.preventDefault();
    
    var taskname = {
      name: $('#taskname').val()
    }
    
    var hashtags = {
      name: $('#hashtags').val()
    }

    Meteor.call('addNewTask', taskname, function(error, result) {
      if (error) {
        alert(error);
      }
    });

    $('#addTask').modal('hide');
  }
});

Meteor.methods({
  addNewTask: function(taskname) {
    check(taskname.name, String);

    _.extend(taskname, {"rank": 0});
    TaskCollection.insert(taskname);
  }
});




