"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ServiceAccount = {
  "type": "service_account",
  "project_id": "food-app-e9bf0",
  "private_key_id": "9bc5d0d29fdb3b708241a91e6ce9b33b4300c0fa",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCpZE+0Q5J2a1cF\nnDgMJ9UgIL/gTeXpc1Xuti0QEEO4Ou5xGs555lHxnoATxiSMhpQCXIt8KXLnPVTK\nhuhQbCIgvEX7oJiplOSn/2tWG6etLA9YYsjwHzPGQuWrwbqrjxHBQy9R0/3Tt+0O\nhmJay05gvYoKN5BlWIZXlFNCFZgRqrsUKnTgZIY3AGw+jJKKi+gYDVYm22ex6ZG7\n2Yi+Xp1DKyd9DsPrZdM67rI0D+N5AirE8lPuWJae9C78VlyCnStUYWDqNJm8xNz0\njLkdzvUkLS7+yCF4j5YvoYPKxjbaSpkn+70Nnd7DE99r0E7PviAz627P7WF1V7py\nIHmaUddNAgMBAAECggEAIlSOc8wTGbVw/lXWJR6IivmgMaNQAqOJqbbZxKzrMKIe\n86TZbmqvtl6nefp5K1LWGfFsIpaa70MmlWJIoI39z7EgpNn8PrhKrEKvnBTAQ7BP\njtv8ee/09AxYVFpPzRfSox7M7xJeGePnoz84nUqhgKlBWgc/WE7b8VGCGz1Zo9Co\nHjrGkWUoUvRxGcI4Jo/f0IOivSQbe/5vIOdtUxPedETA+N7XYJguYca5Uji+9VDa\nYQVAhiVjCUuIDTGDCXQAOceLy7vSsaIJlu/ELiJD810LsSnrBUk5t9erk6gUe2tN\nkl2R3YfqbZxXV2iVaMtgyZhUp9W1+B+vfVokcJgUcQKBgQDYvlzLvd6r6UhsCoru\n3gFhUIDa/EUEHd6fd6sAobx9RsU/gE3PTqqLjnfhwHSzffreQv404ntEOCm2pCAZ\nw95op+QcHgPg1RL9R1pa9klm1bw4oNq5CmA6dH8OKnE3oEWrJWhOOF39Ysjm6sD7\nCGr0FRVpCSfTPUFZsJ42IFv1EQKBgQDIEmoXUfOR12axaaJwHaiooGKgvrlvoJdz\nR2d8fpRJJH+EOTgo0k1VMfKpScaeGH4B7NRQUmdZFgcB41WK5IB7s7xiYeSNry8s\na7FLHlpsmUqSl4F/8MjdYUg37x7W8b8ZzAc4jlD91CISkm/KohPVBIUngd7LKU5j\n73NIPMBOfQKBgQCqrlXzF+U3KbEfa7n22xrpIHUofcp3sHH00E74Y2VEniuMkyQz\nIXbKCXo8a8s64fVhfA4lZUi+8x9eNacVwxns/nFy9uwE7KZUkBEGWrZ45c2gJoO3\nfgVDYyP+6stXi73xRbb7CgZyGI2u0qT/yqQ27Dd9DHmxLqa804nzg84GkQKBgGq6\nsA/KrwXBA85mzLnEiKGUFakstV2gLMrZb5JRMCeoqcHOiG/2aDynjYzTh3n1FNtQ\nDJ7gprM2dfyC2rJiXUwgQMG2+SbAKokm1gh9o71FNSvoWLP4rh6y88Sq8ie2BLzt\nQ3jfKsONs7N2nN5bAftkEuhVdpWobmIPbc8+YVQ9AoGBALcVN7PaDUKm23scqG7I\nMQ2z8I0CbnSdMz4waqIQIiwQLZutYkXpEYr0R9MnNCHnXldteUOjE3dDCbeYVeef\nsbsaMfnuAkYcte/YsRnMbpUhpWxyEaIkqz7CPuz3ipSp2GVFmvxLv5KfyoF4A4Bz\nbqooC73vH+Ky5AH7HMho6g4m\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-nmoyn@food-app-e9bf0.iam.gserviceaccount.com",
  "client_id": "112424115059344051522",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nmoyn%40food-app-e9bf0.iam.gserviceaccount.com"
};

_firebaseAdmin["default"].initializeApp({
  credential: _firebaseAdmin["default"].credential.cert(ServiceAccount),
  databaseURL: "https://food-app-e9bf0.firebaseio.com"
});

var _default = _firebaseAdmin["default"];
exports["default"] = _default;