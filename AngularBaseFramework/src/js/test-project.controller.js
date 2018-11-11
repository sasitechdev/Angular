(function() {
	'use strict';
	angular.module('test.project')
		.controller('test.project.controller', testProjectController);

	testProjectController.$inject = ['$scope', 'testProjectService'];

	function testProjectController($scope, testProjectService) {
		var testProjectCtrlVm = this;
		testProjectCtrlVm.calcColumnValue       = calcColumnValue;
		testProjectCtrlVm.convertToWordArray    = convertToWordArray;

        function calcColumnValue() {
            testProjectCtrlVm.columnCode = "";
		    if (testProjectCtrlVm.code < 1) return;
		    testProjectService.getExcelColumnCode(testProjectCtrlVm.code, testProjectCtrlVm);
		}

		function convertToWordArray() {
            testProjectCtrlVm.convertedWordArray = testProjectService.convertNumberToReadableText(testProjectCtrlVm.numberStr);
		}

	}

})();
