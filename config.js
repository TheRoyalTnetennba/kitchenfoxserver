import bluebird from 'bluebird';
import mongoose from 'mongoose';

const production = true;

// const dbURL = production ? 'mongodb://<dbuser>:<dbpassword>@ds129143.mlab.com:29143/kitchenfox' : 

mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost:27017/kitchenFox');

export default mongoose;
