"use strict";
var Widget = (function () {
    function Widget() {
        this.showWidget = false;
        this.showAddButtons = false;
        this.showPlus = true;
        this.showPromotion = false;
        this.showComplaint = false;
    }
    Widget.prototype.togglePlus = function () {
        this.showPlus = !this.showPlus;
        this.toggleAddButtons();
    };
    Widget.prototype.toggleAddButtons = function () {
        this.showAddButtons = !this.showAddButtons;
    };
    Widget.prototype.showPromotionDiv = function () {
        this.showPromotion = true;
        this.togglePlus();
    };
    Widget.prototype.showComplaintDiv = function () {
        this.showComplaint = true;
        this.togglePlus();
    };
    Widget.prototype.showWidgetDiv = function () {
        this.showWidget = true;
    };
    return Widget;
}());
exports.Widget = Widget;
//# sourceMappingURL=widget.component.js.map