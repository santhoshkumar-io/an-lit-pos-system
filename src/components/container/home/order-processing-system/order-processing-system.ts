import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}
interface Order {
  orderId: string;
  customerName: string;
  mobileNumber: string;
  items: Product[];
  status: string;
  date: string;
  time: string;
  total: Number;
}
@customElement("order-processing-system")
export default class ProductManagement extends LitElement {
  static styles = css`
    label {
      font-weight: bold;
      margin-bottom: 5px;
      display: inline-block;
    }

    input,
    select,
    button {
      font-size: 1rem;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 100%;
      box-sizing: border-box;
    }

    button {
      background-color: #fff;
      color: #222;
      cursor: pointer;
      font-weight: bold;
      border: 1px solid #000000;
    }
    #view-orders {
      width: 8rem;
      font-size: 0.8rem;
      margin: 0;
    }
    #add-product,
    #place-order {
      background-color: black;
      color: #fff;
    }
    .container {
      max-width: 900px;
      margin: 0 auto 30px;
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }

    .add-product-wrap {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
    }

    .add-product {
      display: flex;
      flex-direction: column;
      width: 300px;
      padding: 20px;
      background-color: #fff;
    }

    .cart-table-wrapper {
      height: 250px;
      min-width: 350px;
      overflow-y: auto;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    .cart-table {
      width: 100%;
      border-collapse: collapse;
    }

    .cart-table th,
    .cart-table td {
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid #ddd;
      width: 50px;
    }

    .cart-table th {
      position: sticky;
      top: 0;
      background-color: #ff2d70;
      color: #fff;
    }
    .cart-table h5 {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 800;
    }
    .cart-total {
      font-size: 1.5rem;
      font-weight: bold;
      text-align: right;
      padding: 10px;
      background-color: #f0f8ff;
      border-radius: 5px;
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
    }

    .cart-total span {
      color: #333;
    }
    .cart-total span:first-child {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #5e5e5e;
    }
    .quantity-wrap {
      display: flex;
    }
    .quantity-wrap button {
      padding: 0 8px;

      background-color: #fff;
      color: #ff2d70;
      border: 1px solid #ff2d70;
      border-radius: 100%;
      cursor: pointer;
    }
    .quantity-wrap button:hover {
      color: #fff;
      background-color: #ff2d70;
      border: 1px solid #ff2d70;
    }
    .quantity-wrap span {
      display: flex;
      align-items: center;
      padding: 0 4px;
    }

    .remove-product {
      border: 1px solid #2c7dc9;
      background-color: #fff;
      color: #2c97c9;
      padding: 5px;
      font-size: 12px;
      border-radius: 3px;
      cursor: pointer;
    }
    .remove-product:hover {
      background-color: #fff;
    }

    .hidden {
      display: none;
    }
    .modal {
      position: fixed;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      color: green;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      justify-content: center;
      align-items: center;
    }
    .order-buttons-wrap {
      display: flex;
      gap: 20px;
      margin: 5px;
    }
    .message-container {
      position: fixed;
      top: 10%;
      right: -9%;
      transform: translateX(-50%);
      padding: 10px 20px;
      background-color: #f8d7da;
      color: #721c24;
      border-radius: 5px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      font-size: 16px;
      z-index: 999;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .error {
      color: red;
      font-size: 0.8rem;
    }
    .hidden {
      display: none;
    }
    .message-container.success {
      background-color: #d4edda;
      color: #155724;
    }

    .message-container.hidden {
      opacity: 0;
    }

    .message-container.show {
      opacity: 1;
    }
    .head-bar {
      display: flex;
      padding: 0 5%;
      justify-content: space-between;
      flex-direction: row;
      margin: 10px 0;
    }
  `;

  products: Product[] = [
    { id: 1, name: "Phone", price: 2000 },
    { id: 2, name: "E-Pen", price: 200 },
    { id: 3, name: "Headphones", price: 100 },
    { id: 4, name: "Speaker", price: 2000 },
    { id: 5, name: "Charger", price: 200 },
    { id: 6, name: "Microphone", price: 100 },
    { id: 7, name: "Watch", price: 2000 },
    { id: 8, name: "Keyboard", price: 200 },
    { id: 9, name: "Toy", price: 100 },
  ];
  @state() cart: Product[] = [];
  @state() total = 0;
  @state() orders: Order[] = [];

