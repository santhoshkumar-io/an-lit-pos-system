import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("product-inventory")
export default class ProductInventory extends LitElement {
  static styles = css`
    h2 {
      margin-bottom: 10px;
      color: #ff2d70;
    }

    .tile {
      display: flex;
      gap: 20px;
    }
    img {
      height: 300px;
      width: 500px;
    }
    a {
      color: #222;
      text-decoration: none;
    }
  `;
  render() {
    return html`
      <div class="tile" id="product-inventory">
        <div>
          <h2>Product Inventory</h2>
          <p>
            The Products Inventory Controller App is a user-friendly web
            application designed to manage and organize manufacturing products
            efficiently. It offers intuitive features for searching, sorting,
            and displaying product details such as name, category, price, and
            quantity.
          </p>
        </div>
        <div><img src="../assets/product-inventory.png" /></div>
      </div>
    `;
  }
}
