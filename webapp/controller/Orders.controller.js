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
                        urlParameters: {
                            "$expand": "Order_Details/Product,Employee"
                        },
                        success: (aOrder) => {
                            const TotalPrice = aOrder.Order_Details.results.reduce(
                                (acc, e) => acc + (e.UnitPrice * e.Quantity), 0)
                                .toFixed(2)

                            const oModel = new JSONModel({
                                ...aOrder,
                                Order_Details: aOrder.Order_Details.results,
                                TotalPrice
                            })

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
                let sQuery = oEvent.getSource().getValue()

                const itemsFromOrdersList = this.byId("ordersList").getBinding("items")

                if (!sQuery) return itemsFromOrdersList.filter([])

                itemsFromOrdersList.filter(
                    new Filter({
                        filters: [
                            new Filter("OrderID", FilterOperator.EQ, Number(sQuery)),
                            new Filter("ShipName", FilterOperator.Contains, sQuery)
                        ],
                        and: false
                    })
                )
            },

            onPressNavToDetail: function () {
                this.byId('splitApp').to(this.createId('details'))
            }
        });
    });