//Import the Mongo object
import { Mongo } from "meteor/mongo";

//Export access to my colelctions
export const tasksCollection = new Mongo.Collection("tasks");

