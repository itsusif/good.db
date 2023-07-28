## What is go.db ?

- go.db is a lightweight and easy-to-use Node.js library that enables developers to work with JSON files as a simple local database. It allows you to perform various database-like operations, such as setting, getting, adding, deleting, pushing, and pulling data from a JSON file.



## Installation

- You need to install the package on your project

```shell

npm install go.db

```

## Updates



-



## How To Use

```js

const { DataBaseJSON } = require("go.db");

const db = new DataBaseJSON('database.json', true, '..') // ("DATABASE_FILE", if you wanted enable/disable nested(..), if you wanted change separator default (..))
```

```js
// db.set(key "STRING", value "ANY", nested "BOOLEAN", separator "STRING")

db.set(`key`, value); // To Set a Data

db.set(`key..number`, 10, false); // => "key..number": 5

db.set(`key.age`, 5, true, '.'); // => "key": { "age": 5 }

db.set(`key..name`, 'joe'); // => "key": { "age": 5, "name": "joe" }

db.set(`key..array`, []); // => "key": { "age": 5, "name": "joe", "array": [] }

db.set(`key..other..work`, 'Programmer'); // => "key": { "age": 5, "name": "joe", "array": [] , "other": { "work": "Programmer" } }

```


```js
// db.get(key "STRING", nested "BOOLEAN", separator "STRING")

db.get('key'); // To Get The Data By Key

db.get(`key..number`, false); // => 10

db.get(`key.age`, true, '.'); // => 5

db.get(`key..name`); // => joe

db.get(`key..array`); // => []

db.get(`key..other..work`); // => Programmer
```

```js
// db.fetch(key "STRING", nested "BOOLEAN", separator "STRING")

db.fetch('key'); // To Get The Data By Key

db.fetch(`key..number`, false); // => 10

db.fetch(`key.age`, true, '.'); // => 5

db.fetch(`key..name`); // => joe

db.fetch(`key..array`); // => []

db.fetch(`key..other..work`); // => Programmer
```

```js
// db.add(key "STRING", value "NUMBER", nested "BOOLEAN", separator "STRING")

db.add('key', value); // To Add a Number

db.add('key..number', 5); // => 15;

db.add(`key.age`, 5, true, '.'); // => 10

db.add(`key..name`, 1); // => ERROR

db.add(`key..newnum`, 1); // => 1
```

```js
// db.subtract(key "STRING", value "NUMBER", nested "BOOLEAN", separator "STRING")

db.subtract('key', value); // To Subtract a Number

db.subtract('key..number', 5); // => 10;

db.subtract(`key.age`, 5, true, '.'); // => 5

db.subtract(`key..name`, 1); // => ERROR

db.subtract(`key..new_num`, 1); // => -1

```

```js
// db.push(key "STRING", value "ANY", nested "BOOLEAN", separator "STRING")

db.push('key', element); // To Push Element To Data

db.push('key..array', "Push", false); // "key..array": ["Push"]

db.push('key..array', "Push2", false); // "key..array": ["Push", "Push2"]

db.push('key..array', "Push3", false); // "key..array": ["Push", "Push2", "Push3"]

db.push('key.array', "Push 1", true, "."); // => "key": { "name": "joe", "number": 0, "array": ["Push 1"] };

db.push('key..array', "Push 2"); // => "key": { "name": "joe", "number": 0, "array": ["Push 1", "Push 2"] };

db.push('key..array', "Push 3"); // => "key": { "name": "joe", "number": 0, "array": ["Push 1", "Push 2", "Push 3"] };

db.push('key..array', 4); // => "key": { "name": "joe", "number": 0, "array": ["Push 1", "Push 2", "Push 3", 4] };
```

```js
// db.pull(key "STRING", callbackOrValue "STRING OR ARROW FUNCTION", pullAll "BOOLEAN", nested "BOOLEAN", separator "STRING")

db.pull('key', element); // To Pull Element From Data

db.pull('key..array', "Push", false, false); // "key": ["Push2", "Push3"]

db.pull('key..array', (element, index, array) => element, true, false); // "key": []

db.pull('key.array', "Push 1", false, true, "."); // => "key": { "name": "joe", "number": 0, "array": ["Push 2", "Push 3", 4] };

db.pull('key..array', (element, index, array) => element.array.includes("Push"), true); // => "key": { "name": "joe", "number": 0, "array": [4] };
```


```js
// db.has(key "STRING", nested "BOOLEAN", separator "STRING")

db.has('key'); // To Get True Or False

db.has('key'); // => true

db.hsd(`key..number..m`, false) // => false

db.delete(`key.age.n`, true, '.') // => false

db.delete(`key..name`) // => true

db.delete(`key..array`); // => true

db.delete(`key..other..work`) // => true
```


```js
// db.delete(key "STRING", nested "BOOLEAN", separator "STRING")

db.delete('key'); // To Delete Data By Key

db.delete(`key..number`, false) // => true

db.delete(`key.age`, true, '.') // => true

db.delete(`key..name`) // => true

db.delete(`key..array`); // => true

db.delete(`key..other..work`) // => true
```


```js
db.all(); // To Get All Data

// Exmaple => [ { ID: `test`, data: `Hello World` } ]
```


```js
db.reset(); // To Delete All Data
```



## Developer



- Developed By: [`Joe`](https://discord.com/users/833340407130882068)