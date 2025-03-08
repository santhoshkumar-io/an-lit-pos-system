import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  dateAdded: Date;
}

@customElement("product-inventory")
export default class ProductInventory extends LitElement {
  static styles = css`
    body {
      font-family: "Arial", sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      color: #333;
    }

    h1 {
      text-align: center;
      color: #333;
      background-color: #ffffff6c;
      backdrop-filter: blur(3px);
      padding: 0.67em;
      margin: 0;
      margin-bottom: 15px;
      z-index: 100;
    }

    .headerContainer {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .container {
      padding: 0 20px;
    }
    .searchSection {
      display: flex;
      align-items: center;
    }

    .searchBar {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }

    #search-field {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 200px;
    }

    .radios {
      display: flex;
      margin-left: 10px;
    }

    .radios input {
      margin: auto;
      margin-right: 5px;
    }

    label {
      margin-right: 15px;
    }

    .sortSection {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    #sort-select {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 10px;
    }

    button {
      padding: 10px 15px;
      background-color: #55c464;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #46b929;
    }
    .btn-wrap {
      display: flex;
      gap: 10px;
    }

    #productList {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
      position: relative;
      overflow-x: auto;
    }

    #productList li {
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 15px;
      margin: 10px 0;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    #productList h5 {
      margin-bottom: 10px;
      color: #2c3e50;
    }

    #productList .table-header,
    #productList .table-row {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 2fr 2fr;
      align-items: center;
      border-bottom: 1px solid #ddd;
      padding: 10px 0;
    }

    #productList .table-header {
      background-color: #ff2d70;
      font-weight: bold;
    }

    #productList .table-row {
      background-color: white;
      transition: background-color 0.3s ease-in-out;
    }

    #productList .table-row:hover {
      background-color: #ff98b844;
    }

    #productList .table-cell {
      padding: 8px 15px;
      min-width: 80px;
      text-align: left;
    }

    .table-header {
      position: sticky;
      top: 0;
    }
    .table-header .table-cell {
      font-size: 16px;
      color: #ffff;
    }

    .table-row .table-cell {
      font-size: 14px;
      color: #333;
    }
    .scroll-table {
      height: 385px;
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
  `;

  products: Product[] = [
    {
      id: 1,
      name: "Screwdriver",
      category: "Tools",
      price: 10.5,
      quantity: 150,
      dateAdded: new Date("2023-01-01"),
    },
    {
      id: 2,
      name: "Hammer",
      category: "Tools",
      price: 12.75,
      quantity: 120,
      dateAdded: new Date("2023-02-15"),
    },
    {
      id: 3,
      name: "Wrench",
      category: "Tools",
      price: 15.0,
      quantity: 200,
      dateAdded: new Date("2023-03-10"),
    },
    {
      id: 4,
      name: "Drill",
      category: "Power Tools",
      price: 55.0,
      quantity: 80,
      dateAdded: new Date("2023-05-25"),
    },
    {
      id: 5,
      name: "Nail Gun",
      category: "Power Tools",
      price: 90.0,
      quantity: 50,
      dateAdded: new Date("2023-06-30"),
    },
    {
      id: 6,
      name: "Saw",
      category: "Tools",
      price: 20.0,
      quantity: 100,
      dateAdded: new Date("2023-04-20"),
    },
    {
      id: 7,
      name: "Laser Cutter",
      category: "Machines",
      price: 500.0,
      quantity: 15,
      dateAdded: new Date("2023-07-15"),
    },
    {
      id: 8,
      name: "Band Saw",
      category: "Machines",
      price: 250.0,
      quantity: 25,
      dateAdded: new Date("2023-08-05"),
    },
  ];
  @state() filteredProducts: Product[] = [...this.products];

