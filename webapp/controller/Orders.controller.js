sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/lab2dev/browserorders/model/models",
    "../model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, models, formatter) {
        "use strict";

        return Controller.extend("com.lab2dev.browserorders.controller.Orders", {
            formatter: formatter,

            onInit: function () {
                const oData = models.getODataModel()    

                oData.then((oModel) => {
                    oModel.read("/Orders", {
                        success: (aOrders) => {
                            const oModel = new JSONModel({
                                Orders: aOrders.results,
                            })
                            this.getView().setModel(oModel)
                        },
                        error: (sError) => {
                            console.log(sError)
                        }
                    })
                })
            }
        });
    });