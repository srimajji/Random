(function () {
	'use strict';

	angular.module('app')
		.factory('uDialogService', uDialogService);

		//Custom Directive that takes in the following options
		//templateUrl:
		//controller:
		//inputs:
		//uDialogOptions:
		//and combines it into an angular template with data-bindings and calls .dockmodal()
		//Based on the tutorial: http://www.dwmkerr.com/the-only-angularjs-modal-service-youll-ever-need/
		function uDialogService($document, $compile, $controller, $http, $rootScope, $q) {
			var service = {
				showDock: showDock
			};
			return service;

			function showDock(options) {

				var deferred = $q.defer();
				var controller = options.controller;

				if(!controller) {
					deferred.reject("No controller has been specified");
					return deferred.promise;
				}

				getTemplate(options.template, options.templateUrl)
					.then(callDockModal)
					.catch(catchError);

				return deferred.promise;

				//Check for templateSettings. If the template is not there, the promise object gets rejected
				function getTemplate (template, templateUrl) {
					var deferred = $q.defer();
					if(template) {
						deferred.resolve(template);
					} else if(templateUrl) {
						$http({method: 'GET', url: templateUrl, cache: true})
							.then( function (result) {
								deferred.resolve(result.data);
							})
							.catch( function (error) {
								deferred.reject(error);
							});
					} else {
						deferred.reject("No template or templateUrl has been specified");
					}
					return deferred.promise;
				}

				function callDockModal(template) {
					//before calling dockModal(), we need to gather all the data that is passed to this directive
					var uDialogScope = $rootScope.$new();
					var closeDeferred = $q.defer();
					var inputs = {
						$scope: uDialogScope,
						close: function(result) {
							closeDeferred.resolve(result);

							//destroy
							uDialogScope.$destroy();
							uDialogElement.dockmodal("close");

							inputs.close = null;
							deferred = null;
							closeDeferred = null;
							uDialog = null;
							inputs = null;
							uDialogElement = null;
							uDialogScope = null;
						}
					};

					//Syntax example: inputs: {task: task}. Here ng-model is task
					//If the uDialog is being for editing an item, inputs should be used to share data
					//between controllers. This is a controller like task-edit.controller.js will know about which
					//task is being edited and can call the /task/update api with proper parameters
					if(options.inputs) {
						for(var inputName in options.inputs) {
							inputs[inputName] = options.inputs[inputName];
							//inputs[inputName] = {};
							//angular.copy(options.inputs[inputName], inputs[inputName]);
						}
					}
					var uDialogDefaults = {
						initialState: "docked",
						width: 290,
						minimizedWidth: 290,
						height: 385,
						showPopout: false,
						showClose: true,
						showMinimize: true,
						buttons: [
							{
								html: "Save",
								click: function () {
									//since submit button on uDialog is out of scope (not within the uDialogScope)
									//there is a hidden input field with id=uDialogFormSubmit that is required within
									//each template that is passed when initializing uDialog
									//this is used to manually execute the click action
									angular.element('#uDialogFormSubmit').click();
								}
							}
						]
					};

					var uDialogOptions = angular.extend(uDialogDefaults, options.uDialogOptions);
					//calling dockmodal here actually initializes the plugin itself.
					//no particular reason its called here. Just for convinience.
					//the data won't be shown until its properly compiled by angular
					var uDialogTemplate = angular.element(template).dockmodal(uDialogOptions);
					var linkFn = $compile(uDialogTemplate);
					var uDialogElement = linkFn(uDialogScope);

					inputs.$element = uDialogElement;
					var uDialogController = $controller(controller, inputs);

					//.show() actually shows the template info that is passed to this directive
					//in the dockmodal
					uDialogElement.show();

					var uDialog = {
						controller: uDialogController,
						scope: uDialogScope,
						element: uDialogElement,
						close: closeDeferred.promise
					};

					deferred.resolve(uDialog);
				}

				function catchError(error) {
					deferred.reject(error);
				}
			}
		}
})();
