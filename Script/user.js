
// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display cart items on the page
const cartItemsContainer = document.getElementById('cart-items');
const cartSummaryContainer = document.getElementById('cart-summary');
const paymentDetails = document.getElementById('payment-details');
const creditCardDetails = document.getElementById('credit-card-details');
const googlePayDetails = document.getElementById('google-pay-details');
const phonePeDetails = document.getElementById('phonepe-details');

function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';  // Clear existing content
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500">Your cart is empty.</p>';
        cartSummaryContainer.innerHTML = '';  // Clear total price when cart is empty
    } else {
        let totalPrice = 0;

        cart.forEach((item, index) => {
            totalPrice += parseFloat(item.price);

            const cartItem = document.createElement('div');
            cartItem.classList.add('bg-white', 'shadow', 'p-4', 'rounded-lg');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="w-full h-32 object-cover mb-4">
                <h3 class="text-lg font-semibold text-gray-800">${item.title}</h3>
                <p class="text-gray-600">Price: $${item.price}</p>
                <div class="flex space-x-4 mt-4">
                    <button class="bg-red-500 text-white px-4 py-2 rounded" onclick="removeItem(${index})">Remove</button>
                    <button class="bg-yellow-500 text-white px-4 py-2 rounded" onclick="saveForLater(${index})">Save for Later</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Update cart summary
        cartSummaryContainer.innerHTML = `
            <div class="bg-gray-100 p-4 rounded-lg">
                <h4 class="text-lg font-semibold text-gray-700">Total Price: $${totalPrice.toFixed(2)}</h4>
                <button class="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4" onclick="showAddressModal()">Place Order</button>
            </div>
        `;
    }
}

// Show Address Modal
function showAddressModal() {
    document.getElementById('address-modal').style.display = "flex";
}

// Show Payment Modal
function showPaymentModal() {
    // Hide address modal and show payment modal
    document.getElementById('address-modal').style.display = "none";
    document.getElementById('payment-modal').style.display = "flex";
}

// Show Order Summary Modal
function showOrderSummary() {
    // Hide payment modal and show order summary modal
    document.getElementById('payment-modal').style.display = "none";
    document.getElementById('order-summary-modal').style.display = "flex";

    // Prepare order summary
    const buildingName = document.getElementById('building-name').value;
    const city = document.getElementById('city').value;
    const place = document.getElementById('place').value;
    const pincode = document.getElementById('pincode').value;
    const district = document.getElementById('district').value;
    const state = document.getElementById('state').value;
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
    const paymentMethodValue = selectedPaymentMethod.value;

    let totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);

    const orderSummaryContent = `
        <h3 class="font-semibold">Delivery Address:</h3>
        <p>${buildingName}, ${place}, ${city}, ${district}, ${state}, ${pincode}</p>
        <h3 class="font-semibold mt-4">Payment Method:</h3>
        <p>${paymentMethodValue.charAt(0).toUpperCase() + paymentMethodValue.slice(1)}</p>
        <h3 class="font-semibold mt-4">Order Details:</h3>
        <ul>
            ${cart.map(item => `<li>${item.title} - $${item.price}</li>`).join('')}
        </ul>
        <h3 class="font-semibold mt-4">Total Price: $${totalPrice.toFixed(2)}</h3>
    `;

    document.getElementById('order-summary-content').innerHTML = orderSummaryContent;
}

// Toggle payment details based on selected method
function togglePaymentDetails() {
    paymentDetails.classList.remove('hidden');
    creditCardDetails.classList.add('hidden');
    googlePayDetails.classList.add('hidden');
    phonePeDetails.classList.add('hidden');

    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (selectedPaymentMethod) {
        if (selectedPaymentMethod.value === 'credit-card') {
            creditCardDetails.classList.remove('hidden');
        } else if (selectedPaymentMethod.value === 'google-pay') {
            googlePayDetails.classList.remove('hidden');
        } else if (selectedPaymentMethod.value === 'phonepe') {
            phonePeDetails.classList.remove('hidden');
        }
    }
}

// Confirm Order
function confirmOrder() {
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!selectedPaymentMethod) {
        alert('Please select a payment method.');
        return;
    }

    const paymentMethodValue = selectedPaymentMethod.value;

    if (paymentMethodValue === 'credit-card') {
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        if (!cardNumber || !expiryDate || !cvv) {
            alert('Please fill out all credit card fields.');
            return;
        }
    }

    if (paymentMethodValue === 'google-pay') {
        const upiId = document.getElementById('upi-id').value;

        if (!upiId) {
            alert('Please enter your UPI ID.');
            return;
        }
    }

    if (paymentMethodValue === 'phonepe') {
        const phonepeId = document.getElementById('phonepe-id').value;

        if (!phonepeId) {
            alert('Please enter your PhonePe ID.');
            return;
        }
    }

    // Successful order placement
    alert('Your order has been placed successfully!');
    cart = [];  // Clear the cart
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();  // Update the cart display after clearing
    document.getElementById('order-summary-modal').style.display = "none"; // Hide order summary modal
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Save item for later
function saveForLater(index) {
    let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const item = cart.splice(index, 1)[0];  // Remove the item from the cart
    savedItems.push(item);  // Add it to saved items
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
    updateCartDisplay();
    alert(`${item.title} has been saved for later!`);
}

