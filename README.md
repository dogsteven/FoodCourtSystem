| Route | Method | Data | Config | Description | Result Type | 
| --- | --- | --- | --- | --- | --- |
| `/api/food-item` | `GET` | `null` | `null` | Get all food item | `{id:String,vendorID:String,name:String,price:Number,quantity:Number,categories:String[],description:String,photo:String,rating:Number,ratingTimes:Number}[]` |
| `/api/manager/food-item/:vendorID` | `GET` | `null` | `null` | Get all food item by vendorID | `{id:String,vendorID:String,name:String,price:Number,quantity:Number,categories:String[],description:String,photo:String,rating:Number,ratingTimes:Number}[]` |
| `/api/manager/food-item/:username/:password` | `POST` | `{name:String,price:Number,quantity:Number,categories:String[],description:String,photo:String}` | `headers:"Content-Type":"application/json"` | Create new food item | `{status:Boolean,[id:String]}` |
| `/api/manager/food-item/:username/:password/:id` | `PUT` | `{name:String,price:Number,categories:String[],description:String,photo:String}` | `headers:"Content-Type":"application/json"` | Modify existing food item | `{status:Boolean}` |
| `/api/manager/food-item/:username/:password/:id/increaseQuantity/:amount` | `PUT` | `null` | `null` | Increase quantity of food item by id | `{status:Boolean}` |
| `/api/manager/food-item/:username/:password/:id` | `DELETE` | `null` | `null` | Delete existing food item by id | `{status:Boolean}` |
| `/api/customer/:username/:password` | `GET` | `null` | `null` | Get customer account by username and password | `{id:String,username:String,password:String,firstname:String,lastname:String,email:String,registrationTokens:String[]}` |
| `/api/customer` | `POST` | `{username:String,password:String,firstname:String,lastname:String,email:String}` | `headers:"Content-Type":"application/json"` | Create new customer account | `{id:String}?` |
| `/api/customer/:username/:password` | `PUT` | `{password:String,firstname:String,lastname:String,email:String}` | `headers:"Content-Type":"application/json"` | Modify account infomation | `{status:Boolean}` |
| `/api/customer/:username/:password`  | `DELETE` | `null` | `null` | Delete account | `{status:Boolean}` |
| `/api/customer/:id/newRegistrationToken/:token` | `POST` | `null` | `null` | add new registration token to account by id | `{status:Boolean}` |
