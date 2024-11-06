import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../Routers/adminRouter.js';


const secretKey = 'hello';


const ensureAdmin = async (req, res, next) => {
    const adminUserName = 'admin@123';
    const adminPassword = 'admin12';

    try {
        // Check if an admin user already exists
        const existingAdmin = await User.findOne({ userName: adminUserName });

        if (!existingAdmin) {
            // Create admin user if not found
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            const adminUser = new User({
                firstName: 'Dinsha',
                lastName: 'S',
                userName: adminUserName,
                password: hashedPassword,
                userRole: 'admin'
            });
            await adminUser.save();
            console.log("Admin user created");
        }

        next(); // Proceed if admin setup is complete or admin already exists
    } catch (error) {
        console.error("Error in admin setup:", error);
        res.status(500).json({ message: "Admin setup failed" });
    }
};

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.authToken; 
    // console.log(req.cookies.authToken);
    

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, secretKey); // Verify the token
        req.user = decoded; 
        console.log(req.user);
        
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.status(400).json({ message: "Invalid token" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.userRole === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Only admins can perform this action." });
    }
};
export {ensureAdmin,isAdmin,isLoggedIn} // Export the middleware
