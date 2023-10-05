const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path =require("path")
const app = express();
const PORT = process.env.PORT || 3003;

// Define the target server where you want to redirect the requests
const targetServer = 'http://public.connectnow.org.uk/applicant-test/'; // Replace with your target server's URL

// Create a proxy middleware to forward requests to the target server
const proxyMiddleware = createProxyMiddleware({
  target: targetServer,
  changeOrigin: true, // This option allows changes to the "Host" header to match the target server
  // Additional configuration options can be added here if needed
});
app.use("/list-with-products",express.static(path.join(__dirname, '/list-with-products')))
app.use(express.static(path.join(__dirname, '/list-with-products')));
// Use the proxy middleware for all incoming requests
app.use('/api', proxyMiddleware);
app.use('/static', express.static(path.join(__dirname, 'dist')));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
