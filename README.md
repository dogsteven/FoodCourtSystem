| Route | Method | Data | Config | Description | Result Type | 
| --- | --- | --- | --- | --- | --- |
| `/api/food-item` | `GET` | `null` | `null` | Get all food item | `{id:String,vendorID:String,name:String,price:Number,quantityNumbercategoriesString[]descriptionStringphotoStringratingNumberratingTimesNumber }[]` |
| `/api/manager/food-item/:vendorID` | `GET` | `null` | `null` | Get all food item by vendorID | `{ idStringvendorIDStringnameStringpriceNumberquantityNumbercategoriesString[]descriptionStringphotoStringratingNumberratingTimesNumber }[]` |
| `/api/manager/food-item/:username/:password` | `POST` | `{ nameStringpriceNumberquantityNumbercategoriesString[]descriptionStringphotoString }` | `headers"Content-Type""application/json"` | Create new food item | `{ statusBoolean[idString] }` |
| `/api/manager/food-item/:username/:password/:id` | `PUT` | `{ nameStringpriceNumbercategoriesString[]descriptionStringphotoString }` | `headers"Content-Type""application/json"` | Modify existing food item | `{ statusBoolean }` |
| `/api/manager/food-item/:username/:password/:id/increaseQuantity/:amount` | `PUT` | `null` | `null` | Increase quantity of food item by id | `{ statusBoolean }` |
| `/api/manager/food-item/:username/:password/:id` | `DELETE` | `null` | `null` | Delete existing food item by id | `{ statusBoolean }` |
| `/api/customer/:username/:password` | `GET` | `null` | `null` | Get customer account by username and password | `{ idStringusernameStringpasswordStringfirstnameStringlastnameStringemailStringregistrationTokensString[] }` |
| `/api/customer` | `POST` | `{ usernameStringpasswordStringfirstnameStringlastnameStringemailString }` | `headers"Content-Type""application/json"` | Create new customer account | `{ idString }?` |
| `/api/customer/:username/:password` | `PUT` | `{ passwordStringfirstnameStringlastnameStringemailString }` | `headers"Content-Type""application/json"` | Modify account infomation | `{ statusBoolean }` |
| `/api/customer/:username/:password`  | `DELETE` | `null` | `null` | Delete account | `{ statusBoolean }` |
| `/api/customer/:id/newRegistrationToken/:token` | `POST` | `null` | `null` | add new registration token to account by id | `{ statusBoolean }` |
