'use strict';

angular.module('mean.figs').controller('FigsController', ['$scope', '$stateParams', '$location', 'Global', 'Figs',
  function($scope, $stateParams, $location, Global, Figs) {
    $scope.global = Global;
    $scope.versions = [{
      version: '',
      file:''
    }];

    $scope.hasAuthorization = function(fig) {
      if (!fig || !fig.user) return false;
      return $scope.global.isAdmin || fig.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var fig = new Figs({
          repo: $stateParams.repoId,
          version: this.version,
          content: this.content
        });
        fig.$save(function(response) {
          $location.path('figs/' + response._id);
        });

        this.version = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(fig) {
      if (fig) {
        fig.$remove();

        for (var i in $scope.figs) {
          if ($scope.figs[i] === fig) {
            $scope.figs.splice(i, 1);
          }
        }
          $location.path('figs');
      } else {
        $scope.fig.$remove(function(response) {
          $location.path('figs');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var fig = $scope.fig;
        if (!fig.updated) {
          fig.updated = [];
        }
        fig.updated.push(new Date().getTime());

        fig.$update(function() {
          $location.path('figs/' + fig._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Figs.query({repo: $stateParams.repoId}, function(figs) {
        $scope.figs = figs;
      });
    };

    $scope.findOne = function() {
      Figs.get({
        figId: $stateParams.figId
      }, function(fig) {
        $scope.fig = fig;
      });
    };

    $scope.addVersion = function(fig) {
      this.versions.push({
        version: '',
        fig: ''
      });
    };
  }
]);
