/*global QUnit*/

sap.ui.define([
	"comlab2dev/browserorders/controller/orders.controller"
], function (Controller) {
	"use strict";

	QUnit.module("orders Controller");

	QUnit.test("I should test the orders controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
