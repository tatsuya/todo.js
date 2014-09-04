/**
 * Todo item.
 *
 * @constructor
 */

function Todo(title, completed) {
  this.title = title;
  this.completed = completed || false;
}

/**
 * Prototype
 */

Todo.prototype = {

  /**
   * Change the `completed` state to true.
   *
   * @api public
   */

  complete: function() {
    this.completed = true;
  },

  /**
   * Change the `completed` state to true.
   *
   * @api public
   */

  undo: function() {
    this.completed = false;
  },

  /** 
   * Rename title.
   *
   * @api public
   */
  
  rename: function(title) {
    this.title = title;
  }
}

/**
 * Export Todo.
 */

module.exports = Todo;