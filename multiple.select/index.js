/**
 * -------------------------------------------------------
 * multilSelect组件
 * @version 1.0
 * @author wuziran(hzwuziran@corp.netease.com)
 * -------------------------------------------------------
 * ```html
 * <multipleSelect value={'指标'} source={multipleSelect.source} defaultChecked={multipleSelect.defaultChecked}/>
 * ```
 *
 * ```javascript
 * this.data.multipleSelect = {
 *    defaultChecked: ['1', '4'],
 *    source: [
 *        {name: '销售额销售额销售额销售额销售额销售额', id: 0},
 *        {name: 'UV', id: 1},
 *        {name: '用户数', id: 2},
 *        {name: '销售额占比', id: 3},
 *        {name: '客单价', id: 4},
 *        {name: '新用户数', id: 5}
 *   ]
 * }
 *
 * ```
 */

/**
 * multipleSelect component.
 * @param {string}   - [data.class] 传入组件的额外class
 * @param {object}   - [data.source] 数据源，包含字段{name, default, id, cateName, index}, 也可以根据需要自己传其他属性
 * @param {boolean}  - [data.enableCateMode] 是否进行分类(数据源需要提供额外的cateName)
 * @param {number}   - [data.max] 最多可选择的指标个数
 * @param {number}   - [data.min] 最少要选择的指标个数
 * @param {string}   - [data.value] 选择框文案
 * @param {string[]} - [data.defaultChecked] 默认选中项的id的集合，用于恢复默认值
 * @param {string[]} - [data.currentChecked] 当前选中项的id的集合，用于初始化选中项
 */

NEJ.define([
    'fedlib/extend/util',
    'pro/widget/base.component',
    'text!./index.html',

    'pro/components2/form/checkbox.group/index'
], function(eu, BaseComponent, tpl,
        CheckboxGroup
){
    var MultipleSelect = BaseComponent.extend({
        name: 'multipleSelect',
        template: tpl,
        config: function(data){
        },
        init: function(){
        }
    });

    // 处理点击MediaSelect之外地方后的收起事件。
    MultipleSelect.opens = [];

    document.addEventListener('click', function(e) {
        var i, len, xselect, element, element2;

        for (len = MultipleSelect.opens.length, i = len - 1; i >= 0; i--) {
            // 这个地方不能用stopPropagation来处理，因为展开一个xselect的同时要收起其他xselect
            xselect = MultipleSelect.opens[i];
            element = xselect.$refs.element;
            element2 = e.target;

            while(element2) {
                if (element == element2) {
                    break;
                }
                element2 = element2.parentElement;
            }

            if (element != element2) {
                xselect.toggle(false);
                xselect.$update();
            }
        }
    }, false);

    MultipleSelect.component('checkboxGroup', CheckboxGroup);

    return MultipleSelect;
});