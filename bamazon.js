var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user:"root",
    password:"",
    database:"bamazonDB"

});

connection.connect(function(err){
    if(err)throw err;
    console.log("connection successful!");

    makeTable();
});


function makeTable(){
    connection.query("SELECT * FROM products", function(err,res){
        for(var i=0; i<res.length; i++){
            console.log(res[i].itemid + " || " + res[i].production+ " || " + res[i].departmentname+
            " || " +res[i].price+" || "+res[i].stockquantity+"\n");
       
        }
        promptCustomer(res);
    })
}

function promptCustomer (res) {
    inquirer.prompt([{
        type:"input",
        name: "choice",
        message:"What would you like to purchase? [Quit with Q]"
    }]).then(function(answer){
        var correct = false;
        if(answer.choice.toUpperCase()=="Q"){
            process.exist();
        }
        for(var i=0;i<res.length;i++){
            if(res[i].productname==answer.choice){
                correct=true;
                var product=answer.choice;
                var id=i;
                inquirer.prompt({
                    type:"input",
                    name: "quantity",
                    message: "How many would you like to buy?",
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function(answer){
                    if((res[id].stockquantity-answer.quantity)>0){
                        connection.query("UPDATE products Set stockquantity='"
                        +(res[id].stockquantity-answer.quantity)+ "' WHERE productname='"+ product 
                        +"'", function(err,res2){
                            console.log("Product Bought!");
                            makeTable();
                        })
                    }else {
                        console.log("Not a valid selection!");
                        promptCustomer(res);
                    }
                
                    })
                }
            }
            if(i==res.length && correct==false){
                console.log("Not a valid selection!");
                promptCustomer(res);
            }
        })
    }