  addToCart(productId: string) {
    const selectedProduct = this.products.find(
      (product) => product.id === Number(productId)
    );
    if (!selectedProduct) return;

    let productExists = false;

    const updatedCart = this.cart.map((product) => {
      if (product.id === selectedProduct.id) {
        productExists = true;
        return { ...product, quantity: (product.quantity ?? 0) + 1 };
      }
      return product;
    });

    if (!productExists) {
      updatedCart.push({ ...selectedProduct, quantity: 1 });
    }

    this.cart = updatedCart;
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.cart.reduce(
      (sum, product) => sum + product.price * (product.quantity ?? 1),
      0
    );
  }
  handleAddToCart(event: Event) {
    event.preventDefault();
    const customerName = (
      this.shadowRoot?.querySelector("#customer-name") as HTMLInputElement
    ).value.trim();
    const mobileNumber = (
      this.shadowRoot?.querySelector("#mobile-number") as HTMLInputElement
    ).value.trim();
    const selectedId = (
      this.shadowRoot?.querySelector("#product-selector") as HTMLInputElement
    ).value;

    if (
      !customerName ||
      !/^[6-9]\d{9}$/.test(mobileNumber) ||
      selectedId === "select-default"
    ) {
      this.showMessage("Please complete all fields correctly.", "error");
      return;
    }

    this.addToCart(selectedId);
    this.disableFormFields();
  }
  handleRemoveProduct(event: Event) {
    const target = event.target as HTMLButtonElement;
    const productId = Number(target.dataset.id);

    if (!productId) return;

    this.cart = this.cart.filter((product) => product.id !== productId);

    this.total = this.cart.reduce(
      (sum, product) => sum + product.price * (product.quantity ?? 1),
      0
    );
  }
  handleQuantityChange(event: Event) {
    const target = event.target as HTMLButtonElement;
    const productId = Number(target.dataset.id);
    const action = target.dataset.action;
    if (!productId || !action) return;

    this.cart = this.cart
      .map((product) => {
        if (product.id === productId) {
          let newQuantity = product.quantity ?? 1;

          if (action === "increase") {
            newQuantity += 1;
          } else if (action === "decrease") {
            newQuantity -= 1;
          }

          if (newQuantity === 0) {
            return null;
          }

          return { ...product, quantity: newQuantity };
        }
        return product;
      })
      .filter(Boolean) as Product[];

    this.updateTotal();
  }
  disableFormFields() {
    (
      this.shadowRoot?.querySelector("#customer-name") as HTMLInputElement
    ).disabled = true;
    (
      this.shadowRoot?.querySelector("#mobile-number") as HTMLInputElement
    ).disabled = true;
  }
  enableFormField() {
    (
      this.shadowRoot?.querySelector("#customer-name") as HTMLInputElement
    ).disabled = false;
    (
      this.shadowRoot?.querySelector("#mobile-number") as HTMLInputElement
    ).disabled = false;
    (
      this.shadowRoot?.querySelector("#customer-name") as HTMLInputElement
    ).value = "";
    (
      this.shadowRoot?.querySelector("#mobile-number") as HTMLInputElement
    ).value = "";
    (
      this.shadowRoot?.querySelector("#product-selector") as HTMLInputElement
    ).value = "select-default";
  }
  handleCancelOrder() {
    this.cart = [];
    this.enableFormField();
    this.total = 0;
  }

