const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Set your allowed IP address here
const ALLOWED_IP = '10.20.178.93'; // Your local WiFi IP - both you and your friend are on this network

app.get('/', (req, res) => {
    const clientIP = req.headers['x-forwarded-for'] || 
                    req.headers['x-real-ip'] || 
                    req.connection.remoteAddress || 
                    req.socket.remoteAddress || 
                    req.ip;
    
    const cleanIP = clientIP.replace(/^::ffff:/, '').split(',')[0].trim();
    
    console.log(`Access attempt from IP: ${cleanIP}`);
    
    if (cleanIP === ALLOWED_IP) {
        res.send(`
            <html>
            <head>
                <title>Welcome</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        text-align: center; 
                        margin-top: 100px;
                        background: #f0f0f0;
                    }
                    h1 { color: #333; }
                </style>
            </head>
            <body>
                <h1>Hello idiot</h1>
            </body>
            </html>
        `);
    } else {
        res.send(`
            <html>
            <head>
                <title>Access Denied</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        text-align: center; 
                        margin-top: 100px;
                        background: #f0f0f0;
                    }
                    h1 { color: #ff0000; }
                    .info { margin-top: 20px; color: #666; }
                </style>
            </head>
            <body>
                <h1>IP configuration failed</h1>
                <div class="info">
                    <p>Your IP: ${cleanIP}</p>
                    <p>Allowed IP: ${ALLOWED_IP}</p>
                    <p>To access from WiFi, visit: http://10.20.178.93:3000</p>
                </div>
            </body>
            </html>
        `);
    }
});

// Add a route to show current IP
app.get('/ip', (req, res) => {
    const clientIP = req.headers['x-forwarded-for'] || 
                    req.headers['x-real-ip'] || 
                    req.connection.remoteAddress || 
                    req.socket.remoteAddress || 
                    req.ip;
    
    const cleanIP = clientIP.replace(/^::ffff:/, '').split(',')[0].trim();
    
    res.send(`
        <html>
        <head>
            <title>Your IP</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    text-align: center; 
                    margin-top: 100px;
                    background: #f0f0f0;
                }
                .ip { font-size: 24px; color: #007bff; margin: 20px 0; }
            </style>
        </head>
        <body>
            <h1>Your Current IP Address</h1>
            <div class="ip">${cleanIP}</div>
            <p>Allowed IP: ${ALLOWED_IP}</p>
            <p>To access the website from WiFi: <a href="http://10.20.178.93:3000">http://10.20.178.93:3000</a></p>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Allowed IP: ${ALLOWED_IP}`);
    console.log(`To access from WiFi: http://10.20.178.93:3000`);
}); 