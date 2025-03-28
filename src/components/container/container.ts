import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../tabs";

@customElement("app-container")
export default class Container extends LitElement {
  static styles = css`
    main {
      padding: 40px;
      padding-bottom:0px;
      background-color: #f1f1f1;
      height: 100%;
    }
  `;

  @property({ type: Array })
  @property({ type: Object })
  pages: any;

  @state() private activeWindow: any = "home";

  constructor() {
    super();

    this.pages = {
      home: html`<app-home
        @on-action="${this.handleOnActionEvent}"
      ></app-home>`,
      "product-inventory": html`<product-inventory
        @on-action="${this.handleOnActionEvent}"
      ></product-inventory>`,
      "product-management-system": html`<product-management-system
        @on-action="${this.handleOnActionEvent}"
      ></product-management-system>`,
      "order-processing-system": html`<order-processing-system
        @on-action="${this.handleOnActionEvent}"
      ></order-processing-system>`,
      orders: html`<view-orders
        @on-action="${this.handleOnActionEvent}"
      ></view-orders>`,
    };
  }

  handleOnActionEvent(data: any) {
    if (data?.detail?.type) {
      this.activeWindow = data?.detail?.type;
    }
  }

  render() {
    return html` <main>${this.pages[this.activeWindow]}</main> `;
  }
}
