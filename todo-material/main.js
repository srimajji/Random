(function(angular) {
    'use strict';

    angular.module('todo', ['ngMaterial'])
        .controller('MainController', MainController)
        .config(configTheme);

    function MainController($scope) {
        this.todo = ['Call myself', 'Quit something', 'Make something'];
        this.submitTask = submitTask;

        function submitTask(e, newTask) {
            console.log(e);
            if (e.which === 13)
                console.log(newTask);
        }
    }

    function configTheme($mdThemingProvider) {
        // Configure a dark theme with primary foreground yellow
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    }
})(angular);
