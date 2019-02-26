const jsftp = require("jsftp");

const ftp = new jsftp({
  host: "61.174.50.176",
  port: 5455, // defaults to 21
//   user: "ygdy8", // defaults to "anonymous"
//   pass: "ygdy8" // defaults to "@anonymous"
});
// Ftp.auth(username, password, callback)
// ftp.list(".", (err, res) => {
//     console.log(res);
//     // Prints something like
//     // -rw-r--r--   1 sergi    staff           4 Jun 03 09:32 testfile1.txt
//     // -rw-r--r--   1 sergi    staff           4 Jun 03 09:31 testfile2.txt
//     // -rw-r--r--   1 sergi    staff           0 May 29 13:05 testfile3.txt
//     // ...
//   });
// ftp://ygdy8:ygdy8@yg76.dydytt.net:5455/[阳光电影-www.ygdy8.com]海贼王-857.mp4