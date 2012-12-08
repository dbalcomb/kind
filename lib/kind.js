/* kind - a node.js type detection and comparison library
 * By Daniel Balcomb <daniel.balcomb@gmail.com>
 */

var kind = module.exports = function(item, type) {
	if (arguments.length == 2)
	return kind.is(item, type);
	return kind.of(item);
}

kind.is = function(item, type) {
	if (kind.ctor(type) === String)
	return kind.of(item) === type;
	return kind.ctor(item) === type;
}

kind.of = function(item) {
	return Object.prototype.toString
	.call(item)
	.match(/^\[object (.*)\]$/)[1];
}

kind.ctor = function(item) {
	if ((item === null) || (item === undefined))
	return item;
	return item.constructor;
}

kind.equal = function(a, b) {
	return kind.of(a) === kind.of(b);
}

/* Undocumented functions
 * Functional but a work in progress
 */

kind.each = function(arr, cb) {
	arr = Array.prototype.slice.call(arr, 0);
	arr.forEach(function(item) {
		if (cb) cb(item, kind.of(item));
	});
}

kind.find = function(arr, type) {
	var found;
	kind.each(arr, function(item) {
		if (!found && kind.is(item, type))
		found = item;
	});
	return found;
}
