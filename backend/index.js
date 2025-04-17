const express = require('express');
const app = express();
const cors = require('cors');
// const connectDB = require('./Mdpconnect/Mdponnector');
const connectDB = require('./MdpConnect/MdpConnector');  // This should match the exact folder and file names
const PORT = process.env.PORT;
const authRoutes = require('./Routing/Signin.js');

app.use(cors());
app.use(express.json());

connectDB();
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
