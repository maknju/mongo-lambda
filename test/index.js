var ML = require('../lib');
var Lab = require('lab');
var Code = require('code');


// Declare internals
var internals = {};
// Test shortcuts
var lab = exports.lab = Lab.script();
var before = lab.before;
var after = lab.after;
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('Mongo Lambda API', function () {

    var config = {
        batchLayer: {
            collection: "master",
            dataRetention: 24*60*60*1000
        },
        speedLayer: {
            collection: "delta"
        }
    };

    it('validates good configuration', function (done) {


        var lambda = new ML.Lambda(config, function(err) {
            expect(err).to.not.exist();
            done();
        });
    });

    it('can insert data', function (done) {

        var lambda = new ML.Lambda(config, function(err) {
            expect(err).to.not.exist();

            lambda.insertData({hit: "bingo"}, function(err, results) {
                expect(err).to.not.exist();
                done();
            });
        });
    });

    it('can insert report', function (done) {

        var lambda = new ML.Lambda(config, function(err) {
            expect(err).to.not.exist();

            var report = {
                name: "job2",
                agg: {},
                cron: "*/10 * * * * *",
                timezone: "US",
                combine: function(batches, onTheFly) {
                    
                }
            };

            lambda.insertReport(report, function(err, results) {
                expect(err).to.not.exist();
                done();
            });
        });
    });
});
