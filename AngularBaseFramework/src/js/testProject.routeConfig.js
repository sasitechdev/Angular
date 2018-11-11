(function() {
    'use strict';

    angular.module('test.project')
    .config(testProjectRouteConfig);

    testProjectRouteConfig.$inject = ['$routeProvider'];

    function testProjectRouteConfig($routeProvider) {

        var otherwise = {
            redirectTo: "/testproject"
        };

        var testProjectState = {
            templateUrl: 'partials/_test-project.html',
            controller: 'test.project.controller',
            controllerAs: 'testProjectCtrlVm'
        };

        $routeProvider
            .when('/testproject', testProjectState)
        .otherwise(otherwise);
    }
})();