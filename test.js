var eu = require('fedlib/extend/util');
var BaseComponent = require('pro/widget/base.component');
var tpl = require('text!./index.html');
var CheckboxGroup = require('pro/components2/form/checkbox.group/index');
var MultipleSelect = BaseComponent.extend({
    name: 'multipleSelect',
    template: tpl,
    config: function(data) {},
    init: function() {}
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

        while (element2) {
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

module.exports = MultipleSelect;