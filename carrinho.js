function addToCart(name, price, image) {
    const cart = document.getElementById("cartItems");
    let existingProduct = document.querySelector(`[data-name="${name}"]`);
  
    if (existingProduct) {
      // Incrementar quantidade
      const quantityElement = existingProduct.querySelector(".quantity");
      const quantity = parseInt(quantityElement.textContent);
      quantityElement.textContent = quantity + 1;
    } else {
      // Adicionar novo produto ao carrinho
      const productElement = document.createElement("div");
      productElement.className = "cart-item";
      productElement.setAttribute("data-name", name);
      productElement.innerHTML = `
        <img src="${image}" alt="${name}" class="cart-item-image">
        <div>
          <h5>${name}</h5>
          <p>$${price.toFixed(2)}</p>
          <div class="quantity-controls">
            <button onclick="decreaseQuantity(this)">-</button>
            <span class="quantity">1</span>
            <button onclick="increaseQuantity(this)">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeFromCart(this)">Remover</button>
      `;
      cart.appendChild(productElement);
    }
  
    updateCartTotal();
  }
  
  function updateCartTotal() {
    const cart = document.getElementById("cartItems");
    const items = cart.querySelectorAll(".cart-item");
    let total = 0;
  
    items.forEach(item => {
      const price = parseFloat(item.querySelector("p").textContent.replace("$", ""));
      const quantity = parseInt(item.querySelector(".quantity").textContent);
      total += price * quantity;
    });
  
    document.getElementById("totalAmount").textContent = `$${total.toFixed(2)}`;
  }
  
  function increaseQuantity(button) {
    const quantityElement = button.previousElementSibling;
    quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
    updateCartTotal();
  }
  
  function decreaseQuantity(button) {
    const quantityElement = button.nextElementSibling;
    const quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
      quantityElement.textContent = quantity - 1;
    } else {
      button.closest(".cart-item").remove();
    }
    updateCartTotal();
  }
  
  function removeFromCart(button) {
    button.closest(".cart-item").remove();
    updateCartTotal();
  }
  