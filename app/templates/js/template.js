var <%= ProjectName %> = (function() {

	'use strict';
	var privateVariable = '<%= ProjectName %> app fired!',
		docElem = document.documentElement;

	return {
		publicFunction: function() {
			console.log(privateVariable);
		},
		userAgentInit: function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		}
	};

})();

(function() {

	'use strict';

	//foundation init
	$(document).foundation();

	<%= ProjectName %>.publicFunction();
	<%= ProjectName %>.userAgentInit();

})();