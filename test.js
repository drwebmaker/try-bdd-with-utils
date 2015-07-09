var utils = require('./utils'),
    expect =  require('expect.js'),
		sinon = require('sinon');

describe('Utils', function() {

	describe('#sort()', function() {
		it('should sort given array of numbers with ascending ordering', function() {
			expect(utils.sort([2, 1, 3, 0, 5, 6]).join()).to.equal([0, 1, 2, 3, 5, 6].join());
			expect(utils.sort([2, 1, 3, 0, 5, 6], function(a, b) {return a > b}).join()).to.equal([0, 1, 2, 3, 5, 6].join());
			expect(utils.sort([2, 1, 3, 0, 5, 6], function(a, b) {return a < b}).join()).to.equal([6, 5, 3, 2, 1, 0].join());
		});

		it('should sort given error if not an array', function() {
			expect(function() {
				var obj = {1: 'thth', 2: 'fhfjdj'};
				utils.camelize(obj)
			}).to.throwError('Incorrect input data format');
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
			expect(utils.camelize('just do it!')).to.equal('JustDoIt');
		});
		it('should camelize array of string', function() {
			expect(utils.camelize(['just', 'do', 'it!']).join()).to.equal(['JustDoIt'].join());
		});
		it('should return error if camelize object', function() {

			expect(function() {
				var obj = {1: 'thth', 2: 'fhfjdj'};
				utils.camelize(obj)
			}).to.throwError('Incorrect input data format');
		});
	});

	describe('#trim()', function() {
		it('should make any count of spaces from the beginning and from the end of the string', function() {
			expect(utils.trim(' just do it! ')).to.equal('just do it!');
		});
		it('should return error if get not a string', function() {
			expect(function () {
				utils.trim(['ttt', 'ooo', 'test', 'pppp'])
			}).to.throwError('Incorrect input data format');
		});
	});

	describe('#reverse()', function() {
		it('should reverses a specified list', function() {
			expect(utils.reverse([0, 1, 2, 3]).join()).to.equal([3, 2, 1, 0].join());
		});
		it ('should show array with sting reverse', function() {
			expect(utils.reverse(['ttt', 'ooo', 'test', 'pppp']).join()).to.equal(['pppp', 'test', 'ooo', 'ttt'].join());
		});
		it('should return error if reverse object', function() {
			expect(function() {
				var obj = {1: 'thth', 2: 'fhfjdj'};
				utils.reverse(obj)
			}).to.throwError('Incorrect input data format');
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
		it('should return error if get not object or array', function() {
			expect(function() {
				var str = 'test me';
				utils.map(str, function(x){
					return x;
				})
			}).to.throwError('Incorrect input data format');
			expect(function() {
				var str = function(x){
					return x;
				};
				utils.map(str(),function(x){
					return x;
				})
			}).to.throwError('Incorrect input data format');
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
			expect(utils.groupBy(myArr, function(x) {return x.length})).to.eql(myObj);
		});
		it('Should throw an Error if input is not an Array', function () {
			expect(function () {
				utils.groupBy('try to input me :)', function (x) {
					return x;
				});
			}).to.throwError('Incorrect input data format');
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

		it('Should be only called one time(with spy - calledOnce)', function () {
			var spy = sinon.spy();
			var canOnlyFireOnce = utils.once(function() {
				spy();
			});

				for(var i = 0; i < 10; i++) {
					canOnlyFireOnce()
				}

			expect(spy.calledOnce).to.equal(true);
		});

		it('Should be only called one time(with spy - calledTwice)', function () {
			var spy = sinon.spy();
			var canOnlyFireOnce = utils.once(function() {
				spy();
			});

			for(var i = 0; i < 10; i++) {
				canOnlyFireOnce()

			}
			expect(spy.calledTwice).to.equal(false);
		});
	});

	describe("debounce", function() {
		before(function(){
			console.log(new Date())
		});

		after(function(){
			console.log(new Date())
		});

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



		it('Null return null', function() {
			expect(utils.debounce(null, 2000)).to.be.null;
		});
	});

	describe("debounce with Fake Timer", function() {
		before(function() {
			this.clock = sinon.useFakeTimers();
		});

		after(function() {
			this.clock.restore();
		});

		it("Should call function after ms milliseconds", function() {
			var log = '';

			function f(a) {
				log += a;
			}

			f = utils.debounce(f, 1000);

			f(1); // call now
			f(2); // ignore

			setTimeout(function() {f(3)}, 100); // ignore
			setTimeout(function() {f(4)}, 1100); // call now
			setTimeout(function() {f(5)}, 1500); // ignore

			this.clock.tick(5000);
			expect(log).to.equal("14");
		});

	});

	describe("isArray()", function() {
		it("Should return true if it's array", function() {
			var testArr = [1, 56, 87, 45, 76];
			expect(utils.isArray(testArr)).to.equal(true);
		});
		it("Should return false if it's not array", function() {
			var testArr = 'djgkjasdfabs';
			expect(utils.isArray(testArr)).to.equal(false);
		});
	});

	describe("isObject()", function() {
		it("Should return true if it's object", function() {
			var testobj = {1: 12, 4: 'test'};
			expect(utils.isObject(testobj)).to.equal(true);
		});
		it("Should return false if it's not object", function() {
			var testArr = 'djgkjasdfabs';
			expect(utils.isArray(testArr)).to.equal(false);
		});
	});

	describe("isString()", function() {
		it("Should return true if it's string", function() {
			var testStr = 'djgkjasdfabs';
			expect(utils.isString(testStr)).to.equal(true);
		});
		it("Should return false if it's not string", function() {
			var testArr = [1, 56, 87, 45, 76]
			expect(utils.isString(testArr)).to.equal(false);
		});
		it('Should not return an Object', function () {
			var testStr = 'djgkjasdfabs';
			expect(utils.isString(testStr)).to.not.be.a('object');
		});
	});

});

