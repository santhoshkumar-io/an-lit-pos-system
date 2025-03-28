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
      margin: 0;
      color: #333;
    }
    .headerContainer {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .container {
      padding: 0 20px;
      background-color: #f1f1f1;
    }
    .searchSection {
      display: flex;
      align-items: center;
    }
    #search-field {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 200px;
    }
    #sort-select {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 10px;
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
  searchProducts(event: Event) {
    const searchVal = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    if (searchVal === "") return this.resetSearch();

    this.filteredProducts = this.products.filter((product) => {
      const { name, category, price, quantity, dateAdded } = product;
      return (
        name.toLowerCase().includes(searchVal) ||
        category.toLowerCase().includes(searchVal) ||
        dateAdded.toISOString().split("T")[0].includes(searchVal) ||
        (!isNaN(Number(searchVal)) &&
          (price === Number(searchVal) || quantity === Number(searchVal)))
      );
    });
  }

  resetSearch() {
    this.filteredProducts = [...this.products];
  }
  handleSort(event: Event) {
    const sortVal = (event.target as HTMLSelectElement).value;
    this.filteredProducts = [...this.filteredProducts].sort((a, b) => {
      if (sortVal === "price") return a.price - b.price;
      if (sortVal === "quantity") return b.quantity - a.quantity;
      if (sortVal === "date")
        return a.dateAdded.getTime() - b.dateAdded.getTime();
      return 0;
    });
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
              <input
                type="text"
                placeholder="Criteria"
                id="search-field"
                @keyup="${this.searchProducts}"
              />
            </div>
          </section>
          <section class="sortSection">
            <select name="sortby" id="sort-select" @change="${this.handleSort}">
              <option value="">--Sort by--</option>
              <option value="price">Price</option>
              <option value="date">Date Added</option>
              <option value="quantity">Quantity</option>
            </select>
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
                ? html`
                    <tr>
                      <td>No products found</td>
                    </tr>
                  `
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