  searchByCategory(val: string) {
    this.filteredProducts = this.products.filter(
      (product) => product.category === val
    );

    return this.filteredProducts;
  }
  searchByPrice(val: number) {
    this.filteredProducts = this.products.filter(
      (product) => product.price < val
    );
    return this.filteredProducts;
  }
  searchByName(val: string) {
    this.filteredProducts = this.products.filter(
      (product) => product.name === val
    );
  }
  searchByQuantity(val: number) {
    this.filteredProducts = this.products.filter(
      (product) => product.quantity > val
    );
    return this.filteredProducts;
  }
  searchProducts() {
    const searchVal = (
      this.shadowRoot?.getElementById("search-field") as HTMLInputElement
    )?.value;
    if (searchVal != "") {
      if (
        (this.shadowRoot?.getElementById("category-search") as HTMLInputElement)
          ?.checked
      ) {
        this.searchByCategory(searchVal);
      } else if (
        (this.shadowRoot?.getElementById("price-search") as HTMLInputElement)
          ?.checked
      ) {
        this.searchByPrice(Number(searchVal));
      } else if (
        (this.shadowRoot?.getElementById("name-search") as HTMLInputElement)
          ?.checked
      ) {
        this.searchByName(searchVal);
      } else if (
        (this.shadowRoot?.getElementById("quantity-search") as HTMLInputElement)
          ?.checked
      ) {
        this.searchByQuantity(Number(searchVal));
      }
    }
  }
  resetSearch() {
    (
      this.shadowRoot!.getElementById("search-field") as HTMLInputElement
    ).value = "";

    this.shadowRoot!.querySelectorAll("input[name='criteria']").forEach(
      (radio) => ((radio as HTMLInputElement).checked = false)
    );
    this.filteredProducts = [...this.products];
  }
  handleSort() {
    const sorted = [...this.products];
    const sortVal = (
      this.shadowRoot?.getElementById("sort-select") as HTMLInputElement
    ).value;
    if (sortVal == "price") {
      sorted.sort((a: Product, b: Product) => a.price - b.price);
    } else if (sortVal == "quantity") {
      sorted.sort((a: Product, b: Product) => b.quantity - a.quantity);
    } else if (sortVal == "date") {
      sorted.sort(
        (a: Product, b: Product) =>
          a.dateAdded.getDate() - b.dateAdded.getDate()
      );
    }
    this.filteredProducts = sorted;
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
      <div class="container">
        <div class="headerContainer">
          <section class="searchSection">
            <back-btn @on-action=${this.sendDataToParent}></back-btn>
            <div class="searchBar">
              <input type="text" placeholder="Criteria" id="search-field" />
              <div class="radios">
                <input type="radio" name="criteria" id="category-search" />
                <label for="category-search">Category</label>
                <input type="radio" name="criteria" id="price-search" />
                <label for="price-search">Price</label>
                <input type="radio" name="criteria" id="name-search" />
                <label for="name-search">Name</label>
                <input type="radio" name="criteria" id="quantity-search" />
                <label for="quantity-search">Quantity</label>
              </div>
            </div>
            <div class="btn-wrap">
              <button @click="${this.searchProducts}">Search</button>
              <button @click="${this.resetSearch}">Reset</button>
            </div>
          </section>
          <section class="sortSection">
            <select name="sortby" id="sort-select">
              <option value="select-default">--Sort by--</option>
              <option value="price">Price</option>
              <option value="date">Date Added</option>
              <option value="quantity">Quantity</option>
            </select>
            <button @click="${this.handleSort}">Sort</button>
          </section>
        </div>
        <div class="scroll-table">
          <table id="productList">
            <thead>
              <tr class="table-header">
                <th class="table-cell">Name</th>
                <th class="table-cell">Price</th>
                <th class="table-cell">Quantity</th>
                <th class="table-cell">Category</th>
                <th class="table-cell">Date Added</th>
              </tr>
            </thead>
            <tbody>
              ${this.filteredProducts.length === 0
                ? html` <h1>Not found</h1> `
                : this.filteredProducts.map(
                    (p) => html`
                      <tr class="table-row">
                        <td class="table-cell">${p.name}</td>
                        <td class="table-cell">${p.price}</td>
                        <td class="table-cell">${p.quantity}</td>
                        <td class="table-cell">${p.category}</td>
                        <td class="table-cell">
                          ${p.dateAdded.toISOString().split("T")[0]}
                        </td>
                      </tr>
                    `
                  )}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