  generateOrderNumber() {
    let orderId: string;
    do {
      orderId = Math.floor(100000 + Math.random() * 900000).toString();
    } while (this.orders.some((order) => order.orderId === orderId));
    return orderId;
  }
  placeOrder() {
    const customerNameInput = this.shadowRoot?.querySelector(
      "#customer-name"
    ) as HTMLInputElement | null;
    const mobileNumberInput = this.shadowRoot?.querySelector(
      "#mobile-number"
    ) as HTMLInputElement | null;

    if (!customerNameInput || !mobileNumberInput) {
      console.error("One or more input fields not found!");
      return;
    }

    const customerName: string = customerNameInput.value.trim();
    const mobileNumber: string = mobileNumberInput.value.trim();

    if (!customerName || !mobileNumber || this.cart.length === 0) {
      this.showMessage(
        "Please complete the order details before placing an order.",
        "error"
      );
      return;
    }

    const now = new Date();
    const orderDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(now);

    const orderTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newOrder: Order = {
      orderId: this.generateOrderNumber(),
      customerName,
      mobileNumber,
      items: [...this.cart],
      status: "Pending",
      date: orderDate,
      time: orderTime,
      total: this.total,
    };

    console.log("Orders", this.orders);
    this.orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(this.orders));
    this.cart = [];
    this.enableFormField();
    this.total = 0;
    this.showMessage("Order placed successfully!", "success");
  }

  sendDataToParent(data: any) {
    this.dispatchEvent(
      new CustomEvent("on-action", {
        detail: {
          type: data.detail.type,
        },
      })
    );
  }
  showMessage(message: string, type: "error" | "success" = "error") {
    const messageContainer = this.shadowRoot?.querySelector(
      "#message-container"
    ) as HTMLDivElement;
    const messageText = this.shadowRoot?.querySelector(
      "#message-text"
    ) as HTMLParagraphElement;

    if (!messageContainer || !messageText) return;

    messageText.textContent = message;
    messageContainer.classList.remove("hidden", "success", "error");
    messageContainer.classList.add(type, "show");

    setTimeout(() => {
      messageContainer.classList.remove("show");
    }, 3000);
  }
  validateCustomerName() {
    const customerNameInput = this.shadowRoot?.querySelector(
      "#customer-name"
    ) as HTMLInputElement;
    const nameError = this.shadowRoot?.querySelector(
      ".name.error"
    ) as HTMLElement;

    if (customerNameInput.value.trim() === "") {
      nameError.classList.remove("hidden");
    } else {
      nameError.classList.add("hidden");
    }
    this.validateForm();
  }

  validateMobileNumber() {
    const mobileNumberInput = this.shadowRoot?.querySelector(
      "#mobile-number"
    ) as HTMLInputElement;
    const mobileError = this.shadowRoot?.querySelector(
      ".mobile.error"
    ) as HTMLElement;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobileRegex.test(mobileNumberInput.value.trim())) {
      mobileError.classList.remove("hidden");
    } else {
      mobileError.classList.add("hidden");
    }
    this.validateForm();
  }

  validateProductSelection() {
    const productSelector = this.shadowRoot?.querySelector(
      "#product-selector"
    ) as HTMLSelectElement;

    if (productSelector.value === "select-default") {
      this.showMessage(
        "Please select a product before adding to cart.",
        "error"
      );
    }
    this.validateForm();
  }

  validateForm() {
    const customerName = (
      this.shadowRoot?.querySelector("#customer-name") as HTMLInputElement
    ).value.trim();
    const mobileNumber = (
      this.shadowRoot?.querySelector("#mobile-number") as HTMLInputElement
    ).value.trim();
    const productSelector = (
      this.shadowRoot?.querySelector("#product-selector") as HTMLSelectElement
    ).value;
    const addToCartButton = this.shadowRoot?.querySelector(
      "#add-product"
    ) as HTMLButtonElement;
    const mobileRegex = /^[6-9]\d{9}$/;

    const isFormValid =
      customerName !== "" &&
      mobileRegex.test(mobileNumber) &&
      productSelector !== "select-default";

    addToCartButton.disabled = !isFormValid;
  }

  sendDataToOrder($event: any) {
    $event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("on-action", {
        detail: {
          type: "orders",
        },
      })
    );
  }
  render() {
    return html`
      <div class="container">
        <div class="head-bar">
          <back-btn @on-action=${this.sendDataToParent}></back-btn>
          <button id="view-orders" @click=${this.sendDataToOrder}>
            View Orders
          </button>
        </div>
        <div class="add-product-wrap">
          <div class="left-content">
            <form class="add-product">
              <label for="customer-name">Customer Name</label>
              <input
                type="text"
                id="customer-name"
                required
                @input="${this.validateCustomerName}"
              />
              <p class="name error hidden">*Please enter the customer name.</p>

              <label for="mobile-number">Mobile Number</label>
              <input
                type="text"
                id="mobile-number"
                required
                @input="${this.validateMobileNumber}"
              />
              <p class="mobile error hidden">
                *Please enter a valid 10-digit mobile number.
              </p>

              <label for="product-selector">Select Product</label>
              <select
                id="product-selector"
                required
                @change="${this.validateProductSelection}"
              >
                <option value="select-default">-- Select product --</option>
                ${this.products.map((product: Product) => {
                  return html`<option value=${product.id}>
                    ${product.name}-${product.price}
                  </option>`;
                })}
              </select>

              <button
                id="add-product"
                @click="${this.handleAddToCart}"
                disabled
              >
                Add to Cart
              </button>

              <div id="message-container" class="message-container hidden">
                <p id="message-text"></p>
              </div>
            </form>
          </div>

          <div class="cart-container">
            <div class="cart-table-wrapper">
              <table class="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="cart-items">
                  ${this.cart.map((product) => {
                    return html`
                      <tr>
                        <td>${product.name}</td>
                        <td>
                          <div class="quantity-wrap">
                            <button
                              class="quantity-control"
                              data-id="${product.id}"
                              data-action="decrease"
                              @click="${this.handleQuantityChange}"
                            >
                              -
                            </button>
                            <span>${product.quantity}</span>
                            <button
                              class="quantity-control"
                              data-id="${product.id}"
                              data-action="increase"
                              @click="${this.handleQuantityChange}"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td><strong>₹${product.price}</strong></td>
                        <td>
                          <button
                            class="remove-product"
                            data-id="${product.id}"
                            @click="${this.handleRemoveProduct}"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    `;
                  })}
                </tbody>
              </table>
            </div>
            <div class="cart-total">
              <span>Sub Total: </span
              ><span id="total-price">₹${this.total}</span>
            </div>
            <div class="order-buttons-wrap">
              <button id="cancel-order" @click=${this.handleCancelOrder}>
                Cancel Order
              </button>
              <button id="place-order" @click=${this.placeOrder}>
                Place Order
              </button>
            </div>
          </div>
          <div id="order-modal" class="modal hidden">
            <p>Order Placed Successfully!</p>
          </div>
        </div>
      </div>
    `;
  }
}
