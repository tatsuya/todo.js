var should = require('should');
var fs = require('fs');
var join = require('path').join;
var tmp = join(__dirname, 'tmp', 'storage.json');

var Storage = require('../lib/storage');

describe('Storage', function() {
  beforeEach(function() {
    if (fs.existsSync(tmp)) {
      fs.unlinkSync(tmp);
    }
  });

  describe('read', function() {
    it('should read and parse the database file', function() {
      var data = { foo: 'bar'};
      fs.writeFileSync(tmp, JSON.stringify(data), 'utf8');
      var storage = new Storage(tmp);
      storage.read().should.eql(data);
    });
  });

  describe('write', function() {
    it('should serialize and write data into a file', function() {
      var data = { foo: 'baz'};
      var storage = new Storage(tmp);
      storage.write(data);
      JSON.parse(fs.readFileSync(tmp, 'utf8')).should.eql(data);
    }); 
  });

  describe('clear', function() {
    it('should remove the database file', function() {
      var data = { foo: 'baz'};
      var storage = new Storage(tmp);
      storage.write(data);
      JSON.parse(fs.readFileSync(tmp, 'utf8')).should.eql(data);
      storage.clear();
      fs.existsSync(tmp).should.be.false;
    });

    it('should ignore when the database file is not created', function() {
      var storage = new Storage(tmp);
      storage.clear();
    });
  });
});
