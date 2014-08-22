var Todo = require('../lib/todo');

describe('Todo', function() {
  describe('complete', function() {
    it('should change complate state to true', function() {
      var todo = new Todo('Buy something');
      todo.completed.should.be.false;
      todo.complete();
      todo.completed.should.be.true;
    });
  });

  describe('undo', function() {
    it('should change complate state to false', function() {
      var todo = new Todo('Buy something');
      todo.completed.should.be.false;
      todo.complete();
      todo.completed.should.be.true;
      todo.undo();
      todo.completed.should.be.false;
    });
  });
});