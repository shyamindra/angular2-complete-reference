"use strict";
var common_1 = require("@angular/common");
var index_1 = require("../../index");
function main() {
    describe("Validators", function () {
        describe("MdPatternValidator", function () {
            it("should not error when pattern is found", function () {
                var v = index_1.MdPatternValidator.inline('[a-z]+');
                expect(v(new common_1.Control("abcd"))).toEqual(null);
            });
            it("should error when pattern is not found", function () {
                var v = index_1.MdPatternValidator.inline('[a-z]+');
                expect(v(new common_1.Control("1234"))).toEqual({ mdPattern: true });
            });
            it("should error when pattern is not found", function () {
                var v = index_1.MdPatternValidator.inline('[a-z]+');
                expect(v(new common_1.Control("1234"))).toEqual({ mdPattern: true });
            });
        });
        describe("MdNumberRequiredValidator", function () {
            var v = index_1.MdNumberRequiredValidator.inline();
            it("should not error when number is found", function () {
                expect(v(new common_1.Control(2))).toEqual(null);
            });
            it("should error when number is a string", function () {
                expect(v(new common_1.Control("1234"))).toEqual({ mdNumberRequired: true });
            });
            it("should error when given NaN", function () {
                expect(v(new common_1.Control(NaN))).toEqual({ mdNumberRequired: true });
            });
            it("should error when given nonsense values", function () {
                expect(v(new common_1.Control(null))).toEqual({ mdNumberRequired: true });
                expect(v(new common_1.Control(undefined))).toEqual({ mdNumberRequired: true });
                expect(v(new common_1.Control('sunset'))).toEqual({ mdNumberRequired: true });
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=validators_spec.js.map