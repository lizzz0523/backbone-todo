define([
    'rivets',
    'jquery',
    'underscore',
    'backbone',
], function (rivets, $, _, B) {

    var TodoList = B.View.extend({
        render: function () {
            var self = this,
                elem = self.el,
                todos = self.collection;

            self.binding = rivets.bind(elem, {
                data: {
                    todos: todos
                },

                add: function(event, data) {
                    event.preventDefault();
                    self._add(data);
                },

                edit: function(event, data) {
                    event.preventDefault();
                    self._toggle(data, true);
                },

                close: function(event, data) {
                    var code;

                    if (event.type === 'keyup') {
                        code = event.keyCode;

                        if (code !== 13) {
                            return;
                        }
                    }

                    event.preventDefault();
                    self._toggle(data, false);
                }
            });

            return self;
        },

        remove: function() {
            var self = this,
                binding = self.binding;

            if (binding) {
                binding.unbind();
            }

            return self;
        },

        _add: function() {
            var self = this,
                todos = self.collection;

            todos.create({
                description: '新任务',
                editing: true
            });
        },

        _toggle: function(data, editing) {
            var todo = data.todo;
            todo.set('editing', editing);
        }
    });

    return TodoList;

});
