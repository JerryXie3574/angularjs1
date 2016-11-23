/**
 * Created by xieyufeng on 2016/11/23.
 */
'use strict';

angular.module('MainApp', [])
    .controller('contractCtrl', ['$scope', 'i18nService', '$loading','contractService', function ($scope, i18nService, $loading,contractService) {
        /*  变量初始化区域  start */
        //分页变量//
        $scope.currentPage = 1;
        $scope.numPages = 0;
        $scope.pageSize = 20;
        $scope.pages = [];

        $scope.gridApi = {};

        $scope.totalItems = 0;

        //ui-grid 中文化//
        i18nService.setCurrentLang('zh-cn');

        $scope.onSelectPage = function (page, pageSize) {
            contractService.getContractPage(page, pageSize).then(function (result) {
                $scope.products = result.data.records;
                $scope.totalpage = result.data.totalpage;
                $scope.totalItems = result.data.totalElements;
                $scope.numPages = result.totalpage;
                $scope.currentPage = page;

            }).finally(function () {
                $loading.finish('loading')
            })
        };

        //执行//
        $scope.onSelectPage(1, $scope.pageSize);

        /*  uiGrid初始化 start */

        /**
         * ui-grid使用
         * 1.配置options
         * @type {{useExternalPagination: boolean, paginationPageSizes: number[], paginationPageSize: *, totalItems: (number|*), columnDefs: *[], data: string}}
         */
        $scope.gridOptions = {
            useExternalPagination: true, //打开服务器分页
            paginationPageSizes: [20, 25, 50, 75], //每页显示多少条
            paginationPageSize: $scope.pageSize, //默认每页显示多少条
            columnDefs: [
                {field: 'title', displayName: '产品名称', enableSorting: false, enableColumnMenu: false},
                {field: 'id', displayName: '产品ID'},
                {field: 'regin', displayName: '地址', enableSorting: false, enableColumnMenu: false},
                {field: 'status', displayName: '设备状态', enableSorting: false, enableColumnMenu: false}, {
                    field: 'caozuo',
                    displayName: '操作',
                    width: 400,
                    enableSorting: false,
                    enableColumnMenu: false,
                    cellTemplate: ''
                }

            ],
            data: 'products' //数据
        };

        /**
         * 2.配置gridApi
         * @param gridApi
         */
        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                $scope.onSelectPage(pageNumber, pageSize);
            });
        };
        /**
         * 3.watch totalItems的变化,然后赋值给ui-grid的数据总条数
         */
        $scope.$watch('totalItems', function (value) {
            if (value != undefined) {
                $scope.gridApi.grid.options.totalItems = value;
            }
        });


    }]).factory('contractService', ['baseRestService', function (baseRestService) {

    var service = {};

    var _contractService = baseRestService.all('web/contract');

    service.getContractPage = function (page, pageSize) {
        return _contractService.get('list', {
            page: page,
            pageSize: pageSize
        });
    };

    return service;

}]);


