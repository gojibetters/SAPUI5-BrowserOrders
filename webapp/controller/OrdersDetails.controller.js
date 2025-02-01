sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/lab2dev/browserorders/model/models",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator, models, formatter) {
        "use strict";

        return Controller.extend("com.lab2dev.browserorders.controller.OrdersDetails", {
            formatter: formatter,

            onInit: function () {
                console.log('APENAS DETALHES')

            },

        });
    });