
describe('link-context test', function () {
	'use strict';
	var results;
	before(function (done) {
		function start() {
			axe.run('#fixture', { runOnly: { type: 'rule', values: ['link-context'] } }, function (err, r) {
				assert.isNull(err);
				results = r;
				done();
			});
		}
		if (document.readyState !== 'complete') {
			window.addEventListener('load', start);
		} else {
			start();
		}
	});

	describe('violations', function () {
		it('should find 2', function () {
		  window.console.log(results);
			assert.lengthOf(results.violations, 1);
		});
	});

	describe('passes', function () {
		it('should find 1', function () {
			assert.lengthOf(results.passes, 1);
		});

	});

});
