describe('link-context-aria', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true as link has aria-label', function () {
		var node = document.createElement('div');
		node.setAttribute('role', 'link');
		node.setAttribute('href', '#');
		node.setAttribute('aria-label', 'test');
		node.innerHTML = 'link name';

		fixture.appendChild(node);

		assert.isTrue(checks['link-context-aria'].evaluate(node));
	});

	it('should return true as link has aria-labelledby', function () {
		var node = document.createElement('a');
		// node.setAttribute('role', 'link');
		node.setAttribute('href', '#');
		node.setAttribute('aria-labelledby', 'test');
		node.innerHTML = 'link name';

		fixture.appendChild(node);

		assert.isTrue(checks['link-context-aria'].evaluate(node));
	});

	it('should return true as link has aria-describedby', function () {
		var node = document.createElement('a');
		// node.setAttribute('role', 'link');
		node.setAttribute('href', '#');
		node.setAttribute('aria-describedby', 'test');
		node.innerHTML = 'link name';

		fixture.appendChild(node);

		assert.isTrue(checks['link-context-aria'].evaluate(node));
	});

	it('should return false as link dont have an description', function () {
		var node = document.createElement('a');
		// node.setAttribute('role', 'link');
		node.setAttribute('href', '#');
		node.innerHTML = 'link name';
		fixture.appendChild(node);

		assert.isFalse(checks['link-context-aria'].evaluate(node));
	});

});
