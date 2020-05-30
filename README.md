# Food Court System
## Lưu ý
1. Viết code trong thư mục `src` và không làm gì ngoài thư mục này.
2. File `api-controller.js` là file gồm các hàm handle các request đến API, chú ý.
3. Muốn dùng database, làm ơn `import FirebaseAmin from 'path/to/configurated-firebase.js'`, đừng ngu mà import từ `firebase-admin`
4. Nhớ comment parameter type.
5. Làm ơn khi dùng database thì đừng đụng vào những `ref` của người khác, các `ref` được dùng sẽ được list ở đây:
```
Khoa: /Food, 
Long:
Khang:
Đạt:
```
6. Khi test server thì chạy:
```
$ npm run build
$ npm start
```