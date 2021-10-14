# vkod4react


Run the code using the following command.

Observe the _‘Connected to MySQL Server!’_ message in the terminal.

If you have the latest MySQL server installed, you might end up getting an error saying the following.

```

{  
  code: 'ER\_NOT\_SUPPORTED\_AUTH\_MODE',  
  errno: 1251,  
  sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',  
  sqlState: '08004',  
  fatal: true  
}

```

To tackle this issue, create a new user in your MySQL server with **‘mysql\_native\_password’** authentication mechanisum.

Here is how you can do it quickly. First, log in to the MySQL server using root access.

Then run these commands one by one.

```

CREATE USER 'newuser'@'localhost' IDENTIFIED WITH 'mysql\_native\_password' BY 'newpassword';  
GRANT ALL PRIVILEGES ON \* . \* TO 'newuser'@'localhost';  
FLUSH PRIVILEGES;

```

In the code, pass the new credentials to connect to the MySQL server. Let’s proceed further.

## Pooling MySQL Connections

The code shown earlier is not meant for production use. It’s merely to get you started with Node and MySQL. In a production scenario, we must use connection pooling to improve the performance of MySQL and not overload the MySQL server with too many connections.

Let’s explain it with a simple example.

Consider the code shown below.

```

const express \= require("express");  
const app \= express();  
const mysql \= require('mysql');

const connection \= mysql.createConnection({  
  host     : 'localhost',  
  user     : 'username',  
  password : 'password',  
  database : 'databasename'  
});

connection.connect((err) \=> {  
    if(err) throw err;  
    console.log('Connected to MySQL Server!');  
});

app.get("/",(req,res) \=> {  
    connection.query('SELECT \* from users LIMIT 1', (err, rows) \=> {  
        if(err) throw err;  
        console.log('The data from users table are: \\n', rows);  
        connection.end();  
    });  
});

app.listen(3000, () \=> {  
    console.log('Server is running at port 3000');  
});

```

We are integrating _express_ module to create a web server. Install the module using the following command.

npm install --save express

We are creating a MySQL connection on every request coming from the user. Soon after getting multiple concurrent requests, the MySQL server will get overloaded and throw an error.

