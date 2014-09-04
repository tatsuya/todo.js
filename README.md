todo.js
=======

[![Build Status](https://travis-ci.org/tatsuyaoiw/todo.js.svg?branch=master)](https://travis-ci.org/tatsuyaoiw/todo.js)

A dead-simple todo cli app.

## Usage

```
  todo: A dead-simple todo cli app

  Usage:

    todo help                  Print help
    todo add Go shopping       Create a new todo item
    todo ls                    Print all pending todo items
    todo check 1               Mark #1 as completed
    todo undo 1                Revert #1 to pending
    todo rename 1 Go surfing   Rename the title of #1
    todo rm 1                  Remove #1 item
    todo clear                 Destroy all todo items
```

## Development

### Running test

```
$ make test
```