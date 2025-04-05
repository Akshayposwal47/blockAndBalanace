document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const balloon = event.target.closest('.balloon');
            const price = parseInt(balloon.dataset.price, 10);
            const name = balloon.querySelector('p').textContent;

            // Add item to cart
            const listItem = document.createElement('li');
            listItem.textContent = name;
            cartItems.appendChild(listItem);

            // Update total price
            totalPrice += price;
            totalPriceElement.textContent = totalPrice;
        });
    });
});