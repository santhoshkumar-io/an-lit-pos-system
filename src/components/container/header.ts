import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { WRAPPER } from "../../constants/WRAPPER";

@customElement("app-header")
export default class Header extends LitElement {
  @property({ type: String }) text = "default";

  static styles = css`
    header {
      background-color: #ffffff6c;
      backdrop-filter: blur(3px);
      color: #222;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
    a {
      text-decoration: none;
      color: #222;
      font-size: 1rem;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }
    ul {
      list-style: none;
      display: flex;
      gap: 20px;
    }
    a:hover {
      color: #ff2d70;
    }
    .logout-btn {
      background-color: #fff;
      color: #ff2d70;
      padding: 8px 15px;
      border-radius: 5px;
      border: 2px solid #ff2d70;
    }
    .logout-btn:hover {
      cursor: pointer;
    }
  `;
  render() {
    return html` <header>
      <div class="logo">${WRAPPER.header.logo}</div>
      <nav>
        <ul>
          ${WRAPPER.header.navItems.map((item, key) => {
            return html`<li key=${key}><a href="#">${item}</a></li>`;
          })}
        </ul>
      </nav>
      <button class="logout-btn">${WRAPPER.header.logoutBtn}</button>
    </header>`;
  }
}
