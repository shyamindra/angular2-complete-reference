"use strict";
var Widget = (function () {
    function Widget() {
        this.showWidget = false;
        this.showAddButtons = false;
        this.showPlus = true;
    }
    Widget.prototype.togglePlus = function () {
        this.showPlus = !this.showPlus;
        this.toggleAddButtons();
    };
    Widget.prototype.toggleAddButtons = function () {
        this.showAddButtons = !this.showAddButtons;
    };
    Widget.prototype.showPromotionDiv = function () {
        this.roostType = "PROMO";
        this.showPromotion();
        this.togglePlus();
        this.showWidgetDiv();
    };
    Widget.prototype.showPromotion = function () {
        this.navHeader = "Post Promotion";
        this.titleDescription = "Enter your Promotion title here";
        this.description = "Describe your Promotion in detail";
    };
    Widget.prototype.showComplaintDiv = function () {
        this.roostType = "COMPLAIN";
        this.showComplaint();
        this.togglePlus();
        this.showWidgetDiv();
    };
    Widget.prototype.showComplaint = function () {
        this.navHeader = "Post Complaint";
        this.titleDescription = "Enter your Complaint title here";
        this.description = "Describe your Complaint in detail";
    };
    Widget.prototype.showWidgetDiv = function () {
        this.showWidget = true;
    };
    Widget.prototype.closeWidget = function () {
        this.showWidget = false;
    };
    return Widget;
}());
exports.Widget = Widget;
//# sourceMappingURL=widget.component.js.map