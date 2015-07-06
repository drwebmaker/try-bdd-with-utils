var utils = require('./utils'),
    expect =  require('expect.js');

describe('Utils', function() {

	describe('#sort()', function() {
		it('should sort given array of numbers with ascending ordering', function() {
			expect(utils.sort([2, 1, 3, 0, 5, 6]).join()).to.equal([0, 1, 2, 3, 5, 6].join());
			expect(utils.sort([2, 1, 3, 0, 5, 6], function(a, b) {return a > b}).join()).to.equal([0, 1, 2, 3, 5, 6].join());
			expect(utils.sort([2, 1, 3, 0, 5, 6], function(a, b) {return a < b}).join()).to.equal([6, 5, 3, 2, 1, 0].join());
		});

		//TODO: don't forget about custom comparator function
	});

	describe('#capitalize()', function() {
		it('should make first letter of given string upper case', function() {
			expect(utils.capitalize('just do it!')).to.equal('Just do it!');
		});
	});

	//TODO: Add your specs for other methods

	describe('#camelize()', function() {
		it('should camelize string', function() {
			expect(utils.camelize('just do it!')).to.equal('JustDoIt!');
		});
		it('should camelize array of string', function() {
			expect(utils.camelize(['just', 'do', 'it!']).join()).to.equal(['Just', 'Do', 'It!'].join());
		});
	});

	describe('#trim()', function() {
		it('should make any count of spaces from the beginning and from the end of the string', function() {
			expect(utils.trim(' just do it! ')).to.equal('just do it!');
		});
	});

	describe('#reverse()', function() {
		it('should reverses a specified list', function() {
			expect(utils.reverse([0, 1, 2, 3]).join()).to.equal([3, 2, 1, 0].join());
		});
	});

	describe('#map()', function() {
		it('should reverses a specified list(array)', function() {
			expect(utils.map([0, 1, 2, 3], function(x){
				return x += 2;
			}).join()).to.equal([2, 3, 4, 5].join());
		});

		it('should reverses a specified list(object)', function() {
			var testObj = {
				1: [1, 2, 3],
				2: [4, 5, 6]
			};
			expect(utils.map(testObj, function(x){
				return x;
			}).join()).to.equal([1, 2, 3, 4, 5, 6].join());
		});
	});

});