// Close address modal
document.getElementById('close-address-modal').addEventListener('click', () => {
    document.getElementById('address-modal').style.display = "none";
});

// Close payment modal
document.getElementById('close-payment-modal').addEventListener('click', () => {
    document.getElementById('payment-modal').style.display = "none";
});

// Close order summary modal
document.getElementById('close-order-summary-modal').addEventListener('click', () => {
    document.getElementById('order-summary-modal').style.display = "none";
});

// Initialize cart display





    // Sidebar toggle functionality
    function toggleSubMenu(menuId) {
        const submenu = document.getElementById(menuId);
        submenu.classList.toggle('hidden');
    }

    // Function to toggle between views
    function showContent(contentId) {
        const contentSections = ['profileContent', 'cartContent', 'manageAddressContent', 'giftCardsContent', 'savedUPIContent', 'myCouponsContent', 'wishlistContent', 'reviewsContent', 'notificationsContent'];
        contentSections.forEach(section => {
            document.getElementById(section).classList.add('hidden');
        });
        document.getElementById(contentId).classList.remove('hidden');
    }

    // Event listeners to switch content
    document.getElementById('viewCart').addEventListener('click', () => showContent('cartContent'));
    document.getElementById('editProfile').addEventListener('click', () => showContent('profileContent'));

    // Edit Profile functionality
    const editPersonalBtn = document.getElementById('editPersonalBtn');
    const editEmailBtn = document.getElementById('editEmailBtn');
    const editMobileBtn = document.getElementById('editMobileBtn');
    const saveChangesBtn = document.getElementById('saveChangesBtn');

    const personalFields = [document.getElementById('firstName'), document.getElementById('lastName')];
    const emailField = document.getElementById('email');
    const mobileField = document.getElementById('mobile');

    function enableEditing(fields) {
        fields.forEach(field => {
            field.removeAttribute('readonly');
            field.classList.add('editable');
        });
        saveChangesBtn.style.display = 'inline-block';
    }

    editPersonalBtn.addEventListener('click', () => {
        enableEditing(personalFields);
    });

    editEmailBtn.addEventListener('click', () => {
        enableEditing([emailField]);
    });

    editMobileBtn.addEventListener('click', () => {
        enableEditing([mobileField]);
    });

    saveChangesBtn.addEventListener('click', () => {
        personalFields.concat(emailField, mobileField).forEach(field => {
            field.setAttribute('readonly', true);
            field.classList.remove('editable');
        });
        saveChangesBtn.style.display = 'none';
        alert('Changes saved successfully!');
    });

    // Place Order functionality
    document.getElementById('placeOrderBtn').addEventListener('click', () => {
        alert('Order placed successfully!');
    });

    function addAddress() {
        const address = prompt("Enter new address:");
        if (address) {
            const addressList = document.getElementById("addressList");
            const newAddressDiv = document.createElement("div");
            newAddressDiv.classList.add("flex", "justify-between", "items-center", "border-b", "pb-2", "mb-2");
            newAddressDiv.innerHTML = `
                <span>${address}</span>
                <div>
                    <button class="text-blue-500" onclick="editAddress('${address}')">Edit</button>
                    <button class="text-red-500" onclick="removeAddress(this)">Remove</button>
                </div>
            `;
            addressList.appendChild(newAddressDiv);
        }
    }


    // function showContent(id) {
    //     document.querySelectorAll('main > div').forEach(div => div.classList.add('hidden'));
    //     document.getElementById(id).classList.remove('hidden');
    // }
    function editAddress(address) {
        const newAddress = prompt("Edit address:", address);
        if (newAddress) {
            const addressDiv = event.target.closest('div.flex');
            addressDiv.firstChild.textContent = newAddress;
        }
    }

    function removeAddress(button) {
        const addressDiv = button.closest('div.flex');
        addressDiv.remove();
    }

    // Saved UPI
    function addUPI() {
        const upi = prompt("Enter UPI ID:");
        if (upi) {
            const upiList = document.getElementById("upiList");
            const newUPIDiv = document.createElement("div");
            newUPIDiv.classList.add("flex", "justify-between", "items-center", "border-b", "pb-2", "mb-2");
            newUPIDiv.innerHTML = `
                <span>${upi}</span>
                <button class="text-red-500" onclick="removeUPI(this)">Remove</button>
            `;
            upiList.appendChild(newUPIDiv);
        }
    }

    function removeUPI(button) {
        const upiDiv = button.closest('div.flex');
        upiDiv.remove();
    }



    function removeCartItem(button) {
        const cartItem = button.closest('.flex.items-center'); // Find the closest cart item
        cartItem.remove(); // Remove the item
    }

    function saveForLater(button) {
        const cartItem = button.closest('.flex.items-center');
        alert('Saved for later!');
    }

    function updateTotalPrice() {
        const prices = document.querySelectorAll('.cart-item-price');
        let total = 0;
        prices.forEach(price => {
            total += parseFloat(price.textContent.replace('₹', ''));
        });
        document.getElementById('totalPrice').textContent = `₹${total}`;
    }
    showContent();
