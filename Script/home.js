
        // Sample users database
        const users = [
            { email: "test@example.com", password: "password123", name: "Test User" },
            // if the user sign in the details will be stored here
        ];

        // Get the modal
        const modal = document.getElementById("authModal");

        // Get the button that opens the modal
        const btn = document.getElementById("login-btn");

        // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];

        // Get toggle buttons
        const showSignup = document.getElementById("show-signup");
        const showLogin = document.getElementById("show-login");
        const loginForm = document.getElementById("login-form");
        const signupForm = document.getElementById("signup-form");
        const userNameDisplay = document.getElementById("user-name-display");
        const userNameElement = document.getElementById("user-name");
        const dropdown = document.getElementById("dropdown");
        const messageElement = document.getElementById("message");

        // When the user clicks on the button, open the modal
        btn.onclick = function() {
            modal.style.display = "block";
            loginForm.classList.remove("hidden");
            signupForm.classList.add("hidden");
            messageElement.textContent = ""; // Clear any previous messages
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        // Toggle between Login and Sign Up
        showSignup.onclick = function() {
            loginForm.classList.add("hidden");
            signupForm.classList.remove("hidden");
            messageElement.textContent = ""; // Clear any previous messages
        }

        showLogin.onclick = function() {
            signupForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
            messageElement.textContent = ""; // Clear any previous messages
        }

        // Handle Login and Sign-Up form submissions
        loginForm.onsubmit = function(e) {
            e.preventDefault(); // Prevent default form submission
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            // Check if user exists and password matches
            const user = users.find(user => user.email === email);
            if (user) {
                if (user.password === password) {
                    modal.style.display = "none"; // Close the modal
                    userNameDisplay.textContent = user.name; // Display the username
                    userNameElement.classList.remove("hidden"); // Show the username element
                    document.getElementById("login-btn").classList.add("hidden"); // Hide login button
                } else {
                    messageElement.textContent = "Incorrect password.";
                }
            } else {
                messageElement.textContent = "Email does not exist.";
            }
        }

        signupForm.onsubmit = function(e) {
            e.preventDefault(); // Prevent default form submission
            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            // Check if email already exists
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                messageElement.textContent = "Email already exists.";
            } else {
                // Add the new user
                users.push({ email, password, name });
                messageElement.textContent = "Registration successful. You can now log in.";
                signupForm.classList.add("hidden");
                loginForm.classList.remove("hidden");
            }
        }

        // Handle username click to toggle dropdown visibility
        userNameElement.onclick = function() {
            dropdown.classList.toggle("hidden");
        }

        // Logout functionality
        document.getElementById("logout").onclick = function() {
            userNameElement.classList.add("hidden"); // Hide username
            document.getElementById("login-btn").classList.remove("hidden"); // Show login button
            dropdown.classList.add("hidden"); // Hide dropdown
            userNameDisplay.textContent = ''; // Clear username
        }


        //add product to the website

        function displayProducts() {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const productsGrid = document.getElementById('products-grid');
            productsGrid.innerHTML = ''; // Clear previous products

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'bg-white shadow-lg rounded-lg p-4';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class=" ml-16  rounded">
                    <h3 class="text-lg font-semibold text-gray-800 mt-2">${product.name}</h3>
                    <p class="text-gray-600">${product.description}</p>
                    <span class="text-red-600 font-bold">$${product.price}</span>
                    <div class="text-green-600">${product.offers}</div>
                   
                `;
                productsGrid.appendChild(productCard);
            });
        }
        window.onload = displayProducts;

        AOS.init();
  
    