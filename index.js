const Acorn = require('acorn');
const path = require('path');

const transformFile = require('./transformFile.js');

transformFile(path.resolve(__dirname, './multiple.select/index.js'));

// eval(`

// var NEJ = {};

// NEJ.define = function(depPaths, module){
//     /*依赖路径*/
//     console.log(depPaths);

//     /*依赖变量*/
//     let code = '(' + module.toString() + ')';
//     let ast = Acorn.parse(code);
//     let moduleFuncNode = ast.body[0].expression;
//     let depVarNames = moduleFuncNode.params.map(param => param.name);
    
//     let funcBodyAst = moduleFuncNode.body.body;
//     let funcReturnStatements = [];

//     for(let i = 0; i < funcBodyAst.length; i++){
//         let node = funcBodyAst[i];
//         if(node.type === 'ReturnStatement'){
//             funcReturnStatements.push(node);
//         }
//     }

//     /*生成新代码*/
//     var depDeclearStr = '';
//     for(let j = 0; j < depVarNames.length; j++)[
//         depDeclearStr += \`const \${depVarNames[j]} = require('\${depPaths[j]}');\n\`
//     ]

//     /*生成module.exports*/
//     let newCode = '';
//     for(let k = 0; k < funcReturnStatements.length; k++){
//         let returnStatement = funcReturnStatements[k];
//         let start = returnStatement.start;
//         let end = returnStatement.end;


//         newCode = code.slice(0, start) + \`module.exports = \${returnStatement.argument.name}:\` + code.slice(end, code.length);
//     }

//     /*获取函数体*/
//     let body = newCode.substring(newCode.indexOf("{") + 1, newCode.lastIndexOf("}"));
//     console.log(depDeclearStr + body);
    
// };
// /**
// * -------------------------------------------------------
// * multilSelect组件
// * @version 1.0
// * @author wuziran(hzwuziran@corp.netease.com)
// * -------------------------------------------------------
// */

// /**
// * multipleSelect component.
// * @param {string}   - [data.class] 传入组件的额外class
// * @param {object}   - [data.source] 数据源，包含字段{name, default, id, cateName, index}, 也可以根据需要自己传其他属性
// * @param {boolean}  - [data.enableCateMode] 是否进行分类(数据源需要提供额外的cateName)
// * @param {number}   - [data.max] 最多可选择的指标个数
// * @param {number}   - [data.min] 最少要选择的指标个数
// * @param {string}   - [data.value] 选择框文案
// * @param {string[]} - [data.defaultChecked] 默认选中项的id的集合，用于恢复默认值
// * @param {string[]} - [data.currentChecked] 当前选中项的id的集合，用于初始化选中项
// */

// NEJ.define([
//    'fedlib/extend/util',
//    'pro/widget/base.component',
//    'text!./index.html',

//    'pro/components2/form/checkbox.group/index'
// ], function(eu, BaseComponent, tpl,
//        CheckboxGroup
// ){
//    var MultipleSelect = BaseComponent.extend({
//        name: 'multipleSelect',
//        template: tpl,
//        config: function(data){
//            eu.extend(data, {
//                max: null,
//                min: 1,
//                open: false, // 默认不打开下拉选项
//                value: '多选按钮',
//                checked: { // 已选信息
//                    all: false,
//                    list: []
//                },
//                defaultChecked: [],
//                source: []
//            });
//            data.enableCateMode && this.unionSource();
//        },
//        init: function(){
//            this.$watch('currentChecked', function(newVal, oldVal) {
//                if(newVal !== undefined && newVal !== oldVal) {
//                    this.setChecked(this.data.currentChecked);
//                    this.$emit('change', {
//                        sender: this,
//                        checked: this.getOrderCheckedList()
//                    });
//                }
//            });
//        },
//        unionSource: function(){
//            var data = this.data,
//                source = data.source,
//                hashTable = {}, result = [];

//            source.forEach(function(item){
//                var cateName = item.cateName;
               
//                if(!hashTable[cateName]){
//                    hashTable[cateName] = [];
//                }
//                hashTable[cateName].push(item);
//            });

//            for(var cate in hashTable){
//                result.push({title: cate, list: hashTable[cate]});
//            }
//            data.unionedSource = result; ;
//        },
//        onEmpty: function(){
//            var checkGroup = this.$refs.checkGroup;
//            this.data.source.forEach(function(item, index){
//                if(!item.disabled) {
//                    checkGroup._$check(index, false);
//                }
//            });
//        },
//        onCheck: function(){
//            var data = this.data,
//                checkGroup = this.$refs.checkGroup;

//            if(data.checked.list.length > data.max){
//                var first = data.checked.list.find(function(item){
//                    return !item.disabled;
//                });
//                var firstIndex = data.source.indexOf(first);
//                checkGroup._$check(firstIndex, false);
//            }

