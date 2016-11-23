/**
 * User:kingdee
 * Date: 16/10/20
 * Time: 上午9:42
 *
 */

'use strict';

angular.module('MainApp')
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: [{
                name: 'ngGrid',
                files: [
                    'js/lib/ui-grid.js',
                    'bower_components/angular-ui-grid/ui-grid.min.css',
                ]
            }, {
                name: 'ui.select',
                files: [
                    'lib/angular-ui-select/select.min.js',
                    'lib/angular-ui-select/select.css'
                ]
            },, {
                name: 'sweet',
                files: [
                    'bower_components/sweetalert/dist/sweetalert.css',
                    'bower_components/sweetalert/dist/sweetalert.min.js',
                    'bower_components/angular-sweetalert/dist/ngSweetAlert.min.js'
                ]
            }, {
                name: 'perfectscroll',
                files: [
                    'js/jquery/jquery.slimscroll.min.js'

                ]
            }, {
                name: 'datepick',
                files: [
                    'js/common/My97DatePicker/WdatePicker.js',
                    'js/common/My97DatePicker/skin/WdatePicker.css'

                ]
            }, {
                name: 'selectModel',
                files: [
                    'bower_components/selection-model/dist/selection-model.min.js'
                ]
            }, {
                name: 'ng-grid',
                files: [
                    'bower_components/ng-grid/ng-grid-2.0.14.min.js',
                    'bower_components/ng-grid/ng-grid.min.css'
                ]
            }]
        });
    }]);
mainApp.config(["w5cValidatorProvider", function(w5cValidatorProvider) {

    // 全局配置
    w5cValidatorProvider.config({
        blurTrig: false,
        showError: true,
        removeError: true
    });

    w5cValidatorProvider.setRules({
        email: {
            required: "输入的邮箱地址不能为空",
            email: "输入邮箱地址格式不正确"
        },
        username: {
            required: "输入的用户名不能为空",
            pattern: "用户名必须输入字母、数字、下划线,以字母开头",
            w5cuniquecheck: "输入用户名已经存在，请重新输入"
        },
        password: {
            required: "密码不能为空",
            minlength: "密码长度不能小于{minlength}",
            maxlength: "密码长度不能大于{maxlength}",
            pattern: "请输入6-12位数字或英文组合"
        },
        oldPassword: {
            required: "密码不能为空",
            minlength: "密码长度不能小于{minlength}",
            maxlength: "密码长度不能大于{maxlength}",
            pattern: "请输入6-12位数字或英文组合"
        },
        newPassword: {
            required: "密码不能为空",
            minlength: "密码长度不能小于{minlength}",
            maxlength: "密码长度不能大于{maxlength}",
            pattern: "请输入6-12位数字或英文组合"
        },
        confirmPassword: {
            required: "密码不能为空",
            minlength: "密码长度不能小于{minlength}",
            maxlength: "密码长度不能大于{maxlength}",
            pattern: "请输入6-12位数字或英文组合"
        },
        repeatPassword: {
            required: "重复密码不能为空",
            repeat: "两次密码输入不一致"
        },
        number: {
            required: "数字不能为空"
        },
        mobile: {
            required: "请输入手机号",
            mobile: "输入手机号格式不正确"
        },
        modelName: {
            w5cuniquecheck: "该设备型号已存在"
        },
        roomCode: {
            w5cuniquecheck: "该户号已存在"
        },
        industryRoomCode: {
            w5cuniquecheck: "该编号已存在"
        },
        roomNumber: {
            w5cuniquecheck: "该房号已存在"
        },
        customerName: {
            pattern: "请输入中文"
        },
        certificatesNo: {
            pattern: "证件号码有误"
        },
        factoryName: {
            w5cuniquecheck: "该生产厂家已存在"
        },
        chargePlan_name: {
            pattern: "名称不能包含特殊字符"
        },
        customerType_name: {
            pattern: "名称不能包含特殊字符"
        },
        discountPlan_name: {
            pattern: "名称不能包含特殊字符"
        },
        phoneNumber: {
            pattern: "手机号格式不正确"
        }
    });
}]);
