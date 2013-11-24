var <%= ProjectName %> = (function () {

	'use strict';
	var privateVariable = 'app fired!';

	return {
		publicFunction: function () {
			console.log(privateVariable);
		}
	};

})();

(function () {

	'use strict';
	<%= ProjectName %>.publicFunction();

} )();