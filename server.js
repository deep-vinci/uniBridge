const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

const users = {
    testUser: "123", // Example user
};

const sessions = {};

function generateSessionId() {
    return Math.random().toString(36).substring(2);
}


app.get('/', (req, res) => {

    console.log(req.ip);
    res.json({
        done: 1
    })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists and password matches
    if (users[username] && users[username] === password) {
        const sessionId = generateSessionId();

        sessions[sessionId] = username;
        // console.log(sessions);
        // Set a cookie that lasts for 1 week
        res.cookie('sessionId', sessionId, { maxAge: 7 * 24 * 60 * 60 * 1000 , sameSite: 'None', secure: true });

        res.json({ success: true, message: 'Logged in!', session: sessions });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

});

app.get('/dashboard', (req, res) => {
    const sessionId = req.cookies;
    console.log(sessionId.sessionId)
    // if (sessions[sessionId]) {
    //     return res.json({ success: true, message: `Welcome back, ${sessions[sessionId]}!` });
    // }

    // return res.status(401).json({ success: false, message: 'Please log in' });
    
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
