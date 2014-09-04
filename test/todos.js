var should = require('should');
var join = require('path').join;
var tmp = join(__dirname, 'tmp', 'storage.json');

var Storage = require('../lib/storage');
var Todos = require('../lib/todos');

describe('Todos', function() {
  var storage;
  var todos;

  beforeEach(function() {
    storage = new Storage(tmp);
    storage.clear();
    todos = new Todos(storage);
  });

  describe('add', function() {
    it('should add a new todo item', function() {
      todos.list().should.have.length(0);
      todos.add('foo');
      todos.add('bar');
      todos.list().should.have.length(2);
    });
  });

  describe('complete', function() {
    it('should complete a todo itme', function() {
      todos.list().should.have.length(0);
      todos.add('foo');
      todos.list()[0].completed.should.be.false;
      todos.complete(1);
      todos.list()[0].completed.should.be.true;
    });

    it('should throw error when it cannot find the given todo item', function() {
      todos.list().should.have.length(0);
      (function() { todos.complete(1); }).should.throw('Cannot find a todo item with id "1"');
    });
  });

  describe('undo', function() {
    it('should undo a todo item', function() {
      todos.list().should.have.length(0);
      todos.add('foo');
      todos.list()[0].completed.should.be.false;
      todos.complete(1);
      todos.list()[0].completed.should.be.true;
      todos.undo(1);
      todos.list()[0].completed.should.be.false;
    });

    it('should throw error when it cannot find the given todo item', function() {
      todos.list().should.have.length(0);
      (function() { todos.undo(1); }).should.throw('Cannot find a todo item with id "1"');
    });
  });

  describe('rename', function() {
    it('should rename a todo item', function() {
      todos.list().should.have.length(0);
      todos.add('foo');
      todos.list()[0].title.should.eql('foo');
      todos.rename(1, 'bar');
      todos.list()[0].title.should.eql('bar');
    });

    it('should throw error when it cannot find the given todo item', function() {
      todos.list().should.have.length(0);
      (function() { todos.rename(1, 'bar'); }).should.throw('Cannot find a todo item with id "1"');
    });
  });

  describe('remove', function() {
    it('should remove a new todo item', function() {
      todos.list().should.have.length(0);
      todos.add('foo');
      todos.list().should.have.length(1);
      todos.remove(1);
      todos.list().should.have.length(0);
    });

    it('should throw error when it cannot find the given todo item', function() {
      todos.list().should.have.length(0);
      (function() { todos.remove(1); }).should.throw('Cannot find a todo item with id "1"');
    });
  });

  describe('clear', function() {
    it('should make todo list empty', function() {
      todos.list().should.have.length(0);
      todos.add('foo');
      todos.add('bar');
      todos.list().should.have.length(2);
      todos.clear();
      todos.list().should.have.length(0);
    });
  });
});