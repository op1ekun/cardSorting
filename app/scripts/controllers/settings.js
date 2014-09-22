'use strict';

angular.module('cardsortingApp')
  .controller('SettingsCtrl', function ($scope, Auth) {
    $scope.errors = {};

    $scope.newPasswordInvalid = function(){
      return ($scope.form.newPassword.$error.minlength || $scope.form.newPassword.$error.required) && ($scope.form.newPassword.$dirty || $scope.submitted)
    }

    $scope.confirmNewPasswordInvalid = function(){
      return ($scope.user && $scope.user.confirmNewPassword && $scope.user.confirmNewPassword != $scope.user.newPassword) && ($scope.form.confirmNewPassword.$dirty || $scope.submitted)
    }

    $scope.disableSave = function(){
      return (!$scope.user.newPassword || $scope.newPasswordInvalid()) || $scope.confirmNewPasswordInvalid() || !$scope.user.confirmNewPassword.length || !$scope.user.oldPassword
    }

    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
        });
      }
		};
  });
