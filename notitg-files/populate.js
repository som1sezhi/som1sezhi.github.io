(function () {
  "use strict";

  const LINK_TYPE_TO_ICON = {
    yt: "media/YouTube.svg",
    dl: "media/Download.svg",
    pack: "media/Download.svg",
  };

  const LINK_TYPE_TO_TEXT = {
    yt: "Watch on YouTube",
    dl: "Download file",
    pack: "Download pack (includes this file)",
  };

  function createBannerElem(bannerURL, ytLink) {
    let elem;
    if (ytLink) {
      elem = document.createElement("a");
      elem.href = ytLink;
      elem.target = "_blank";
      elem.rel = "noreferrer noopener";
    } else {
      elem = document.createElement("span");
    }
    if (bannerURL) {
      elem.innerHTML = `
        <img src="${bannerURL}" class="glow-on-hover" />
      `;
    } else {
      elem.innerHTML = `
        <div class="file-bn-empty glow-on-hover">[no banner]</div>
      `;
    }
    return elem;
  }

  function createLinkButton(type, link) {
    const iconURL = LINK_TYPE_TO_ICON[type];
    const text = LINK_TYPE_TO_TEXT[type];
    let elem = document.createElement("a");
    elem.className = "link-btn glow-on-hover";
    elem.href = link;
    elem.target = "_blank";
    elem.rel = "noreferrer noopener";
    elem.innerHTML = `
      <img class="link-icon" src="${iconURL}" />
      ${text}
    `;
    return elem;
  }

  function createFileListItemElem(fileInfo) {
    let elem = document.createElement("div");
    elem.className = "rounded-box file-list-item";
    elem.innerHTML = `
      <div class="file-bn-container"></div>
      <div class="file-info-container">
        <h2 class="file-title">
          ${fileInfo.title}
          <span class="file-artist">/ ${fileInfo.artist}</span>
        </h2>
        <p>
          <span class="gray">released:</span> ${fileInfo.date}<br/>
          ${
            fileInfo.pack
              ? `<span class="gray">pack:</span> ${fileInfo.pack}`
              : `<span class="gray">single release</span>`
          }
        </p>
        <p class="file-link-list"></p>
      </div>
    `;
    const bnContainer = elem.querySelector(".file-bn-container");
    bnContainer.appendChild(
      createBannerElem(fileInfo.bannerURL, fileInfo.links.yt)
    );
    const linkList = elem.querySelector(".file-link-list");
    ["yt", "dl", "pack"].forEach((type) => {
      if (fileInfo.links[type]) {
        const linkElem = createLinkButton(type, fileInfo.links[type]);
        linkList.appendChild(linkElem);
      }
    });
    return elem;
  }

  window.onload = function () {
    const fileListElem = document.getElementById("file-list");
    contents.reverse();
    contents.forEach((fileInfo) => {
      let elem = createFileListItemElem(fileInfo);
      fileListElem.appendChild(elem);
    });
  };
})();
