/**
 * Module dependencies.
 */

var fs = require('fs');

/**
 * Storage.
 *
 * Serialize and read from JSON files.
 * 
 * @param {String} database path
 * @constructor
 */

function Storage(path) {
  this.path = path;
}

/**
 * Read the database and JSON.parse it.
 *
 * @returns {Mixed}
 * @api public
 */

Storage.prototype.read = function() {
  var data = [];

  try {
    var json = fs.readFileSync(this.path, 'utf8');
    data = JSON.parse(json);
  } catch(e) {}

  return data;
}

/**
 * Stringify data and store it into a file.
 * 
 * @param {Mixed} data
 * @api public
 */

Storage.prototype.write = function(data) {
  var json = JSON.stringify(data);
  fs.writeFileSync(this.path, json, 'utf8');
}

/**
 * Clear the database.
 *
 * @api public
 */

Storage.prototype.clear = function() {
  if (fs.existsSync(this.path)) {
    fs.unlinkSync(this.path);
  }
}

/**
 * Export Storage.
 */

module.exports = Storage;
