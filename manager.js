var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"

});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connection successful!");

    makeTable();
});



function makeTable() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("itemid\tproductname\tdepartmentname\tprice\tstockquantity");
        console.log("--------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].itemid + "\t" + res[i].productname + "\t" +
                res[i].departmentname + "\t" + res[i].price + "\t" + res[i].stockquantity);
        }
        console.log("---------------------");
        promptManager(); //issue with this 
    
    })


}



function promptManager(res) {
    inquirer.prompt([{
        type: "rawList",
        name: "choice",
        message: "What would you like to do?",
        choice: ['Add new item', 'Add quantity to an existing item']
    }]).then(function (val) {
        if (val.choice == "Add new item") {
            addItem();
        }
        if (val.choice == "Add quantity to an existing item") {
            addQuantity(res);
        }
    })

}
function addItem() {
    inquirer.prompt([{
        type: "input",
        name: "productname",
        message: "what is the name of the product?"
    }, {
        type: "input",
        name: "departmentname",
        message: "What department does this product fit into?"
    }, {
        type: "input",
        name: "price",
        message: "Price of item?"
    }, {
        type: "input",
        name: "stockquantity",
        message: "Quantity of item?"
    }]).then(function () {
        connection.query("INSERT * INTO products=(productname,departmentname,price,stockquantity) VALUES ('" + val.productname + "','" + val.departmentname + "','" + val.price + "','" + val.quantity + ");", function (err, res) {
            if (err) throw err;
            console.log(val.productname + "Added to Bamazon");
            makeTable();
        })

    })
}
 function addQuantity(){
     inquirer.prompt([{
         type:"input",
         name: "productname",
         message: "What product would you like to update?"
     },{
         type:"input",
         name: "added",
         message:"How much stock would you like to add?"

        }]).then(function(val) {
            for (var i = 0; i < res.length; i++){
                if (res[i].productname == val.productname) {
                    connection.query('UPDATE products SET stockquantity=stockquantity+' + val.
                        added + 'WHERE itemsid=' + res[i].itemid +
                        function (err, res) {
                            if (err) throw err;
                            if (res.affectedRows == 0) {
                                console.log("That item does not exist at this time. Try selecting a different item.");
                                makeTable();
                            } else {
                                console.log("Items have been added into your inventory");
                                makeTable();
                            }
                        })
                }
            }
        })
}
