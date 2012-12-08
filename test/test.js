var assert = require('assert'),
	  kind = require('..');

var types = {
	'String'	: String,
	'Object'	: Object,
	'Array'		: Array,
	'Number'	: Number,
	'Boolean'	: Boolean,
	'Function'	: Function,
	'Error'		: Error,
	'Date'		: Date,
	'RegExp'	: RegExp,
	'Null'		: null,
	'Undefined'	: undefined
};

var expects = [
	['String',		'',				'""'],
	['String',		'string',		'"string"'],
	['String',		new String(),	'new String()'],
	
	['Object',		{},				'{}'],
	['Object',		{ o: true },	'{ o: true }'],
	['Object',		new Object(),	'new Object()'],
	
	['Array',		[],				'[]'],
	['Array',		[1, 2, 3],		'[1, 2, 3]'],
	['Array',		new Array(),	'new Array()'],
	
	['Number',		0,				'0'],
	['Number',		10000,			'10000'],
	['Number',		0.05,			'0.05'],
	['Number',		-20,			'-20'],
	
	['Boolean',		true,			'true'],
	['Boolean',		false,			'false'],
	
	['Function',	function(){},	'function(){}'],
	['Function',	kind,			'kind'],
	['Function',	new Function(),	'new Function()'],
	
	['Error',		new Error(),	'new Error()'],
	
	['Date',		new Date(),		'new Date()'],
	
	['RegExp',		/^\[a (.*)\]$/,	'/^\\[a (.*)\\]$/'],
	['RegExp',		new RegExp(),	'new RegExp()'],
	
	['Null',		null,			'null'],
	['Undefined',	undefined,		'undefined'],
	
	['Arguments',	arguments,		'arguments']
];
	  
describe('kind.of', function() {
	expects.forEach(function(t) {
		it(t[2]+' -> "'+t[0]+'"', function() {
			var k = kind.of(t[1]);
			assert.equal(k, t[0]);
		});
	});
});

describe('kind.ctor', function() {
	expects.forEach(function(t) {
		if (types[t[0]]) {
			var tx = t[0];
			if (t[0] === 'Null') tx = 'null';
			if (t[0] === 'Undefined') tx = 'undefined';
			it(t[2]+' -> '+tx, function() {
				var k = kind.ctor(t[1]);
				assert.equal(k, types[t[0]]);
			});
		}
	});
});

describe('kind.is - using kind.of', function() {
	expects.forEach(function(t) {
		it(t[2]+', '+t[0]+' -> true', function() {
			var k = kind.is(t[1], t[0]);
			assert.equal(k, true);
		});
	});
});

describe('kind.is - using kind.ctor', function() {
	expects.forEach(function(t) {
		if (types[t[0]]) {
			var tx = t[0];
			if (t[0] === 'Null') tx = 'null';
			if (t[0] === 'Undefined') tx = 'undefined';
			it(t[2]+', '+tx+' -> true', function() {
				var k = kind.is(t[1], types[t[0]]);
				assert.equal(k, true);
			});
		}
	});
});

describe('kind.equal', function() {
	var p;
	expects.forEach(function(t) {
		if (p) {
			var k = kind.equal(t[1], p[1]);
			if (t[0] === p[0]) {
				it(t[2]+', '+p[2]+' -> true', function() {
					assert(k);
				});
			} else {
				it(t[2]+', '+p[2]+' -> false', function() {
					assert(!k);
				});
			}
		}
		p = t;
	});
});

describe('kind.each', function() {
	kind.each(expects, function(item, type) {
		it(type+' item references '+item[0], function() {
			assert(true);
		});
	});
});

describe('kind.find', function() {
	var search = [
		{ name: 'Hello World' },
		['Hello', 'World'],
		'Hello World'
	];
	
	it('find "Object" in array', function() {
		var found = kind.find(search, 'Object');
		assert.equal(found, search[0]);
	});
	
	it('find String in array', function() {
		var found = kind.find(search, String);
		assert.equal(found, search[2]);
	});
});
