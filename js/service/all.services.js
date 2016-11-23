/**
 * User:kingdee
 * Date: 16/10/20
 * Time: 上午10:09
 *
 */

(function () {
    'use strict';
    /**
     * 权限验证service
     */
    angular.module('app.services', ['ngCookies', 'LocalStorageModule'])
        .factory('Auth', ['$cookieStore', '$http', 'localStorageService', function ($cookieStore, $http, localStorageService) {
            var _ssoUser = {}, _ssoMenu = {}, _ssoRes = {}, _ssoCount = 0;
            _ssoUser = angular.fromJson($cookieStore.get('user'));
            _ssoCount = angular.fromJson($cookieStore.get('count'));
            //检测浏览器本地存储 - 获取时判断
            if (localStorageService.isSupported) {
                _ssoMenu = localStorageService.get('menu');
                if (_ssoMenu == null || _ssoMenu == '' || _ssoMenu == undefined) {
                    if (_ssoUser != null) {
                        //获取菜单操作
                    }
                }
            } else {
                //获取菜单操作
            }

            var setUser = function (user) {
                _ssoUser = user;
                $$cookieStore.put('user', _ssoUser);
            }

            var setMenu = function (menu) {
                _ssoMenu = menu;
                if (localStorageService.isSupported) {
                    localStorageService.remove('menu');
                    localStorageService.set('menu', menu);
                }
            }

            var setCount = function (count) {
                _ssoCount = count;
                $$cookieStore.put('count', _ssoCount);
            }

            return {
                isAuthorized: function (path) {
                    //权限菜单操作
                },
                setUser: setUser,
                setMenu: setMenu,
                setCount: setCount,
                isLoggerIn: function () {

                    return _ssoUser ? true : false;
                },
                getUser: function () {
                    return _ssoUser;
                },
                getId: function () {
                    return _ssoUser ? _ssoUser._id : null;
                },
                getName: function () {
                    return _ssoUser ? _ssoUser._name : null;
                },
                getCompany: function () {
                    return _ssoUser ? _ssoUser._company : null;
                },
                getMenu: function () {
                    return _ssoMenu ? _ssoMenu : null;
                },
                getToken: function () {
                    return _ssoUser ? _ssoUser._token : '';
                },
                logout: function () {
                    // $cookieStore.remove('user',{domain:'.lngtop.com'})
                    $cookieStore.remove('user');
                    // $$cookieStore.remove('user');
                    _ssoUser = null;
                },
            }
        }])
        //拦截器
        .factory('interceptor', ['$q', '$rootScope', 'toaster', '$timeout', function ($q, $rootScope, toaster, $timeout) {
            var interceptor = {
                'request': function (config) {
                    config.headers['X-Lngtop-Application-Id'] = 'web';
                  /*  if ($rootScope.token != null && $rootScope.token != 'undefined') {
                        config.headers['X-Lngtop-Session-Token'] = $rootScope.token;
                    }*/
                    // config.headers['X-Lngtop-Session-Token'] = '123';
                    return config;
                },
                'response': function (response) {

                    return response;
                },
                'responseError': function (rejection) {

                    switch (rejection.status) {
                        case 0:
                            toaster.clear();
                            toaster.pop('error', "0错误", '<ul><li>服务器连接失败！</li></ul>', 10000, 'trustedHtml');
                            break;
                        case 400:
                            var data = rejection.data;
                            if (data.code && data.message) {
                                $rootScope.$broadcast('server:error');
                                toaster.clear();
                                toaster.pop('warning', "提示", '<ul><li>' + data.message + '</li></ul>', 10000, 'trustedHtml');
                                break;
                            }
                            toaster.pop('warning', "提示", '<ul><li>请求失败!</li></ul>', 10000, 'trustedHtml');
                            break;
                        case 401:
                            var message = rejection.data.message;
                            if (message.indexOf("name='loginRequired'") > 0 || message.indexOf("name='kickOut'") > 0 || message.indexOf("name='timeOut'") > 0) {
                                window.location.href = "../login.html#/" + $rootScope.loginCode;
                            } else {
                                toaster.clear();
                                toaster.pop('error', "401错误", '<ul><li>' + rejection.data.message + '</li></ul>', 5000, 'trustedHtml');
                            }
                            // if (rejection.config.url != API_BASE_URL + "/base/employee/login")
                            //     $rootScope.$broadcast("name='NeedLogin'");
                            // toaster.clear();
                            // toaster.pop('error', "错误", '<ul><li>没有权限</li></ul>', 10000, 'trustedHtml');
                            break;
                        case 403:
                            $rootScope.$broadcast('auth:forbidden');
                            toaster.clear();
                            toaster.pop('error', "错误", '<ul><li>禁止访问</li></ul>', 10000, 'trustedHtml');
                            break;
                        case 404:
                            $rootScope.$broadcast('page:notFound');
                            toaster.clear();
                            toaster.pop('warning', "Sorry", '<ul><li>网络似乎出现了一点小问题,请稍候访问!</li></ul>', 10000, 'trustedHtml');
                            break;
                        case 500:
                            $rootScope.$broadcast('server:error');
                            toaster.clear();
                            toaster.pop('warning', "Sorry!", '<ul><li>网络似乎出现了一点小问题,请稍候访问!</li></ul>', 10000, 'trustedHtml');
                            break;
                    }
                    return $q.reject(rejection);
                }
            }
            return interceptor;
        }])
       //restAngular 配置
        .factory('baseRestService', ['Restangular', 'sweet', '$loading', '$rootScope', '$compile', '$stateParams',
            function(Restangular, sweet, $loading, $rootScope, $compile, $stateParams) {

                Restangular.setRequestInterceptor(
                    function(element, operation, what, url) {
                        return element;
                    }
                );

                Restangular.setResponseInterceptor(
                    function(data, operation, what, url) {
                        return data;
                    }
                );

                return Restangular.withConfig(function(Configurer) {
                    Configurer.setBaseUrl(API_BASE_URL);
                });
            }
        ])
        .service('NavSearch', [function() {
            this.toggle = toggle;
            this.dismiss = dismiss;

            ////////////////

            var navbarFormSelector = 'form.navbar-form';

            function toggle() {
                var navbarForm = $(navbarFormSelector);

                navbarForm.toggleClass('open');

                var isOpen = navbarForm.hasClass('open');

                //navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
            }

            function dismiss() {
                $(navbarFormSelector)
                    .removeClass('open') // Close control
                    .find('input[type="text"]').blur() // remove focus
                //   .val('') // Empty input
            }
        }])
        .service('settingBox', [function() {
            this.toggle = toggle;
            this.dismiss = dismiss;

            ////////////////

            var navbarFormSelector = 'div.setting-box';

            function toggle() {
                var navbarForm = $(navbarFormSelector);

                navbarForm.toggleClass('open');

                var isOpen = navbarForm.hasClass('open');

                // navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
            }

            function dismiss() {
                $(navbarFormSelector)
                    .removeClass('open') // Close control
                    .find('input[type="text"]').blur() // remove focus
                //   .val('') // Empty input
            }
        }])
        /**
         * @Author   DongWenZhao
         * @DateTime 2016-05-17
         */
        .service('$loading', ['$rootScope', 'loadingOptions', function($rootScope, loadingOptions) {

            var self = this;
            self.setDefaultOptions = function(options) {
                extend(true, loadingOptions, options);
            };

            self.start = function(key) {
                $rootScope.$evalAsync(function() {
                    $rootScope.$broadcast('$loadingStart', key);
                });
            };

            self.update = function(key, options) {
                $rootScope.$evalAsync(function() {
                    $rootScope.$broadcast('$loadingUpdate', key, options);
                });
            };

            self.finish = function(key) {
                $rootScope.$evalAsync(function() {
                    $rootScope.$broadcast('$loadingFinish', key);
                });
            };


        }])
        .factory('clipboard', ['$document', function($document) {
            function createNode(text, context) {
                var node = $document[0].createElement('textarea');
                node.style.position = 'absolute';
                node.textContent = text;
                node.style.left = '-10000px';
                if (context instanceof HTMLElement) {
                    node.style.top = context.getBoundingClientRect().top + 'px';
                }
                return node;
            }

            function copyNode(node) {
                try {
                    // Set inline style to override css styles
                    $document[0].body.style.webkitUserSelect = 'initial';

                    var selection = $document[0].getSelection();
                    selection.removeAllRanges();
                    node.select();

                    if (!$document[0].execCommand('copy')) {
                        throw ('failure copy');
                    }
                    selection.removeAllRanges();
                } finally {
                    // Reset inline style
                    $document[0].body.style.webkitUserSelect = '';
                }
            }

            function copyText(text, context) {
                var node = createNode(text, context);
                $document[0].body.appendChild(node);
                copyNode(node);
                $document[0].body.removeChild(node);
            }

            return {
                copyText: copyText,
                supported: 'queryCommandSupported' in document && document.queryCommandSupported('copy')
            };
        }]);
})();