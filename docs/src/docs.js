angular.module('DocsController', []).controller('DocsController', function($scope) {
	$scope.subnav = [
		{"href": "v2/resource-center/quniversity", "title": "Q-University"},
		{"href": "v2/resource-center/process", "title": "Our Process"},
		{"href": "v2/resource-center/products", "title": "Products"},
		{"href": "v2/resource-center/forms", "title": "Forms"},
		{"href": "v2/resource-center/reports", "title": "Reports"},
		{"href": "v2/resource-center/faqs", "title": "FAQ"},
		{"href": "v2/resource-center/contacts", "title": "Contact Us"}
	];
	$scope.scenarios = {"foo": {"liens": [], "property": {"numberUnits": 1, "occupancy": "Primary", "type": "Single Family", "oneYear": "Yes", "price": "1323123.00", "value": "325423"}, "fico": "700", "zipcode": "23423", "city": "Detroit", "county": "Wayne", "ltv": "32", "name": "foo", "purpose": "Refinance - Rate/Term", "channel": "Wholesale", "createDate": 1393440815680, "compensation": "Lender Paid"}, "inputtest": {"liens": [], "property": {"numberUnits": 1, "occupancy": "Primary", "type": "Single Family", "oneYear": "Yes", "price": "", "value": ""}, "fico": "566", "zipcode": "23423", "city": "Detroit", "county": "Wayne", "ltv": "43", "name": "inputtest", "purpose": "Refinance - Rate/Term", "channel": "Wholesale", "compensation": "Lender Paid", "createDate": 1393439559022}}

	$scope.message = {title: "This is a new message!", data: {date: '2013-04-01T13:01:02', body: "This message has <strong>not</strong> been viewed yet.", viewed: false}};
	$scope.otherMessage = {title: "You have already seen this messge.", data: {date: '2013-04-01T13:01:02', body: "This is the message body. It <em>can contain markup.</em>", viewed: true}};
	$scope.titlecaseString = "hello world this is a string to be titlecased."
	$scope.parenthifyString = "Wrap me in parens!";
	$scope.percentString = '4.125';
	$scope.phoneString = '123-123-1232';
	$scope.ssnString = '123121234';
	$scope.zeroPadString = 1234;
});

angular.module('DocsController').controller('SelectionCtrl', function($scope){
	$scope.selection = [
		{'name':'First Item','content':'1375713305679'},
		{'name':'Second Item','content':'1375104328362'},
		{'name':'Third Item','content':'1375713305679'},
		{'name':'Fourth Item','content':'1375104328362'},
		{'name':'Fifth Item','content':'1375713305679'},
		{'name':'Sixth Item','content':'1375713305679'},
		{'name':'Seventh Item','content':'1375104328362'},
		{'name':'Eighth Item','content':'1375713305679'}
	];
});

angular.module('DocsController').controller('SelectCtrl', function($scope){
	$scope.selectData = [
		{name: "Option One", value: "optionOne"},
		{name: "Option Two", value: "optionTwo"},
		{name: "Option Three", value: "optionThree"},
		{name: "Option Four", value: "optionFour"},
		{name: "Option Five", value: "optionFive"},
		{name: "Option Six", value: "optionSix"}
	];
});
