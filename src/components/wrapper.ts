import { html, LitElement, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-wrapper")
export class Wrapper extends LitElement {
  static styles = css`
    .wrap {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .slot-wrap {
      flex: 1;
    }
  `;

  render() {
    return html`
      <div class="wrap">
        <app-header></app-header>
        <div class="slot-wrap">
          <slot></slot>
        </div>
        <app-footer></app-footer>
      </div>
    `;
  }
}
