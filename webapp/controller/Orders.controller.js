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

        return Controller.extend("com.lab2dev.browserorders.controller.Orders", {
            formatter: formatter,

            onInit: function () {
                const oData = models.getODataModel()    

                oData.then((oModel) => {
                    oModel.read("/Orders", {
                        success: (aOrders) => {
                            const oModel = new JSONModel(aOrders.results)
                            this.getView().setModel(oModel, "orders")
                        },
                        error: (sError) => {
                            console.log(sError)
                        }
                    })
                })
            },

            onListItemPress: function (oEvent) {
                const orderTitle = oEvent.getSource().getProperty('title')
                const id = orderTitle.replace('Order ', '')

                const oData = models.getODataModel()

                oData.then((oModel) => {
                    oModel.read(`/Orders(${id})`, {
                        success: (aOrder) => {
                            const oModel = new JSONModel(aOrder)
                            this.getView().setModel(oModel, "specificOrder")
                            this.onPressNavToDetail()
                        },
                        error: (sError) => {
                            console.log(sError)
                        }
                    })
                })
            },

            onSearch: function (oEvent) {
                let aFilters = []
                let sQuery = oEvent.getSource().getValue()

                if (sQuery && sQuery.length > 0) {
                    let filter = new Filter("ShipName", FilterOperator.Contains, sQuery)

                    aFilters.push(filter)
                }

                const oList = this.byId("ordersList")
                const oBinding = oList.getBinding("items")
                oBinding.filter(aFilters)

            },
          
            onPressNavToDetail: function () {
                this.byId('splitApp').to(this.createId('details'))
            }
        });
    });