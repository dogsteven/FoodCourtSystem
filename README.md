# Server application of FoodLine System
------
Hệ thống này hi vọng có thể tiết kiệm tối đa thời gian đặt đồ ăn cho các khách hàng có yêu cầu khắt khe về thời gian như những người chuyên chạy Deadline như nhóm chúng tôi :smile:

## About this project
> Chúng tôi hi vọng có thể tạo ra một phần mềm thân thiện với người dùng trong việc đặt đồ ăn tại các quán ăn trong hệ thống của một Food Court  mà trong project này chúng tôi lấy bối cảnh là hệ thống bán thức ăn đang được triển khai tại Trường Đại học Bách Khoa thành phố Hồ Chí Minh cơ sở Lý Thường Kiệt.

### Project này bao gồm tổng cộng 4 phần mềm:
* [Server](github.com/dogsteven/FoodCourtSystem)
* [User application](github.com/dogsteven/FoodCourt)
* [Phần mềm quản lý các các của hàng trong hệ thống](github.com/dogsteven/food-court-manager)
* [Phần mềm quản lý tại của hàng](github.com/dogsteven/food-court-management)
### Đây là phần mềm dành cho user
1. Các bước cài đặt project này
```bash
git clone github.com/dogsteven/FoodCourtSystem
cd FoodCourtSystem
npm install
npm audit fix
npm run build
sudo npm start
```
### Các API chúng tôi đã hiện thực
Để sữ dụng các service của hệ thống các bạn có thể tham  khảo các API sau đây:
| Route | Method | Data | Config | Description | Result Type | 
| --- | --- | --- | --- | --- | --- |
| `/api/vendor/` | `POST` | `name` |  | Create vendor |`{name:String,description:String}`|
| `/api/vendor/` | `PUT` | `data` |  | Update vendor |`{name:String,description:String}`|
| `/api/vendor/:username/:password` | `GET` | `{username:String, password:String}` |  | Xác thực thông tin chủ vendor |`{username:String, password:String, id:Number, name:String, description:String}`|
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
| `/api/vendor-owner/:username/:password`| `GET` | `null` | `null` | Get vendor owner account infomation by username and password | `{id:String,vendorID:String,username:String,password:String,firstname:String,lastname:String,email:String}` |
| `/api/vendor-owner/vendor/:vendorID`| `GET` | `{vendorID:String}` | `null` | Get vendor owner's information | `{id:String,vendorID:String,username:String,password:String,firstname:String,lastname:String,email:String}` |
| `/api/vendor-owner/vendor/:vendorID`| `POST` | `{vendorID:String}` | `null` | Create vendor owner | `{error:String, id:String}` |
| `/api/vendor-owner/vendor/:vendorID`| `DELETE` | `{vendorID:String}` | `null` | Delete vendor owner | `{status: boolean}` |
| `/api/rating/:customerID/:foodID`| `GET` | `{customerID:String, foodID:String}` | `null` | Get if a food is ranked | `{status: boolean}` |
| `/api/rating/:customerID/:foodID/:ratingScore`| `POST` | `{customerID:String, foodID:String, ratingScore:number}` | `null` | Rate a food | `{newRatingScore: number}` |
| `/api/order/:id`| `GET` | `{orderID:String}` | `null` | Get an order information | `{order:Order}` |
| `/api/order/taked/customer/:id`| `GET` | `{orderID:String}` | `null` | Confirm a order is taken by customer | `{order:Order}` |
| `/api/order`| `POST` | `{order:orer}` | `null` | Get order by customer ID | `{order:Order}` |
| `/api/manager/order/paid/:id`| `GET` | `{orderID:String}` | `null` | Paid for the order | `{status:Boolen}` |
| `/api/manager/order/cook/:vendorID'`| `GET` | `{vendorID:String}` | `null` | Get order to preparing progress | `{status:Boolean}` |
| `/api/manager/order/complete/:vendorID/:id`| `GET` | `{vendorID:String,id:String}` | `null` | Get order to completed state | `{status:Boolean}` |
| `/api/manager/order/take/:vendorID/:id`| `GET` | `{vendorID:String,id:String}` | `null` | Confirmed taken order by vendor-owner | `{status:Boolean}` |
| `/api/image-item/vendorID/:id`| `GET` | `{id:String}` | `null` | Get all image of vendor | `{image:Array}` |
| `/api/image-item/:id`| `GET` | `{id:String}` | `null` | Get image with specified ID | `{image:image}` |


> Cảm ơn đã quan tâm dự án này
