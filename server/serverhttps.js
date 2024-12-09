const express = require("express");
const bcrypt = require('bcryptjs');
const fileUpload = require("express-fileupload");
const productsRouter = require("./routes/products");
const productImagesRouter = require("./routes/productImages");
const categoryRouter = require("./routes/category");
const searchRouter = require("./routes/search");
const mainImageRouter = require("./routes/mainImages");
const userRouter = require("./routes/users");
const orderRouter = require("./routes/customer_orders");
const slugRouter = require("./routes/slugs");
const orderProductRouter = require('./routes/customer_order_product');
const wishlistRouter = require('./routes/wishlist');
const warrantiesRouter = require('./routes/warranties');
const supportTicketRouter = require('./routes/support_ticket');
const contactRouter = require('./routes/contact');
const deliverRouter = require('./routes/delivery');
const paymentRoutes = require("./routes/payment");


const https = require('https');
const path = require('path');
const fs = require('fs');
var cors = require("cors");

const app = express();

app.use(express.json());


app.use(cors());


const options = {
  //key: fs.readFileSync('/home/myzk/myzk/cert/myzk.key'),
  //cert: fs.readFileSync('/home/myzk/myzk/cert/myzk.crt'),

  key: fs.readFileSync('/etc/letsencrypt/live/myzk.in/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/myzk.in/fullchain.pem')
//  ca: fs.readFileSync('/home/myzk/myzk/cert/gd_bundle-g2-g1.crt'),
  //secureProtocol: 'TLS_method',  // Enforce modern TLS versions
 // honorCipherOrder: true,
};

// Create an HTTPS server
const server = https.createServer(options, app);

app.use(fileUpload());

app.use("/api/products", productsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/images", productImagesRouter);
app.use("/api/main-image", mainImageRouter);
app.use("/api/users", userRouter);
app.use("/api/search", searchRouter);
app.use("/api/orders", orderRouter);
app.use('/api/order-product', orderProductRouter);
app.use("/api/slugs", slugRouter);
app.use("/api/wishlist", wishlistRouter);
app.use('/api/warranties', warrantiesRouter);
app.use('/api/support-ticket', supportTicketRouter);
app.use('/api/contact', contactRouter);
app.use('/api/delivery', deliverRouter);
app.use("/api/payment", paymentRoutes);


const PORT = process.env.PORT || 3001;

server.listen(PORT,  () => {
  console.log(`Server running on port ${PORT}`);
});
