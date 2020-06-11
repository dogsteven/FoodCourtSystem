import WebPush from 'web-push'

let publicKey = "BDtTHhaONeawAm3AAoUsMUnqxKA8YedNTbZp46YAxBDxycX3wdfqlsslB-n6ZQJn0OxYwBnPtJLXBi8BRuKVq24";
let privateKey = "EIeyLw2uFzeBS9Qh2l2aRRYf2t1yypNfrnIKFtvu20A"

WebPush.setVapidDetails("mailto:example@localhost", publicKey, privateKey)

export default WebPush