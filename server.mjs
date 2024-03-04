import mongoose from 'mongoose';
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as liftCall from './controller.mjs';




mongoose.connect(
   process.env.MONGODB_CONNECT_STRING,
   {useNewUrlParser: true}
);


const db = mongoose.connection;


db.once("open", () => {
   console.log('Connected to MongoDB...');
});


const PORT = process.env.PORT
const app = express();



app.use(express.json());
app.use(express.static('public'));
app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}...`);
});




//Creating Lift
app.post('/exercises', asyncHandler(async (req, res) => {
   liftCall.createLift(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
   .then(lift => {
       res.status(201).json(lift);
   })
   .catch(error=> {
       console.error(error);
       res.status(400).json({Error: 'Request failed'});
   });
}));








app.get('/exercises', asyncHandler(async (req, res) => {
   let filter = {};
   if(req.query._id !== undefined){
       filter = {_id: req.query._id};
   }
   if(req.query.name !== undefined){
       filter = {name: req.query.name};
   }
   if(req.query.reps !== undefined){
       filter = {reps: req.query.reps};
   }
   if(req.query.weight !== undefined){
       filter = {weight: req.query.weight};
   }
   if(req.query.unit !== undefined){
       filter = {unit: req.query.unit};
   }
   if(req.query.date !== undefined){
       filter = {date: req.query.date};
   }
   if(req.query.date !== undefined && req.query.name !== undefined){
       filter = {date: req.query.date, name: req.query.name};
   }
   const result = await liftCall.retrieveLifts(filter);
   res.send(result);
}
));




app.get('/exercises/:id', asyncHandler(async (req, res) => {
   liftCall.findLift({_id: req.params.id})
   .then(lift => {
       res.status(200).json(lift);
   })
   .catch(error => {
       console.error(error);
       res.status(400).json({Error: 'Request failed'});
   });
}
));




app.put('/exercises/:id', asyncHandler(async (req, res) => {
   liftCall.updateLift({_id: req.params.id}, req.body)
   .then(lift => {
       res.status(200).json(lift);
   })
   .catch(error => {
       console.error(error);
       res.status(400).json({Error: 'Request failed'});
   });
}
));




app.delete('/exercises/:id', asyncHandler(async (req, res) => {
   liftCall.deleteLift({_id: req.params.id})
   .then(lift => {
       res.status(204).json(lift);
   })
   .catch(error => {
       console.error(error);
       res.status(400).json({Error: 'Request failed'});
   });
}
));




