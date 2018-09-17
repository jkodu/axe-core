describe('link-context-table-cell', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true as there is no other link in table cells', function () {
		var node = document.createElement('a');
		node.setAttribute('href', '#');
		node.innerHTML = 'link name';

		var table = document.createElement('table');
		var tr1 = document.createElement('tr');
		var th1 = document.createElement('th');
		var tr2 = document.createElement('tr');
		var td1 = document.createElement('td');

    td1.appendChild(node);

    tr1.appendChild(th1);
    tr2.appendChild(td1);
    table.appendChild(tr1);
    table.appendChild(tr2);

		fixture.appendChild(table);

		assert.isTrue(checks['link-context-table-cell'].evaluate(node));
	});

	it('should return true as both links have different link text', function () {
		var link1 = document.createElement('a');
		// node.setAttribute('role', 'link');
		link1.setAttribute('href', '#');
		link1.innerHTML = 'link name';

    var link2 = document.createElement('a');
		// node.setAttribute('role', 'link');
		link2.setAttribute('href', '#');
		link2.innerHTML = 'link name 2';

		var table = document.createElement('table');
		var tr1 = document.createElement('tr');
		var th1 = document.createElement('th');
		var tr2 = document.createElement('tr');
		var td1 = document.createElement('td');

    td1.appendChild(link1);
    td1.appendChild(link2);

    tr1.appendChild(th1);
    tr2.appendChild(td1);
    table.appendChild(tr1);
    table.appendChild(tr2);

		fixture.appendChild(table);

		assert.isTrue(checks['link-context-table-cell'].evaluate(link1));
	});

	it('should return false as both links have the same link text', function () {
		var link1 = document.createElement('a');
		// node.setAttribute('role', 'link');
		link1.setAttribute('href', '#');
		link1.innerHTML = 'link name';

    var link2 = document.createElement('a');
		// node.setAttribute('role', 'link');
		link2.setAttribute('href', '#');
		link2.innerHTML = 'link name';

		var table = document.createElement('table');
		var tr1 = document.createElement('tr');
		var th1 = document.createElement('th');
		var tr2 = document.createElement('tr');
		var td1 = document.createElement('td');

    td1.appendChild(link1);
    td1.appendChild(link2);

    tr1.appendChild(th1);
    tr2.appendChild(td1);
    table.appendChild(tr1);
    table.appendChild(tr2);

		fixture.appendChild(table);

		assert.isFalse(checks['link-context-table-cell'].evaluate(link1));
	});

	it('should return false as both links have the same link text', function () {
		var link1 = document.createElement('a');
		// node.setAttribute('role', 'link');
		link1.setAttribute('href', '#');
		link1.innerHTML = 'link name';

    var link2 = document.createElement('a');
		// node.setAttribute('role', 'link');
		link2.setAttribute('href', '#');
		link2.innerHTML = 'link name';

		var table = document.createElement('table');
		var tr1 = document.createElement('tr');
		var th1 = document.createElement('th');
		var tr2 = document.createElement('tr');
		var td1 = document.createElement('td');

    td1.appendChild(link1);
    th1.appendChild(link2);

    tr1.appendChild(th1);
    tr2.appendChild(td1);
    table.appendChild(tr1);
    table.appendChild(tr2);

		fixture.appendChild(table);

		assert.isFalse(checks['link-context-table-cell'].evaluate(link1));
	});

});
