import { Meteor } from 'meteor/meteor';
import { tasksCollection } from '../collections/collections.js';

Meteor.startup(() => {
  // Remove any database values that are present
  tasksCollection.remove({}); //Delete all records, only works server-side.
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