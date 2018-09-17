describe('link-context-li', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true as there is no other link in parent p tag', function () {
		var node = document.createElement('div');
		node.setAttribute('role', 'link');
		node.setAttribute('href', '#');
		node.innerHTML = 'link name';

		var node2 = document.createElement('li');
		node2.innerHTML = 'Hi there';

		node2.appendChild(node);
		fixture.appendChild(node2);

		assert.isTrue(checks['link-context-li'].evaluate(node));
	});

	it('should return true as both links have different link text', function () {
		var node = document.createElement('a');
		// node.setAttribute('role', 'link');
		node.setAttribute('href', '#');
		node.innerHTML = 'link name';

		var node2 = document.createElement('li');
		node2.innerHTML = 'Hi there';

    var node3 = document.createElement('a');
		// node3.setAttribute('role', 'link');
		node3.setAttribute('href', '#');
		node3.innerHTML = 'link name 2';

		node2.appendChild(node);
		node2.appendChild(node3);
		fixture.appendChild(node2);

		assert.isTrue(checks['link-context-li'].evaluate(node));
	});

	it('should return false as both links have the same link text', function () {
		var node = document.createElement('a');
		// node.setAttribute('role', 'link');
		node.setAttribute('href', '#');
		node.innerHTML = 'link name';

		var node2 = document.createElement('li');
		node2.innerHTML = 'Hi there';

    var node3 = document.createElement('a');
		// node3.setAttribute('role', 'link');
		node3.setAttribute('href', '#');
		node3.innerHTML = 'link name';

		node2.appendChild(node);
		node2.appendChild(node3);
		fixture.appendChild(node2);

		assert.isFalse(checks['link-context-li'].evaluate(node));
	});

});
