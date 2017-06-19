﻿(function () {
    app.config(['$locationProvider', '$stateProvider', function ($locationProvider, $stateProvider) {

        $stateProvider
            .state('default', {
                url: '/',
                redirectTo: 'recipes'
            });

        $stateProvider
            .state('recipes', {
                url: '/recipes',
                templateUrl: '/Views/Recipes.html',
                controller: 'RecipeController',
                controllerAs: 'model'
            });

        $stateProvider
                .state('recipes.search', {
                    url: '/search/:query',
                    resolve: {
                        searchData: ['$q', 'RecipeService', '$stateParams', function ($q, RecipeService, $stateParams) {

                            if ($stateParams.query) {
                                var deferred = $q.defer();

                                RecipeService.getRecipes($stateParams.query).then(function (response) {
                                    deferred.resolve(response.data);
                                });

                                return deferred.promise;
                            } else {
                                return null;
                            }
                        }]
                    },
                    templateUrl: '/Views/SearchResult.html',
                    controller: 'SearchController',
                    controllerAs: 'model'
                });

        $locationProvider.html5Mode({
            enabled: true, requireBase: false
        });
    }]);
})();