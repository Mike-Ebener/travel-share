const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/deep-trips', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// });



mongoose.connect(
<<<<<<< HEAD
  process.env.MONGODB_URI || 'mongodb://localhost/travel-share',
=======
  process.env.MONGODB_URI || 'mongodb://localhost/deep-trips',
>>>>>>> 9621825a1f16a7d4987d3b4f08bf1d67d07292f0
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

module.exports = mongoose.connection;