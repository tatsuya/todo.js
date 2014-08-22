var should = require('should');
var fs = require('fs');
var join = require('path').join;
var tmp = join(__dirname, 'tmp', 'storage.json');

var Storage = require('../lib/storage');
var Todos = require('../lib/todos');

describe('Todos', function() {
  beforeEach(function() {
    if (fs.existsSync(tmp)) {
      fs.unlinkSync(tmp);
    }
  });

  describe('add', function() {
    it('should add a new todo item', function() {
      var storage = new Storage(tmp);
      var todos = new Todos(storage);
      todos.list().should.have.length(0);
      todos.add('foo');
      todos.add('bar');
      todos.list().should.have.length(2);
    });
  });

  describe('complete', function() {
    it('should complete a todo itme', function() {
      var storage = new Storage(tmp);
      var todos = new Todos(storage);
      todos.list().should.have.length(0);
      todos.add('foo');
      todos.list()[0].completed.should.be.false;
      todos.complete(1);
      todos.list()[0].completed.should.be.true;
    });

    it('should throw error when it cannot find the given todo item', function() {
      var storage = new Storage(tmp);
      var todos = new Todos(storage);
      todos.list().should.have.length(0);
      (function() { todos.complete(1); }).should.throw('Cannot find a todo item with id "1"');
    });
  });

  describe('undo', function() {
    it('should undo a todo itme', function() {
      var storage = new Storage(tmp);
      var todos = new Todos(storage);
      todos.list().should.have.length(0);
      todos.add('foo');
      todos.list()[0].completed.should.be.false;
      todos.complete(1);
      todos.list()[0].completed.should.be.true;
      todos.undo(1);
      todos.list()[0].completed.should.be.false;
    });

    it('should throw error when it cannot find the given todo item', function() {
      var storage = new Storage(tmp);
      var todos = new Todos(storage);
      todos.list().should.have.length(0);
      (function() { todos.undo(1); }).should.throw('Cannot find a todo item with id "1"');
    });
  });

  describe('remove', function() {
    it('should remove a new todo item', function() {
      var storage = new Storage(tmp);
      var todos = new Todos(storage);
      todos.list().should.have.length(0);
      todos.add('foo');
      todos.list().should.have.length(1);
      todos.remove(1);
      todos.list().should.have.length(0);
    });

    it('should throw error when it cannot find the given todo item', function() {
      var storage = new Storage(tmp);
      var todos = new Todos(storage);
      todos.list().should.have.length(0);
      (function() { todos.remove(1); }).should.throw('Cannot find a todo item with id "1"');
    });
  });
});