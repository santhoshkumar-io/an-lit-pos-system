import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { CONTAINER } from "./constants/CONTAINER.js";
import "./tabs";

@customElement("app-container")
export default class Container extends LitElement {
  @state() private activeTab: string = "PI";

  private openTab(event: Event) {
    console.log(event.target);
    const target = event.target as HTMLButtonElement;
    const tabname = target.getAttribute("data-tab");
    if (tabname) {
      this.activeTab = tabname;
    }
  }

  static styles = css`
    main {
      padding: 40px;
    }
    h2 {
      margin-bottom: 10px;
      color: #ff2d70;
    }
    a {
      color: #222;
      text-decoration: none;
    }
    .tile-wrap {
      background-color: #ffff;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #ddd;
    }

    img {
      height: 200px;
    }
    .tab-contents {
      display: none;
    }
    .active-tab {
      display: flex;
      gap: 80px;
      padding: 30px;
    }
    .active-tab p {
      line-height: 1.4rem;
    }
    .tab-links {
      background-color: #fff;
      color: #222;
      border: none;
      cursor: pointer;
      padding: 6px;
    }
    .active-link {
      background-color: #ff2d70;
      color: white;
      border: 1px solid #ff2d70;
      border-radius: 4px;
    }

    .l-tab,
    .r-tab {
      flex: 1;
    }
  `;
  render() {
    return html` <main>
      <div class="tile-wrap">
        <div>
          <button
            class="tab-links ${this.activeTab === "PI" ? "active-link" : ""}"
            data-tab="PI"
            @click=${this.openTab}
          >
            ${CONTAINER.PI.title}
          </button>
          <button
            class="tab-links ${this.activeTab === "PMS" ? "active-link" : ""}"
            data-tab="PMS"
            @click=${this.openTab}
          >
            ${CONTAINER.PMS.title}
          </button>
          <button
            class="tab-links  ${this.activeTab === "OPS" ? "active-link" : ""}"
            data-tab="OPS"
            @click=${this.openTab}
          >
            ${CONTAINER.OPS.title}
          </button>
        </div>
        <div
          class="tab-contents ${this.activeTab === "PI" ? "active-tab" : ""}"
          id="product-inventory"
        >
          <div class="l-tab">
            <h2>${CONTAINER.PI.title}</h2>
            <p>${CONTAINER.PI.description}</p>
          </div>
          <div class="r-tab"><img src=${CONTAINER.PI.path} /></div>
        </div>
        <div
          class="tab-contents ${this.activeTab === "PMS" ? "active-tab" : ""}"
          id="product-management-system"
        >
          <div class="l-tab">
            <h2>${CONTAINER.PMS.title}</h2>
            <p>${CONTAINER.PMS.description}</p>
          </div>
          <div class="r-tab"><img src=${CONTAINER.PMS.path} /></div>
        </div>
        <div
          class="tab-contents ${this.activeTab === "OPS" ? "active-tab" : ""}"
          id="order-processing-system"
        >
          <div class="l-tab">
            <h2>${CONTAINER.OPS.title}</h2>
            <p>${CONTAINER.OPS.description}</p>
          </div>
          <div class="r-tab"><img src=${CONTAINER.OPS.path} /></div>
        </div>
      </div>
    </main>`;
  }
}
