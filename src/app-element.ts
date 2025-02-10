import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import "./wrapper";
import "./header";
import "./footer";
import "./container";
const logo = new URL("../../assets/open-wc-logo.svg", import.meta.url).href;

@customElement("app-element")
export class AppElement extends LitElement {
  render() {
    return html`<app-wrapper text="Hi from the outer Component">
      <app-container></app-container>
    </app-wrapper>`;
  }
}
