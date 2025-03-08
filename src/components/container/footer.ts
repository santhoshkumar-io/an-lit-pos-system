import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { WRAPPER } from "../../constants/WRAPPER";
@customElement("app-footer")
export default class Footer extends LitElement {
  static styles = css`
    footer {
      background-color: #222;
      color: white;
      text-align: center;
      padding: 15px;
      margin-top: auto;
    }
  `;
  render() {
    return html`<footer>${WRAPPER.footer}</footer>`;
  }
}
