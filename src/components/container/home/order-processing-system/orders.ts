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
  total: number;
}
@customElement("view-orders")
export default class Orders extends LitElement {
  static styles = css`
    .container {
      max-width: 800px;
      margin: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .orders-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .card {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px 35px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
      position: relative;
    }

    .card:hover {
      transform: scale(1.02);
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    }

    .card .order-left {
      width: 500px;
      display: grid;
      grid-template-columns: 2fr 1fr 2fr 2fr;
    }

    .card .order-right {
      margin-top: 10px;
    }
    .order-head {
      color: #bbb;

      display: flex;
      justify-content: space-between;
    }
    .order-field-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .order-field-wrap h5 {
      color: #666666;
      margin: 10px 0;
    }
    .order-field-wrap h6 {
      margin: 10px 0;
    }
    .order-id {
      color: #3f3f3fe1;
      font-weight: 600;
    }
    .Pending {
      border-radius: 5px;
      padding: 5px;
      color: #fff;
      background-color: rgb(255, 174, 0);
    }
    .order-right p,
    #name {
      color: rgb(20, 82, 124);
      font-weight: bold;
    }
    .card.expanded {
      background-color: #f1f1f1;
      border-color: #bbb;
    }

    .card .order-details {
      margin-top: 10px;
      border-top: 1px solid #ccc;
      padding-top: 10px;
      display: none;
    }

    .card.expanded .order-details {
      display: block;
    }

    .card .btn-delete {
      background-color: red;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
    .delete-btn-wrap {
      display: flex;
      justify-content: center;
    }
    .card .btn-delete:hover {
      background-color: darkred;
    }
    .products-list {
      list-style-type: none;
    }

    .products-list li {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
    }
    .order-details p {
      display: grid;
      grid-template-columns: 5fr 1fr;
      margin: auto 27px;
    }
    .order-details p span {
      font-weight: 700;
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .main {
      flex: 1;
    }
  `;
  @state() orders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
  deleteOrder(orderId: string) {
    if (!orderId) return;

    let orders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");

    orders = orders.filter((order) => order.orderId !== orderId);

    localStorage.setItem("orders", JSON.stringify(orders));

    this.orders = [...orders];
  }
  handleToggle(e: Event) {
    const card = (e.target as HTMLElement).closest(".card");
    if (!card) return;

    card.classList.toggle("expanded");
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
        <back-btn
          @on-action=${this.sendDataToParent}
          where="order-processing-system"
        ></back-btn>

        <div class="orders-wrap">
          <div id="orders-container" class="orders-container">
            ${this.orders.length === 0
              ? html`<p>No orders available!</p>`
              : this.orders.map((order) => {
                  return html`
                    <div
                      class="card"
                      data-order-id=${order.orderId}
                      @click=${this.handleToggle}
                    >
                      <div class="order-head">
                        <div class="order-left">
                          <div class="order-field-wrap">
                            <h6>ORDER PLACED</h6>
                            <h5>${order.date}</h5>
                          </div>
                          <div class="order-field-wrap">
                            <h6>TOTAL</h6>
                            <h5>₹${order.total}</h5>
                          </div>
                          <div class="order-field-wrap">
                            <h6>SHIP TO</h6>
                            <h5 id="name">${order.customerName}</h5>
                          </div>
                          <div class="order-field-wrap">
                            <h6>CONTACT</h6>
                            <h5>${order.mobileNumber}</h5>
                          </div>
                        </div>
                        <div class="order-right">
                          <div class="order-id">ORDER # ${order.orderId}</div>
                          <p>
                            Status:
                            <span class="${order.status}">${order.status}</span>
                          </p>
                        </div>
                      </div>
                      <div class="order-details">
                        <ul class="products-list">
                          ${order.items.map(
                            (item) => html`
                              <li>
                                <span>${item.name}</span>
                                <span
                                  >${item.price}
                                  <span>X ${item.quantity ?? 1}</span></span
                                >
                                <span
                                  >₹${(
                                    item.price * (item.quantity ?? 1)
                                  ).toFixed(2)}</span
                                >
                              </li>
                            `
                          )}
                        </ul>
                        <p>
                          <strong>Total Price:</strong
                          ><span>₹${order.total.toFixed(2)}</span>
                        </p>

                        <div class="delete-btn-wrap">
                          <button
                            class="btn-delete"
                            @click=${() => this.deleteOrder(order.orderId)}
                          >
                            Delete Order
                          </button>
                        </div>
                      </div>
                    </div>
                  `;
                })}
          </div>
        </div>
      </div>
    `;
  }
}
