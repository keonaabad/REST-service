import mongoose from 'mongoose';
import 'dotenv/config';
import express from 'express'
import asyncHandler from 'express-async-handler'






//SCHEMA
const userSchema = new mongoose.Schema({
   name: {type: String, required: true},
   reps: {type: Number, required: true},
   weight: {type: Number, required: true},
   unit: {type: String, required: true},
   date: {type: String, required: true}
});


const lifting = mongoose.model("lifting", userSchema);




//Creating a Lift Function
const createLift = async (name, reps, weight, unit, date) => {
   const lift = new lifting({name: name, reps: reps, weight: weight, unit: unit, date: date});
   return lift.save();
}


//Retrieving all lifts
const retrieveLifts = async(filter) => {
   const query = lifting.find(filter
   );
   return query.exec();
}




//Find lift by id
const findLift = async(filter) => {
   const query = lifting.find(filter);
   return query.exec();
}






//Edit lift by id
const updateLift = async (filter, update) => {
   const result = await lifting.updateOne(filter, update);
   return result; 
}




//Delete lift by id
const deleteLift = async (filter) => {
   const result = await lifting.deleteMany(filter);
   return result.deletedCount;
}


export {createLift, retrieveLifts, findLift, updateLift, deleteLift};