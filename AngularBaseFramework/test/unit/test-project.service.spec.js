describe('test project service', function() {

    var _rootScope, _testProjectService;

    beforeEach(module('test.project'));

    beforeEach(inject(function($rootScope, testProjectService) {
        _rootScope = $rootScope;
        _scope = $rootScope.$new();
        _testProjectService = testProjectService;
        _rootScope.$apply();
    }));

    describe('testProjectService', function() {


        it('the given value should return the excel column code', function() {
            var testProjectCtrlVm = {};
            testProjectCtrlVm.columnCode = '';
            _testProjectService.getExcelColumnCode(2, testProjectCtrlVm);
            expect(testProjectCtrlVm.columnCode).toBe('B');

            testProjectCtrlVm.columnCode = '';
            _testProjectService.getExcelColumnCode(25, testProjectCtrlVm);
            expect(testProjectCtrlVm.columnCode).toBe('Y');

            testProjectCtrlVm.columnCode = '';
            _testProjectService.getExcelColumnCode(52, testProjectCtrlVm);
            expect(testProjectCtrlVm.columnCode).toBe('AZ');

            testProjectCtrlVm.columnCode = '';
            _testProjectService.getExcelColumnCode(53, testProjectCtrlVm);
            expect(testProjectCtrlVm.columnCode).toBe('BA');

            testProjectCtrlVm.columnCode = '';
            _testProjectService.getExcelColumnCode(78, testProjectCtrlVm);
            expect(testProjectCtrlVm.columnCode).toBe('BZ');

            testProjectCtrlVm.columnCode = '';
            _testProjectService.getExcelColumnCode(79, testProjectCtrlVm);
            expect(testProjectCtrlVm.columnCode).toBe('CA');
        });

        it('the given value should return the readable text', function() {
            expect(_testProjectService.convertNumberToReadableText(10)[0]).toBe('ten');
            expect(_testProjectService.convertNumberToReadableText(7685)[0]).toBe('seven thousand six hundred ninety five');
            expect(_testProjectService.convertNumberToReadableText(345)[0]).toBe('three hundred forty five');
            expect(_testProjectService.convertNumberToReadableText(283947)[0]).toBe('two hundred ninety three thousand nine hundred forty seven');
            expect(_testProjectService.convertNumberToReadableText(13)[0]).toBe('thirteen');
        });

        it('the given value should return the readable text with comma (,) separation', function() {
            var result;

            result = _testProjectService.convertNumberToReadableText("10, 123");
            expect(result[0]).toBe('ten');
            expect(result[1]).toBe('one hundred twenty three');

            result = _testProjectService.convertNumberToReadableText("938745, 19");
            expect(result[0]).toBe('nine hundred thirty eight thousand seven hundred forty five');
            expect(result[1]).toBe('nineteen');
        });

        it('the given value should return the readable text with \'FROM\' and \'TO\'', function() {
            var result;

            result = _testProjectService.convertNumberToReadableText("from 10 to 100");
            expect(result[0]).toBe('FROM ten TO one hundred');

            result = _testProjectService.convertNumberToReadableText("from 11230 to 567");
            expect(result[0]).toBe('FROM eleven thousand two hundred thirty TO five hundred sixty seven');
        });

    });

});