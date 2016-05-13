import { Meteor } from 'meteor/meteor';
import { tasksCollection } from '../collections/collections.js';

Meteor.startup(() => {
  // Remove any database values that are present
  tasksCollection.remove({}); //Delete all records, only works server-side.
});