/**
 * User:kingdee
 * Date: 16/10/20
 * Time: 上午9:44
 *
 */
'use strict';
    angular.module('MainApp')
        .run(['$rootScope', function settingsRun($rootScope) {

            // Global Settings
            // -----------------------------------
            $rootScope.app = {
                name: 'crm',
                description: 'crm管理平台',
                year: ((new Date()).getFullYear()),
                layout: {
                    isFixed: true,
                    isCollapsed: false,
                    isClose: false,
                    isBoxed: false,
                    isRTL: false,
                    isGreen: false,
                    isZhengwei: false,
                    horizontal: false,
                    isFloat: false,
                    asideHover: false,
                    theme: null
                },
                useFullLayout: false,
                hiddenFooter: false,
                offsidebarOpen: false,
                asideToggled: false,
                viewAnimation: 'ng-fadeInUp'
            };

            // Close submenu when sidebar change from collapsed to normal
            $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
                if (newValue === false)
                    $rootScope.$broadcast('closeSidebarMenu');
            });

        }])

        angular.module('MainApp').run(['$rootScope', '$state', '$stateParams', '$window', '$location', 'Auth', 'cfpLoadingBar', '$timeout', 'sweet', 'localStorageService', function ($rootScope, $state, $stateParams, $window, $location, Auth, cfpLoadingBar, $timeout, sweet, localStorageService) {
        var thBar;

        if ($('.wrapper > section').length) {
            thBar = $timeout(function () {
                cfpLoadingBar.start();
            }, 0)
        }
        $rootScope.token = Auth.getToken();
        $rootScope.user = Auth.getUser();
        $rootScope.$stateParams = $stateParams;
        // $rootScope.app.layout.isCollapsed = true;
        $rootScope.searchBlockVisible = true;
        $rootScope.toggleSearchBlock = function () {
            $rootScope.$broadcast('toggleSearchBlock');
        };
        $rootScope.$on('toggleSearchBlock', function (/*event, args*/) {
            $rootScope.searchBlockVisible = !$rootScope.searchBlockVisible;
        });
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var path = toState.name;
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            var path = toState.name;
            event.targetScope.$watch('$viewContentLoaded', function () {
                $timeout.cancel(thBar);
                cfpLoadingBar.complete();
            });
            $window.scrollTo(0, 0); //跳转成功 初始化在顶部

            $rootScope.currTitle = $state.current.title; // 自定义标题
            $rootScope.pageTitle = function () {
                var title = $rootScope.app.name + '-' + ($rootScope.currTitle || $rootScope.app.description);
                document.title = title;
                return title;
            }
            $rootScope.pageTitle();
        });
    }]);