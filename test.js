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

	describe('#groupBy()', function() {
		it('should group an array of lengths of elements in the object', function() {
			var myArr = ['one', 'hello', 'home', 'look at my'];
			var myObj = {
				3: ['one'],
				4: ['home'],
				5: ['hello'],
				10: ['look at my']
			};
			expect(utils.deepEqual(utils.groupBy(myArr, function(x) {return x.length}), myObj)).to.equal(true);
		});
	});

	describe('#deepEqual()', function() {
		it('Should compare objects and return false', function () {
			var testObject1 = {
				name: 'Maria',
				age: 25
			};
			var testObject2 = {
				userFirstName: 'Maria',
				userAge: 25
			};

			expect(utils.deepEqual(testObject1, testObject2)).to.equal(false);
		});
	});

	describe('#once()', function() {
		it('Should be only called one time', function () {
			var count = 0;
			var canOnlyFireOnce = utils.once(function() {
				count++;
				return count;
			});
			function tmp() {
				for(var i = 0; i < 3; i++) {
					canOnlyFireOnce()
				}
				if(count === 1) {
					return true;
				}

			}
			expect(tmp()).to.equal(true);
		});
	});

	describe("debounce", function() {

		it('Should call function after ms milliseconds', function () {
			var ms = 1000;
			var testTmp = 'doing something';

			var date;
			var currentDate;

			var test = function () {
				date = new Date();
				utils.debounce(function () {
					return testTmp.toUpperCase();
				}, ms);
				currentDate = new Date();

				return ((currentDate - date) <= ms);
			};

			expect(test()).to.equal(true);
		});

	});

});

