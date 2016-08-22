"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var util_1 = require('../../platform/testing/util');
var testing_1 = require('@angular/core/testing');
var testing_2 = require("@angular/core/testing");
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require('./index');
function main() {
    describe('Pagination', function () {
        var builder;
        beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
            builder = tcb;
        }));
        util_1.componentSanityCheck('MdPagination', 'md-pagination', "<md-pagination></md-pagination>");
        describe('MdPagination', function () {
            var TestComponent = (function () {
                function TestComponent() {
                    this.defaultModel = {
                        currentPage: 1,
                        itemsPerPage: 5,
                        totalItems: 24
                    };
                    this.defaultItemsPerPageOptions = [10, 50, 100];
                }
                TestComponent = __decorate([
                    core_1.Component({
                        selector: 'test-app',
                        directives: [common_1.CORE_DIRECTIVES, index_1.MdPagination, index_1.MdPaginationControls, index_1.MdPaginationItemsPerPage, index_1.MdPaginationRange],
                        template: "<md-pagination></md-pagination>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TestComponent);
                return TestComponent;
            }());
            function setup(template) {
                if (template === void 0) { template = null; }
                var prep = template === null ?
                    builder.createAsync(TestComponent) :
                    builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
                return prep.then(function (fixture) {
                    var debug = fixture.debugElement.query(platform_browser_1.By.css('md-pagination'));
                    var comp = debug.componentInstance;
                    fixture.detectChanges();
                    return {
                        fixture: fixture,
                        comp: comp,
                        debug: debug
                    };
                }).catch(console.error.bind(console));
            }
            describe('default values', function () {
                it('should have a default model', function () {
                    return setup().then(function (api) {
                        expect(api.comp.model.currentPage).toEqual(0);
                        expect(api.comp.model.itemsPerPage).toEqual(0);
                        expect(api.comp.model.totalItems).toEqual(0);
                    });
                });
                it('should accept custom model', function () {
                    return setup("<md-pagination [model]=\"defaultModel\"></md-pagination>").then(function (api) {
                        expect(api.comp.model.currentPage).toEqual(1);
                        expect(api.comp.model.itemsPerPage).toEqual(5);
                        expect(api.comp.model.totalItems).toEqual(24);
                    });
                });
                it('should have a default name', function () {
                    return setup().then(function (api) {
                        expect(api.comp.name).toEqual('default');
                    });
                });
                it('should accept a custom name', function () {
                    return setup("<md-pagination name=\"book\"></md-pagination>").then(function (api) {
                        expect(api.comp.name).toEqual('book');
                    });
                });
                it('should display range by default', function () {
                    return setup().then(function (api) {
                        expect(api.comp.range).toBeTruthy();
                    });
                });
                it('should accept a custom display for range', function () {
                    return setup("<md-pagination [range]=\"false\"></md-pagination>").then(function (api) {
                        expect(api.comp.range).toBeFalsy();
                    });
                });
                it('should not have a default rangeFormat', function () {
                    return setup().then(function (api) {
                        expect(api.comp.rangeFormat).toBeUndefined();
                    });
                });
                it('should accept a custom rangeFormat', function () {
                    return setup("<md-pagination range-format=\"{start}/{total}\"></md-pagination>").then(function (api) {
                        expect(api.comp.rangeFormat).toEqual('{start}/{total}');
                    });
                });
                it('should display controls by default', function () {
                    return setup().then(function (api) {
                        expect(api.comp.controls).toBeTruthy();
                    });
                });
                it('should accept a custom display for controls', function () {
                    return setup("<md-pagination [controls]=\"false\"></md-pagination>").then(function (api) {
                        expect(api.comp.controls).toBeFalsy();
                    });
                });
                it('should display items per page options by default', function () {
                    return setup().then(function (api) {
                        expect(api.comp.itemsPerPage).toBeTruthy();
                    });
                });
                it('should accept a custom display for items per page', function () {
                    return setup("<md-pagination [items-per-page]=\"false\"></md-pagination>").then(function (api) {
                        expect(api.comp.itemsPerPage).toBeFalsy();
                    });
                });
                it('should not have a default prepended string to items per page', function () {
                    return setup().then(function (api) {
                        expect(api.comp.itemsPerPageBefore).toBeUndefined();
                    });
                });
                it('should accept a custom prepended string to items per page', function () {
                    return setup("<md-pagination items-per-page-before=\"page:\"></md-pagination>").then(function (api) {
                        expect(api.comp.itemsPerPageBefore).toEqual('page:');
                    });
                });
                it('should not have a default appended string to items per page', function () {
                    return setup().then(function (api) {
                        expect(api.comp.itemsPerPageAfter).toBeUndefined();
                    });
                });
                it('should accept a custom appended string to items per page', function () {
                    return setup("<md-pagination items-per-page-after=\" - \"></md-pagination>").then(function (api) {
                        expect(api.comp.itemsPerPageAfter).toEqual(' - ');
                    });
                });
                it('should not have a default list of options for items per page', function () {
                    return setup().then(function (api) {
                        expect(api.comp.itemsPerPageOptions).toBeUndefined();
                    });
                });
                it('should accept a custom list of options for items per page', function () {
                    return setup("<md-pagination [items-per-page-options]=\"defaultItemsPerPageOptions\"></md-pagination>").then(function (api) {
                        expect(api.comp.itemsPerPageOptions).not.toContain(5);
                        expect(api.comp.itemsPerPageOptions).toContain(10);
                        expect(api.comp.itemsPerPageOptions).toContain(50);
                        expect(api.comp.itemsPerPageOptions).toContain(100);
                    });
                });
            });
            describe('construct', function () {
                var service, updatedPagination = {
                    currentPage: 2,
                    itemsPerPage: 30,
                    totalItems: 65
                };
                beforeEach(testing_1.inject([index_1.PaginationService], function (serv) {
                    service = serv;
                }));
                it('should listen PaginationService', function () {
                    return setup().then(function (api) {
                        api.comp.onPaginationChange.subscribe(function (event) {
                            expect(event.name).toEqual('pagination_changed');
                            expect(event.target).toEqual('default');
                            expect(event.pagination).toEqual(updatedPagination);
                        });
                        service.change('default', updatedPagination);
                    });
                });
                it('should listen PaginationService only for his reference name', function () {
                    return setup("<md-pagination name=\"book\"></md-pagination>").then(function (api) {
                        var spy = jasmine.createSpy('spy');
                        api.comp.onPaginationChange.subscribe(spy);
                        service.onChange.subscribe(function () {
                            expect(spy).not.toHaveBeenCalled();
                        });
                        service.change('default', updatedPagination);
                    });
                });
            });
            describe('ngAfterContentInit', function () {
                it('should init default components', function () {
                    return setup().then(function (api) {
                        var element = api.debug.nativeElement;
                        api.fixture.detectChanges();
                        expect(element.children.length).toEqual(3);
                    });
                });
                it('should accept custom components as children', function () {
                    return setup("<md-pagination><button></button></md-pagination>").then(function (api) {
                        var element = api.debug.nativeElement;
                        api.fixture.detectChanges();
                        expect(element.children.length).toEqual(1);
                    });
                });
            });
            describe('ngAfterViewInit', function () {
                var service, defaultModel = {
                    currentPage: 1,
                    itemsPerPage: 30,
                    totalItems: 65
                };
                beforeEach(testing_1.inject([index_1.PaginationService], function (serv) {
                    service = serv;
                    spyOn(service, 'change');
                }));
                it('should dispatch his model after init', function () {
                    return setup("<md-pagination name=\"book\" [model]=\"defaultModel\"></md-pagination>").then(function (api) {
                        expect(service.change).toHaveBeenCalled();
                    });
                });
            });
        });
        util_1.componentSanityCheck('MdPaginationRange', 'md-pagination-range', "<md-pagination-range></md-pagination-range>");
        describe('MdPaginationRange', function () {
            var TestComponent = (function () {
                function TestComponent() {
                    this.page2 = {
                        currentPage: 2,
                        itemsPerPage: 30,
                        totalItems: 65
                    };
                    this.page3 = {
                        currentPage: 3,
                        itemsPerPage: 30,
                        totalItems: 65
                    };
                    this.defaultRangeFormat = '{start}-{end} / {total}';
                }
                TestComponent = __decorate([
                    core_1.Component({
                        selector: 'test-app',
                        directives: [common_1.CORE_DIRECTIVES, index_1.MdPaginationRange],
                        template: "<md-pagination-range></md-pagination-range>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TestComponent);
                return TestComponent;
            }());
            function setup(template) {
                if (template === void 0) { template = null; }
                var prep = template === null ?
                    builder.createAsync(TestComponent) :
                    builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
                return prep.then(function (fixture) {
                    var debug = fixture.debugElement.query(platform_browser_1.By.css('md-pagination-range'));
                    var comp = debug.componentInstance;
                    fixture.detectChanges();
                    return {
                        fixture: fixture,
                        comp: comp,
                        debug: debug
                    };
                }).catch(console.error.bind(console));
            }
            describe('default values', function () {
                it('should have a default model', function () {
                    return setup().then(function (api) {
                        expect(api.comp.model.currentPage).toEqual(0);
                        expect(api.comp.model.itemsPerPage).toEqual(0);
                        expect(api.comp.model.totalItems).toEqual(0);
                    });
                });
                it('should accept custom model', function () {
                    return setup("<md-pagination-range [model]=\"page2\"></md-pagination-range>").then(function (api) {
                        expect(api.comp.model.currentPage).toEqual(2);
                        expect(api.comp.model.itemsPerPage).toEqual(30);
                        expect(api.comp.model.totalItems).toEqual(65);
                    });
                });
                it('should have a default name', function () {
                    return setup().then(function (api) {
                        expect(api.comp.name).toEqual('default');
                    });
                });
                it('should accept a custom name', function () {
                    return setup("<md-pagination-range name=\"book\"></md-pagination-range>").then(function (api) {
                        expect(api.comp.name).toEqual('book');
                    });
                });
                it('should have a default range format', function () {
                    return setup().then(function (api) {
                        expect(api.comp.rangeFormat).toEqual('{start}-{end} of {total}');
                    });
                });
                it('should accept a custom range format', function () {
                    return setup("<md-pagination-range [range-format]=\"defaultRangeFormat\"></md-pagination-range>").then(function (api) {
                        expect(api.comp.rangeFormat).toEqual('{start}-{end} / {total}');
                    });
                });
            });
            describe('construct', function () {
                var service, updatedPagination = {
                    currentPage: 1,
                    itemsPerPage: 30,
                    totalItems: 65
                };
                beforeEach(testing_1.inject([index_1.PaginationService], function (serv) {
                    service = serv;
                }));
                it('should listen PaginationService', function () {
                    return setup().then(function (api) {
                        service.onChange.subscribe(function (event) {
                            expect(api.comp.model).toEqual(updatedPagination);
                        });
                        service.change('default', updatedPagination);
                    });
                });
                it('should listen PaginationService only for his reference name', function () {
                    return setup("<md-pagination-range name=\"book\"></md-pagination-range>").then(function (api) {
                        service.onChange.subscribe(function () {
                            expect(api.comp.model).toEqual({
                                currentPage: 0,
                                itemsPerPage: 0,
                                totalItems: 0
                            });
                        });
                        service.change('default', updatedPagination);
                    });
                });
            });
            describe('getFormattedValue', function () {
                it('should replace pattern in the range format', function () {
                    return setup().then(function (api) {
                        expect(api.comp.getFormattedValue(1, 5, 30)).toEqual('1-5 of 30');
                    });
                });
            });
            describe('getRange', function () {
                it('should calculate range at the middle', function () {
                    return setup("<md-pagination-range [model]=\"page2\"></md-pagination-range>").then(function (api) {
                        spyOn(api.comp, 'getFormattedValue').and.callThrough();
                        var result = api.comp.getRange();
                        expect(result['changingThisBreaksApplicationSecurity']).toEqual('31-60 of 65');
                        expect(api.comp.getFormattedValue).toHaveBeenCalledWith(31, 60, 65);
                    });
                });
                it('should calculate range at the end', function () {
                    return setup("<md-pagination-range [model]=\"page3\"></md-pagination-range>").then(function (api) {
                        spyOn(api.comp, 'getFormattedValue').and.callThrough();
                        var result = api.comp.getRange();
                        expect(result['changingThisBreaksApplicationSecurity']).toEqual('61-65 of 65');
                        expect(api.comp.getFormattedValue).toHaveBeenCalledWith(61, 65, 65);
                    });
                });
            });
        });
        util_1.componentSanityCheck('MdPaginationControls', 'md-pagination-controls', "<md-pagination-controls></md-pagination-controls>");
        describe('MdPaginationControls', function () {
            var TestComponent = (function () {
                function TestComponent() {
                    this.page1 = {
                        currentPage: 1,
                        itemsPerPage: 30,
                        totalItems: 65
                    };
                    this.page2 = {
                        currentPage: 2,
                        itemsPerPage: 30,
                        totalItems: 65
                    };
                    this.page3 = {
                        currentPage: 3,
                        itemsPerPage: 30,
                        totalItems: 65
                    };
                }
                TestComponent = __decorate([
                    core_1.Component({
                        selector: 'test-app',
                        directives: [common_1.CORE_DIRECTIVES, index_1.MdPaginationControls],
                        template: "<md-pagination-controls></md-pagination-controls>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TestComponent);
                return TestComponent;
            }());
            function setup(template) {
                if (template === void 0) { template = null; }
                var prep = template === null ?
                    builder.createAsync(TestComponent) :
                    builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
                return prep.then(function (fixture) {
                    var debug = fixture.debugElement.query(platform_browser_1.By.css('md-pagination-controls'));
                    var comp = debug.componentInstance;
                    fixture.detectChanges();
                    return {
                        fixture: fixture,
                        comp: comp,
                        debug: debug
                    };
                }).catch(console.error.bind(console));
            }
            describe('default values', function () {
                it('should have a default model', function () {
                    return setup().then(function (api) {
                        expect(api.comp.model.currentPage).toEqual(0);
                        expect(api.comp.model.itemsPerPage).toEqual(0);
                        expect(api.comp.model.totalItems).toEqual(0);
                    });
                });
                it('should accept custom model', function () {
                    return setup("<md-pagination-controls [model]=\"page2\"></md-pagination-controls>").then(function (api) {
                        expect(api.comp.model.currentPage).toEqual(2);
                        expect(api.comp.model.itemsPerPage).toEqual(30);
                        expect(api.comp.model.totalItems).toEqual(65);
                    });
                });
                it('should have a default name', function () {
                    return setup().then(function (api) {
                        expect(api.comp.name).toEqual('default');
                    });
                });
                it('should accept a custom name', function () {
                    return setup("<md-pagination-controls name=\"book\"></md-pagination-controls>").then(function (api) {
                        expect(api.comp.name).toEqual('book');
                    });
                });
            });
            describe('construct', function () {
                var service, updatedPagination = {
                    currentPage: 1,
                    itemsPerPage: 30,
                    totalItems: 65
                };
                beforeEach(testing_1.inject([index_1.PaginationService], function (serv) {
                    service = serv;
                }));
                it('should listen PaginationService', function () {
                    return setup().then(function (api) {
                        service.onChange.subscribe(function (event) {
                            expect(api.comp.model).toEqual(updatedPagination);
                        });
                        service.change('default', updatedPagination);
                    });
                });
                it('should listen PaginationService only for his reference name', function () {
                    return setup("<md-pagination-controls name=\"book\"></md-pagination-controls>").then(function (api) {
                        service.onChange.subscribe(function () {
                            expect(api.comp.model).toEqual({
                                currentPage: 0,
                                itemsPerPage: 0,
                                totalItems: 0
                            });
                        });
                        service.change('default', updatedPagination);
                    });
                });
            });
            describe('isFirstPage', function () {
                it('should accept first page as first page', function () {
                    return setup("<md-pagination-controls [model]=\"page1\"></md-pagination-controls>").then(function (api) {
                        expect(api.comp.isFirstPage()).toBeTruthy();
                    });
                });
                it('should not accept second page as first page', function () {
                    return setup("<md-pagination-controls [model]=\"page2\"></md-pagination-controls>").then(function (api) {
                        expect(api.comp.isFirstPage()).toBeFalsy();
                    });
                });
            });
            describe('isLastPage', function () {
                it('should accept third page as last page', function () {
                    return setup("<md-pagination-controls [model]=\"page3\"></md-pagination-controls>").then(function (api) {
                        expect(api.comp.isLastPage()).toBeTruthy();
                    });
                });
                it('should not accept second page as last page', function () {
                    return setup("<md-pagination-controls [model]=\"page2\"></md-pagination-controls>").then(function (api) {
                        expect(api.comp.isLastPage()).toBeFalsy();
                    });
                });
            });
            describe('previousPage', function () {
                it('should call change of page to previous one', function () {
                    return setup("<md-pagination-controls [model]=\"page2\"></md-pagination-controls>").then(function (api) {
                        spyOn(api.comp, 'changePage');
                        api.comp.previousPage();
                        expect(api.comp.changePage).toHaveBeenCalledWith(1);
                    });
                });
            });
            describe('nextPage', function () {
                it('should call change of page to previous one', function () {
                    return setup("<md-pagination-controls [model]=\"page2\"></md-pagination-controls>").then(function (api) {
                        spyOn(api.comp, 'changePage');
                        api.comp.nextPage();
                        expect(api.comp.changePage).toHaveBeenCalledWith(3);
                    });
                });
            });
            describe('changePage', function () {
                var service;
                beforeEach(testing_1.inject([index_1.PaginationService], function (serv) {
                    service = serv;
                    spyOn(service, 'change');
                }));
                it('should dispatch the new current page to the service', function () {
                    return setup("<md-pagination-controls [model]=\"page2\"></md-pagination-controls>").then(function (api) {
                        api.comp.changePage(1);
                        expect(service.change).toHaveBeenCalledWith('default', {
                            currentPage: 1,
                            itemsPerPage: 30,
                            totalItems: 65
                        });
                    });
                });
            });
        });
        util_1.componentSanityCheck('MdPaginationItemsPerPage', 'md-pagination-items-per-page', "<md-pagination-items-per-page></md-pagination-items-per-page>");
        describe('MdPaginationItemsPerPage', function () {
            var TestComponent = (function () {
                function TestComponent() {
                    this.page1 = {
                        currentPage: 1,
                        itemsPerPage: 30,
                        totalItems: 65
                    };
                    this.page2 = {
                        currentPage: 2,
                        itemsPerPage: 30,
                        totalItems: 65
                    };
                    this.defaultItemsPerPageOptions = [10, 50, 100];
                }
                TestComponent = __decorate([
                    core_1.Component({
                        selector: 'test-app',
                        directives: [common_1.CORE_DIRECTIVES, index_1.MdPaginationItemsPerPage],
                        template: "<md-pagination-items-per-page></md-pagination-items-per-page>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TestComponent);
                return TestComponent;
            }());
            function setup(template) {
                if (template === void 0) { template = null; }
                var prep = template === null ?
                    builder.createAsync(TestComponent) :
                    builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
                return prep.then(function (fixture) {
                    var debug = fixture.debugElement.query(platform_browser_1.By.css('md-pagination-items-per-page'));
                    var comp = debug.componentInstance;
                    fixture.detectChanges();
                    return {
                        fixture: fixture,
                        comp: comp,
                        debug: debug
                    };
                }).catch(console.error.bind(console));
            }
            describe('default values', function () {
                it('should have a default model', function () {
                    return setup().then(function (api) {
                        expect(api.comp.model.currentPage).toEqual(0);
                        expect(api.comp.model.itemsPerPage).toEqual(0);
                        expect(api.comp.model.totalItems).toEqual(0);
                    });
                });
                it('should accept custom model', function () {
                    return setup("<md-pagination-items-per-page [model]=\"page2\"></md-pagination-items-per-page>").then(function (api) {
                        expect(api.comp.model.currentPage).toEqual(2);
                        expect(api.comp.model.itemsPerPage).toEqual(30);
                        expect(api.comp.model.totalItems).toEqual(65);
                    });
                });
                it('should have a default name', function () {
                    return setup().then(function (api) {
                        expect(api.comp.name).toEqual('default');
                    });
                });
                it('should accept a custom name', function () {
                    return setup("<md-pagination-items-per-page name=\"book\"></md-pagination-items-per-page>").then(function (api) {
                        expect(api.comp.name).toEqual('book');
                    });
                });
                it('should have a default prepended string', function () {
                    return setup().then(function (api) {
                        expect(api.comp.itemsPerPageBefore).toEqual('Rows per page:');
                    });
                });
                it('should accept a custom prepended string', function () {
                    return setup("<md-pagination-items-per-page items-per-page-before=\"Items per page:\"></md-pagination-items-per-page>").then(function (api) {
                        expect(api.comp.itemsPerPageBefore).toEqual('Items per page:');
                    });
                });
                it('should not have a default appended string', function () {
                    return setup().then(function (api) {
                        expect(api.comp.itemsPerPageAfter).toBeUndefined();
                    });
                });
                it('should accept a custom appended string', function () {
                    return setup("<md-pagination-items-per-page items-per-page-after=\" - \"></md-pagination-items-per-page>").then(function (api) {
                        expect(api.comp.itemsPerPageAfter).toEqual(' - ');
                    });
                });
                it('should have a empty list of options for items per page', function () {
                    return setup().then(function (api) {
                        expect(api.comp.itemsPerPageOptions).toEqual([]);
                    });
                });
                it('should accept a custom list of options for items per page', function () {
                    return setup("<md-pagination-items-per-page [items-per-page-options]=\"defaultItemsPerPageOptions\"></md-pagination-items-per-page>").then(function (api) {
                        expect(api.comp.itemsPerPageOptions).not.toContain(5);
                        expect(api.comp.itemsPerPageOptions).toContain(10);
                        expect(api.comp.itemsPerPageOptions).toContain(50);
                        expect(api.comp.itemsPerPageOptions).toContain(100);
                    });
                });
            });
            describe('construct', function () {
                var service, updatedPagination = {
                    currentPage: 1,
                    itemsPerPage: 30,
                    totalItems: 65
                };
                beforeEach(testing_1.inject([index_1.PaginationService], function (serv) {
                    service = serv;
                }));
                it('should listen PaginationService', function () {
                    return setup().then(function (api) {
                        service.onChange.subscribe(function (event) {
                            expect(api.comp.model).toEqual(updatedPagination);
                        });
                        service.change('default', updatedPagination);
                    });
                });
                it('should listen PaginationService only for his reference name', function () {
                    return setup("<md-pagination-items-per-page name=\"book\"></md-pagination-items-per-page>").then(function (api) {
                        service.onChange.subscribe(function () {
                            expect(api.comp.model.currentPage).toEqual(0);
                            expect(api.comp.model.itemsPerPage).toEqual(0);
                            expect(api.comp.model.totalItems).toEqual(0);
                        });
                        service.change('default', updatedPagination);
                    });
                });
            });
            describe('changePaginationLength', function () {
                var service;
                beforeEach(testing_1.inject([index_1.PaginationService], function (serv) {
                    service = serv;
                    spyOn(service, 'change');
                }));
                it('should dispatch page change to the service and reset to first page', function () {
                    return setup("<md-pagination-items-per-page [model]=\"page2\"></md-pagination-items-per-page>").then(function (api) {
                        api.comp.changePaginationLength(50);
                        expect(service.change).toHaveBeenCalledWith('default', {
                            currentPage: 1,
                            itemsPerPage: 50,
                            totalItems: 65
                        });
                    });
                });
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=pagination_spec.js.map