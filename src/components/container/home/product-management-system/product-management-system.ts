import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

interface Product {
  id: number;
  name: string;
  price: number;
  discountedPrice: null | number;
}

@customElement("product-management-system")
export default class ProductManagement extends LitElement {
  static styles = css`
    h3 {
      color: #777;
    }

    .form,
    .actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    .field-wrap {
      width: 100%;
      max-width: 400px;
      margin-bottom: 10px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #444;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }

    button {
      padding: 10px 20px;
      background-color: #55c464;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s ease-in-out;
    }

    button:hover {
      background-color: #46b929;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .button-group {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .table-section {
      margin-left: 120px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    th,
    td {
      padding: 12px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #5d93b8;
      color: white;
      position: sticky;
      top: 0;
    }

    tr:hover {
      background-color: #c4e3f865;
    }

    .actions {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin: 0 0 30px;
      flex-direction: row;
    }

    .actions button {
      font-size: 16px;
    }

    #discounted-products-section {
      display: none;
    }

    .warning-message {
      width: 100%;
      max-width: 400px;
      margin-top: 15px;
      padding: 10px;
      color: #d9534f;
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
      border-radius: 5px;
      display: none;
    }
    .products-wrap {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
    .form-container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      background-color: #fff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      margin-bottom: 40px;
      max-width: 500px;
      width: 100%;
    }
    .update-btn,
    .update-btn:hover {
      background-color: #fff;
      color: #007bff;
      border: 1px solid #007bff;
      font-size: 12px;
      padding: 8px 14px;
    }
    .discount-input {
      width: 200px;
      padding: 8px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 10px;
    }

    .warning-message {
      margin-top: 10px;
      padding: 10px;
      border-radius: 5px;
      display: none;
      text-align: center;
    }

    .warning-message.error {
      background-color: #f8d7da;
      color: #842029;
      border: 1px solid #f5c6cb;
    }

    .warning-message.success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    #discount {
      width: 150px;
    }
    .scroll-table {
      margin: 10px 0;
      height: 350px;
      overflow-y: auto;
    }

    .footer {
      background-color: #222;
      color: white;
      text-align: center;
      padding: 15px;
      margin-top: 12px;
    }
    .footer p {
      margin: 0;
      font-size: 0.9rem;
    }
    .wrapper {
      display: flex;
      gap: 20px;
      flex-direction: column;
    }
  `;

  @property({ type: Array })
  products: Product[] = [
    { id: 1, name: "Screwdriver", price: 10.5, discountedPrice: null },
    { id: 2, name: "Hammer", price: 12.75, discountedPrice: null },
    { id: 3, name: "Wrench", price: 15.0, discountedPrice: null },
    { id: 44, name: "Screwdriver", price: 10.5, discountedPrice: null },
    { id: 33, name: "Hammer", price: 12.75, discountedPrice: null },
    { id: 55, name: "Wrench", price: 15.0, discountedPrice: null },
  ];

  @property({ type: Boolean }) isUpdating = false;
  @property({ type: Number }) updatingProductId: number | null = null;
  handleAddProduct() {
    const idInput = this.shadowRoot?.querySelector("#id") as HTMLInputElement;
    const nameInput = this.shadowRoot?.querySelector(
      "#name"
    ) as HTMLInputElement;
    const priceInput = this.shadowRoot?.querySelector(
      "#price"
    ) as HTMLInputElement;

    const id = Number(idInput.value);
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);

    if (!id || !name || !price) {
      this.showError("All fields are required!");
      return;
    }

    if (this.products.some((p) => p.id === id)) {
      this.showError("Product ID already exists!");
      return;
    }
    const newProduct: Product = { id, name, price, discountedPrice: null };
    this.products = [...this.products, newProduct];

    idInput.value = "";
    nameInput.value = "";
    priceInput.value = "";

    this.showSuccess("Product added successfully!");

