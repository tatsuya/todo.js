var Todo = require('../lib/todo');

describe('Todo', function() {
  describe('complete', function() {
    it('should change complate state to true', function() {
      var todo = new Todo('Go shopping');
      todo.completed.should.be.false;
      todo.complete();
      todo.completed.should.be.true;
    });
  });

  describe('undo', function() {
    it('should change complate state to false', function() {
      var todo = new Todo('Go shopping');
      todo.completed.should.be.false;
      todo.complete();
      todo.completed.should.be.true;
      todo.undo();
      todo.completed.should.be.false;
    });
  });

  describe('rename', function() {
    it('should change title to given string', function() {
      var todo = new Todo('Go shopping');
      todo.title.should.eql('Go shopping');
      todo.rename('Go surfing');
      todo.title.should.eql('Go surfing');
    });
  });
});