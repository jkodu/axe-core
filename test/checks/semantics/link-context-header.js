describe('link-context-header', function () {
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

		var node2 = document.createElement('p');
		node2.innerHTML = 'Hi there';

		var node3 = document.createElement('h2');
		node3.innerHTML = 'Hi there';

		node2.appendChild(node);
		fixture.appendChild(node3);
		fixture.appendChild(node2);

		assert.isTrue(checks['link-context-header'].evaluate(node));
	});

	it('should return true as both links have different link text', function () {
		var node = document.createElement('a');
		// node.setAttribute('role', 'link');
		node.setAttribute('href', '#');
		node.innerHTML = 'link name';

		var node2 = document.createElement('p');
		node2.innerHTML = 'Hi there';

		var node4 = document.createElement('h2');
		node4.innerHTML = 'Hi there';

		node2.appendChild(node);
		fixture.appendChild(node4);
		fixture.appendChild(node2);

		assert.isTrue(checks['link-context-header'].evaluate(node));
	});

	it('should return false as both links have the same link text', function () {
		var node1 = document.createElement('a');
		// node.setAttribute('role', 'link');
		node1.setAttribute('href', '#1');
		node1.innerHTML = 'link name';

		var node2 = document.createElement('a');
		// node.setAttribute('role', 'link');
		node2.setAttribute('href', '#2');
		node2.innerHTML = 'link name';

		var node3 = document.createElement('p');
		node3.innerHTML = 'Hi there';

		var node4 = document.createElement('h2');
		node4.innerHTML = 'Hi there';

		node3.appendChild(node1);
		node3.appendChild(node2);
		fixture.appendChild(node4);
		fixture.appendChild(node3);

		assert.isFalse(checks['link-context-header'].evaluate(node1));
	});

	it('should return false as both links have the same link text', function () {
		var node1 = document.createElement('a');
		// node.setAttribute('role', 'link');
		node1.setAttribute('href', '#1');
		node1.innerHTML = 'link name';

		var node2 = document.createElement('a');
		// node.setAttribute('role', 'link');
		node2.setAttribute('href', '#2');
		node2.innerHTML = 'link name';

		var node3 = document.createElement('p');
		node3.innerHTML = 'Hi there';

		var node4 = document.createElement('h2');
		node4.innerHTML = 'Hi there';

		node3.appendChild(node1);
		node4.appendChild(node2);
		fixture.appendChild(node4);
		fixture.appendChild(node3);

		assert.isFalse(checks['link-context-header'].evaluate(node1));
	});

});
