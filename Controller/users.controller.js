const connectL = require('./connect');

app.post('/myaction', function (req, res) {
    const post = [req.body.name, req.body.age]
    //const sql_insert = "INSERT INTO webitclo_teste.`9170448` VALUES ('"+req.body.name+"','"+ req.body.age+"');";
    const sql_insert = "INSERT INTO webitclo_teste.`9170448` VALUES ($name, $age);";
    //const sql_select = "SELECT * FROM users WHERE user = $1 AND pass = $2";

    console.log(sql_insert);

    var a = connectL.con.query("INSERT INTO webitclo_teste.`9170448`(name, age) VALUES (?, ?)", post, function (err, result) {
    });
    console.log(a.sql)
    res.send('Name: "' + req.body.name + '" - Age: "' + req.body.age + '".');
});