import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./wrapper";
import "./container/header";
import "./container/footer";
import "./container/container";
import "./container/home/home";
import "./container/home/product-invertory/product-inventory";
import "./container/home/back-btn";
import "./container/home/product-management-system/product-management-system";
@customElement("my-element")
export class MyElement extends LitElement {
  render() {
    return html`<app-wrapper>
      <app-container></app-container>
    </app-wrapper>`;
  }
}
