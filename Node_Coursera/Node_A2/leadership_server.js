var mongoose = require('mongoose'),
    assert = require('assert');

var Leadership = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new leader
    Leadership.create({
        name: 'Uthapizza',
        description: 'Test',


    }, function (err, leadership) {
        if (err) throw err;
        console.log('Leader created!');
        console.log(leadership);

        var id = leadership._id;

        // get all the dishes
        setTimeout(function () {
            Leadership.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Test'
                    }
                }, {
                    new: true
                })
                .exec(function (err, leadership) {
                    if (err) throw err;
                    console.log('Updated Leader!');
                    console.log(leadership);

                });
        }, 3000);
    });
});
