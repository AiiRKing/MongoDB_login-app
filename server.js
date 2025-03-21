const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Use EJS for templating
app.use(express.static('public')); // Serve static files

// Session Management
app.use(session({
    secret: 'your-secret-key', // Change this to a random secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/loginApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
};

// Routes
app.get('/', (req, res) => {
    res.render('login'); // Render the login page
});

app.get('/register', (req, res) => {
    res.render('register'); // Render the registration page
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.redirect('/');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user; // Store user in session
        res.redirect('/landing'); // Redirect to landing page
    } else {
        res.send('Invalid username or password');
    }
});

app.get('/landing', isAuthenticated, (req, res) => {
    res.render('landing', { user: req.session.user }); // Render the landing page
});

app.get('/logout', (req, res) => {
    req.session.destroy(); // Destroy the session
    res.redirect('/');
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});