    console.log(this.products);
  }
  handleUpdateProduct() {
    const idInput = this.shadowRoot?.querySelector("#id") as HTMLInputElement;
    const nameInput = this.shadowRoot?.querySelector(
      "#name"
    ) as HTMLInputElement;
    const priceInput = this.shadowRoot?.querySelector(
      "#price"
    ) as HTMLInputElement;
    const id = parseInt(idInput.value);
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);

    if (!name || !price) {
      this.showError("All fields are required!");
      return;
    }

    const product = this.products.find((p) => p.id === id);
    if (!product) {
      this.showError("Product not found!");

      return;
    }
    product.name = name;
    product.price = price;
    product.discountedPrice = null;

    idInput.value = "";
    nameInput.value = "";
    priceInput.value = "";
    idInput.disabled = false;
    this.isUpdating = false;
    this.updatingProductId = null;

    (
      this.shadowRoot?.querySelector("#update-product") as HTMLButtonElement
    ).style.display = "none";
    (
      this.shadowRoot?.querySelector("#add-product") as HTMLButtonElement
    ).disabled = false;
    this.showSuccess("Product updated successfully!");
  }
  handleApplyDiscount() {
    const discountInput = this.shadowRoot?.querySelector(
      "#discount"
    ) as HTMLInputElement;
    if (!discountInput) return;

    const discount = parseFloat(discountInput.value);

    if (isNaN(discount) || discount < 0 || discount > 100) {
      return;
    }

    this.products = this.products.map((product) => ({
      ...product,
      discountedPrice: product.price - (product.price * discount) / 100,
    }));

    (
      this.shadowRoot?.querySelector(
        "#discounted-products-section"
      ) as HTMLElement
    ).style.display = "block";
  }

  private handleUpdate(productId: number): void {
    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      this.showError("Product not found!");
      return;
    }
    const idInput = this.shadowRoot?.querySelector("#id") as HTMLInputElement;
    const nameInput = this.shadowRoot?.querySelector(
      "#name"
    ) as HTMLInputElement;
    const priceInput = this.shadowRoot?.querySelector(
      "#price"
    ) as HTMLInputElement;
    const updateProductBtn = this.shadowRoot?.querySelector(
      "#update-product"
    ) as HTMLButtonElement;
    const addProductBtn = this.shadowRoot?.querySelector(
      "#add-product"
    ) as HTMLButtonElement;

    if (
      !idInput ||
      !nameInput ||
      !priceInput ||
      !updateProductBtn ||
      !addProductBtn
    )
      return;

    idInput.value = product.id.toString();
    nameInput.value = product.name;
    priceInput.value = product.price.toString();

    idInput.disabled = true;
    this.isUpdating = true;
    this.updatingProductId = productId;

    updateProductBtn.style.display = "block";
    addProductBtn.disabled = true;
  }
  showMessage(message: string, type: "success" | "error") {
    const messageBox = this.shadowRoot?.querySelector(
      "#warning-message"
    ) as HTMLElement | null;
    if (!messageBox) return;

    messageBox.textContent = message;
    messageBox.className = `warning-message ${type}`; // Apply either success or error styling
    messageBox.style.display = "block";

    setTimeout(() => {
      messageBox.style.display = "none";
    }, 3000);
  }

  showSuccess(message: string) {
    this.showMessage(message, "success");
  }

  showError(message: string) {
    this.showMessage(message, "error");
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
  render() {
    return html`
      <div class="wrapper">
        <back-btn @on-action=${this.sendDataToParent}></back-btn>

        <div class="products-wrap">
          <div class="form-container">
            <form id="product-form" class="form">
              <div class="field-wrap">
                <label for="id">Product ID:</label>
                <input type="number" id="id" required />
              </div>
              <div class="field-wrap">
                <label for="name">Product Name:</label>
                <input type="text" id="name" required />
              </div>
              <div class="field-wrap">
                <label for="price">Price:</label>
                <input type="number" id="price" required />
              </div>

              <div class="button-group">
                <button
                  type="button"
                  @click=${this.handleAddProduct}
                  id="add-product"
                >
                  Add Product
                </button>
                <button
                  type="button"
                  id="update-product"
                  style="display: none;"
                  @click=${() => this.handleUpdateProduct()}
                >
                  Update Product
                </button>
              </div>

              <div id="warning-message" class="warning-message"></div>
            </form>
          </div>

          <div id="products-section" class="table-section">
            <div class="scroll-table">
              <table id="products-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.products.map((product) => {
                    return html`
                      <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                          <button
                            class="update-btn"
                            data-id="${product.id}"
                            @click=${() => this.handleUpdate(product.id)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    `;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="actions">
          <input type="number" id="discount" placeholder="Enter discount (%)" />
          <button id="apply-discount" @click="${this.handleApplyDiscount}">
            Apply Discount
          </button>
        </div>
        <div id="discounted-products-section" style="display: none;">
          <table id="discounted-products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Original Price</th>
                <th>Discounted Price</th>
              </tr>
            </thead>

            <tbody>
              ${this.products.map((product) => {
                return html`
                  <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      ${product.discountedPrice
                        ? product.discountedPrice.toFixed(2)
                        : "N/A"}
                    </td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
