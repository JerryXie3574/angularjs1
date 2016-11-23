/**
 * User:kingdee
 * Date: 16/10/20
 * Time: 上午9:44
 *
 */
'use strict';

/*angular.module('fullstackApp')
 .config(function ($stateProvider) {
 $stateProvider
 .state('blogList', {
 url: '/blogList',
 templateUrl: 'app/admin/blogList/blogList.html',
 controller: 'BlogListCtrl',
 authenticate:true
 })
 .state('blogWrite', {
 url: '/blog_write',
 templateUrl: 'app/admin/blogList/blog_write.html',
 controller: 'BlogWriteCtrl',
 authenticate:true
 })
 });*/


angular.module('MainApp').config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
        //去掉 '#'
        // $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/sso/form');
        $stateProvider
        // 主页路由
            .state('sso', {
                url: '/sso',
                abstract: true,
                templateUrl: 'views/app.html'
            })
            .state('sso.form', {
                url: '/form',
                title: '表单',
                templateUrl: 'views/tplExample/tpl_home.html'
            })
            .state('sso.table', {
                url: '/table',
                title: '表单',
                templateUrl: 'views/tplExample/tpl_table.html',
                controller: 'tableCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['ngGrid']).then(
                                function () {
                                    return $ocLazyLoad.load(['js/appDemo/tableCtrl.js' + '?v=' + version]);
                                }
                            );
                        }
                    ]
                }
            })
            .state('contract', {
                url: '/contract',
                abstract: true,
                templateUrl: 'views/app.html'
            })
            .state('contract.list', {
                url: '/list',
                title: '合同管理',
                templateUrl: 'views/tplContract/tpl_contract.html',
                controller: 'contractCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['ngGrid']).then(
                                function () {
                                    return $ocLazyLoad.load(['js/appContract/contractCtrl.js' + '?v=' + version]);
                                }
                            );
                        }
                    ]
                }
            });
        //http拦截器
        $httpProvider.interceptors.push('interceptor');

    }]);