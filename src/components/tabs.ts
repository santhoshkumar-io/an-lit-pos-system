import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-tabs")
export default class Tabs extends LitElement {
  static styles = css`
    .active-link {
      background-color: #ff2d70;
      color: #fff;
      border: 1px solid #ff2d70;
      border-radius: 4px;
      padding: 4px;
    }
  `;
  render() {
    return html`
      <div class="tab-tiles">
        <button class="tab-links active-link" @click="opentab('PI')">
          Product Inventory
        </button>
        <button class="tab-links" @click="opentab('PMS')">
          Product Management System
        </button>
        <button class="tab-links" @click="opentab('OPS')">
          Order Processing System
        </button>
      </div>
    `;
  }
}
