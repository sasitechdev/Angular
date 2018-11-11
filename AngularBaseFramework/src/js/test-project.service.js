(function (undefined) {
    'use strict';

    angular
        .module('test.project')
        .factory('testProjectService', testProjectService);

    testProjectService.$inject = [];

    function testProjectService() {

        var service = {};
        service.getExcelColumnCode          = getExcelColumnCode;
        service.convertNumberToReadableText = convertNumberToReadableText;
        return service;

        function getExcelColumnCode(input, testProjectCtrlVm) {

            var modValue = input % 26;

            if (modValue == 0) {
                testProjectCtrlVm.columnCode = String.fromCharCode(65 + 26 - 1)  + testProjectCtrlVm.columnCode;
            } else {
                testProjectCtrlVm.columnCode = String.fromCharCode(65 + modValue - 1)  + testProjectCtrlVm.columnCode;
            }

            var newValue = parseInt(input-1) / 26;
            if (parseInt(newValue) > 0) {
                getExcelColumnCode(newValue, testProjectCtrlVm);
            }
        }

        function convertNumberToReadableText(numberStr) {
            var convertedWordArray = [];

            var splitByFrom = numberStr.toString().toLowerCase().split('from ');

            //To handle the format `from 10 to 20.`
            if (splitByFrom.length > 1) {
                var splitByTo = splitByFrom[1].toString().toLowerCase().split(' to ');
                var fromValue = convertToWord(splitByTo[0]);
                var splitByDot = splitByTo[1].split(".");
                var toValue = convertToWord(splitByDot[0]);
                convertedWordArray.push('FROM ' + fromValue.trim() + ' TO ' + toValue.trim());
                return convertedWordArray;
            }

            //To handle , separated and individual numbers
            var numberArray = numberStr.toString().split(',');
            angular.forEach(numberArray, function(num) {
                convertedWordArray.push(convertToWord(num).trim());
            });

            return convertedWordArray;
        }

        function convertToWord(num) {
            var value = '';
            var place = 0;

            if (num == 0) return 'zero';
            var places =  ['', 'thousand ', 'million ', 'billion ', 'trillion ', 'quadrillion ', 'quintillion '];
            while (num != 0) {
                var first3Digits = num % 1000;
                num = parseInt(num / 1000);
                value = convertGroupOfThree(first3Digits) + places[place] + value;
                place++;
            }
            return value;
        }

        function convertGroupOfThree(num) {
            var str = '';
            var special_cases = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ',
            'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];

            if (num < 20) return special_cases[num];

            var firstDigit = num % 10;
            num = parseInt(num / 10);
            str = str + special_cases[firstDigit];

            var secondDigit = num % 10;
            num = parseInt(num / 10);

            var second_digit_cases = ['', '', 'twenty ', 'thirty ', 'forty ', 'fifty ', 'sixty ', 'seventy ', 'ninety '];
            str = second_digit_cases[secondDigit] + str;

            //third digit
            if (num > 0) {
                var third_digit = num % 10;
                str = special_cases[third_digit] + 'hundred ' + str;
            }
            return str;
        }
    }
})();
