/**
 * Module dependencies.
 */

var Todo = require('./todo');

/**
 * Todos collection.
 * 
 * @param {Storage} storage
 * @constructor
 */

function Todos(storage) {
  this.storage = storage;
}

/**
 * Prototype.
 */

Todos.prototype = {

  /**
   * Returns all todo items.
   *
   * @returns {Array}
   * @api public
   */

  list: function() {
    return this.items;
  },

  /**
   * Add a todo item with given title.
   *
   * @param {String} title
   * @api public
   */

  add: function(title) {
    var todo = new Todo(title);
    this.items.push(todo);
    this.save();
  },

  /**
   * Complete a todo item with `id`.
   *
   * @param {Number} id
   * @api public
   */

  complete: function(id) {
    var todo = this.find(id);
    todo.complete();
    this.save();
  },

  /**
   * Undo a todo item with `id`.
   *
   * @param {Number} id
   * @api public
   */

  undo: function(id) {
    var todo = this.find(id);
    todo.undo();
    this.save();
  },

  /**
   * Rename a todo itme.
   * 
   * @param  {Number} id
   * @param  {String} title
   * @api public
   */

  rename: function(id, title) {
    var todo = this.find(id);
    todo.rename(title);
    this.save();
  },

  /**
   * Destroy a todo item with `id`.
   *
   * @param {Number} id
   * @api public
   */

  remove: function(id) {
    var todo = this.find(id);
    this.items.splice(this.items.indexOf(todo), 1);
    this.save();
  },

  /**
   * Clear all todo items.
   *
   * @api public
   */

  clear: function() {
    this.items = [];
    this.save();
  },

  /**
   * Find a todo item by `id`.
   *
   * @param {Number} id
   * @returns {Todo} todo item
   * @api private
   */

  find: function(id) {
    var item = this.items[id-1];
    if (!item) {
      throw new Error('Cannot find a todo item with id "' + id + '"');
    }
    return item;
  },

  /**
   * Persist the todo items.
   *
   * @api private
   */

  save: function() {
    this.storage.write(this.items);
  },

  /**
   * Lazy load the todo items and return them.
   *
   * @returns {Array}
   * @api private
   */

  get items() {
    if (!this._items) {
      this._items = this.storage.read().map(function(todo) {
        return new Todo(todo.title, todo.completed);
      });
    }
    return this._items;
  },

  /**
   * Set the todo items.
   *
   * @param {Array} items
   * @api private
   */

  set items(items) {
    this._items = items;
  }
}

/**
 * Export Todos.
 */

module.exports = Todos;