//            if(data.checked.list.length >= data.max) {
//                this.$emit('reachmax', {
//                    sender: this,
//                    max: data.max,
//                    checked: data.checked
//                });
//            }
//            if(data.checked.list.length < data.min) {
//                this.$emit('reachmin', {
//                    sender: this,
//                    min: data.min,
//                    checked: data.checked
//                });
//            }
//        },
//        setDefault: function() {
//            this.setChecked(this.data.defaultChecked);
//        },
//        isDisableChecked: function(item) {
//            var data = this.data;
           
//            if(data.enableMaxShiftMode && !item.disabled){
//                return false;
//            }
//            var max = data.max;
//            var preCondition = true;
//            var disabled = false;
//            if(item) {
//                preCondition = !this.isItemChecked(item);
//                disabled = item.disabled;
//            }
//            return max == null && !disabled ? false : disabled || (preCondition && data.checked.list.length>=max);
//        },
//        isItemChecked: function(target) {
//            var res = false;
//            this.data.checked.list.some(function(item) {
//                return res = target === item;
//            });
//            return res;
//        },
//        setChecked: function(arr){
//            if(!arr) {
//                return;
//            }
//            var checkGroup = this.$refs.checkGroup;
//            checkGroup._$clear();
//            this.data.source.forEach(function(item, index){
//                if(~arr.indexOf(item.id)) {
//                    checkGroup._$check(index, true);
//                } else {
//                    checkGroup._$check(index, false);
//                }
//            });
//        },
//        reOrder: function(checkedList){
//            var data = this.data;
//            var currentChecked = data.currentChecked;
//            var currentCheckedMap = currentChecked.reduce(function(prev, cur, index){
//                prev[cur] = index;
//                return prev;
//            }, {});
           
//            var checkedListForShow = checkedList.slice(0).sort(function(v1, v2){
//                return currentCheckedMap[v1.id] - currentCheckedMap[v2.id];
//            });
           
//            return checkedListForShow;
//        },
//        onOK: function(){
//            var checkedList = this.data.checked.list;
//            if (checkedList.length < this.data.min) {
//                return false;
//            }
//            this.data.currentChecked = checkedList.map(function(item){
//                return item.id;
//            });
//            this.toggle(false);
//            this.$emit('ok', {
//                sender: this,
//                checked: checkedList
//            });
//        },
//        getOrderCheckedList: function() {
//            var orderCheckedList = [];
//            this.data.source.forEach(function(item) {
//                if(!!~this.data.checked.list.indexOf(item)) {
//                    orderCheckedList.push(item);
//                }
//            }.bind(this));
//            return orderCheckedList;
//        },
//        onCancel: function(){
//            this.toggle(false);
//        },
//        onReset: function(){
//            this.setDefault();
//        },
//        onSelectAll: function(){
//            var data = this.data,
//                checkGroup = this.$refs.checkGroup;
//            if(this.isDisableChecked()) {
//                return;
//            }
//            if (data.checked.all === true) {
//                data.checked.all = false;
//                checkGroup._$clear();
//            } else {
//                data.checked.all = true;
//                data.source.forEach(function(item, index){
//                    checkGroup._$check(index, true);
//                });
//            }
//        },
//        toggle: function(open) {
//            if (typeof open === 'undefined') {
//                open = !this.data.open;
//            }
//            this.data.open = open;

//            // 根据状态在XSelect.opens列表中添加/删除控件
//            var index = MultipleSelect.opens.indexOf(this);
//            if (open && index < 0) {
//                MultipleSelect.opens.push(this);
//            } else if (!open && index >= 0) {
//                MultipleSelect.opens.splice(index, 1);
//            }

//            if(open) {
//                this.setChecked(this.data.currentChecked);
//            }
//        }

//    });

//    // 处理点击MediaSelect之外地方后的收起事件。
//    MultipleSelect.opens = [];

//    document.addEventListener('click', function(e) {
//        var i, len, xselect, element, element2;

//        for (len = MultipleSelect.opens.length, i = len - 1; i >= 0; i--) {
//            // 这个地方不能用stopPropagation来处理，因为展开一个xselect的同时要收起其他xselect
//            xselect = MultipleSelect.opens[i];
//            element = xselect.$refs.element;
//            element2 = e.target;

//            while(element2) {
//                if (element == element2) {
//                    break;
//                }
//                element2 = element2.parentElement;
//            }

//            if (element != element2) {
//                xselect.toggle(false);
//                xselect.$update();
//            }
//        }
//    }, false);

//    MultipleSelect.component('checkboxGroup', CheckboxGroup);

//    return MultipleSelect;
// });`)