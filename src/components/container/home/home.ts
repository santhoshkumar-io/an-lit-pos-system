import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { CONTAINER } from "../../../constants/CONTAINER.js";
@customElement("app-home")
export default class Home extends LitElement {
  static styles = css`
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

    .active-tab {
      display: flex;
      gap: 80px;
      padding: 30px;
    }
    .active-tab p {
      line-height: 1.4rem;
    }
    .tab-links {
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

    .btn {
      gap: 6px;
      display: flex;
      cursor: pointer;
      justify-content: center;
      padding: 10px 0px;
      background-color: #fff;
      color: #ff2d70;
      width: 25%;
      border: 1px solid #ff2d70;
      font-size: 0.75rem;
    }
  `;
  @state() private activeTabIndex: number = 0;

  private openTab(index: number) {
    this.activeTabIndex = index;
  }

  sendDataToParent($event: any) {
    $event.stopPropagation();
    // Dispatching a custom event with data
    this.dispatchEvent(
      new CustomEvent("on-action", {
        detail: {
          type: CONTAINER[this.activeTabIndex].title
            .split(" ")
            .join("-")
            .toLowerCase(),
        },
      })
    );
  }

  render() {
    return html` <div class="tile-wrap">
      <div>
        <div>
          ${CONTAINER.map(
            (tab) => html`
              <button
                class="tab-links ${this.activeTabIndex === tab.id
                  ? "active-link"
                  : ""}"
                @click=${() => this.openTab(tab.id)}
              >
                ${tab.title}
              </button>
            `
          )}
          <div class="active-tab">
            <div class="l-tab">
              <h2>${CONTAINER[this.activeTabIndex].title}</h2>
              <p>${CONTAINER[this.activeTabIndex].description}</p>
              <div class="btn-wrap">
                <button class="btn" @click=${this.sendDataToParent}>
                  ${CONTAINER[this.activeTabIndex].btn} <span>→</span>
                </button>
              </div>
            </div>
            <div class="r-tab">
              <img src=${CONTAINER[this.activeTabIndex].path} />
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
}
