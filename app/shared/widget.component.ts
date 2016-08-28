

export class Widget{
    showWidget: boolean = false;
    showAddButtons: boolean = false;
    showPlus: boolean = true;
    showPromotion: boolean = false;
    showComplaint: boolean = false;


    togglePlus(){
        this.showPlus = !this.showPlus;
        this.toggleAddButtons();
    }

    
    toggleAddButtons(){
        this.showAddButtons = !this.showAddButtons;
    }

    showPromotionDiv(){
        this.showPromotion = true;
        this.togglePlus();
    }

    showComplaintDiv(){
        this.showComplaint = true;
        this.togglePlus();
    }

    showWidgetDiv(){
        this.showWidget = true;
    }
}