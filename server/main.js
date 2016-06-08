import { Meteor } from 'meteor/meteor';
import { tasksCollection } from '../collections/collections.js';

Meteor.startup(() => {
  // Remove any database values that are present
  tasksCollection.remove({}); //Delete all records, only works server-side.
});

//Put this in severside main.js is more secure
Meteor.methods({
    taskInsert: function(task){
        tasksCollection.insert(task);
    },
    taskDeleteByDay: function(day){
      tasksCollection.find({"day": day}).forEach(function(tasks) {
          tasksCollection.remove({"_id": tasks._id});
      });
    },
    taskRemoveAll: function(){
        tasksCollection.remove({});
    },
    /*
    taskUpdate: function(updatedTask){
        tasksCollection.update({"_id": updatedTask._id}, {"set":{
            "taskname": updatedTask.taskname,
            "time": updatedTask.time,
            "tags": updatedTask.tags,
            "day": updatedTask.day
        }});
    },*/
    getTaskByDay: function(day){
      return tasksCollection.find({"day": day});
    }
});

//publish data that a client may or may not want
Meteor.publish('userData', function(){
    //is there a logged in user?
    if (this.userId)
    {
        return Meteor.users.find({'_id': this.userId});
    }
    else
    {
        this.ready();//done...    
    }
});

Meteor.publish('data', function(){
  return tasksCollection.find();
});