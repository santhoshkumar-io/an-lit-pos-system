import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("back-btn")
export default class BackBtn extends LitElement {
  static styles = css`
    .back-btn {
      display: flex;
      justify-content: center;
      gap: 4px;
      align-items: center;
      margin-right: 10px;
      padding: 10px 15px;
      background-color: #ffff;
      border: 1px solid #ff2d70;
      border-radius: 4px;
      color: #ff2d70;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .back-btn:hover {
      background: rgba(255, 45, 111, 0.09);
    }
    span {
      padding-bottom: 2px;
    }
  `;
  @property({ type: String }) where = "home";
  sendDataToParent($event: any) {
    console.log(this.where);
    $event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("on-action", {
        detail: {
          type: this.where,
        },
      })
    );
  }
  render() {
    return html`
      <button class="back-btn" @click=${this.sendDataToParent}>
        <span>←</span> Back
      </button>
    `;
  }
}
