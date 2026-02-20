
import http from 'http';
import fs from 'fs';

http.get('http://api.ipify.org', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('ip.txt', data);
        console.log("IP saved to ip.txt");
    });
}).on('error', (err) => {
    fs.writeFileSync('ip.txt', "Error fetching IP");
});
