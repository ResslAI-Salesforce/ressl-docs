(function () {
  const BUTTON_ID = "copy-skill-nav";
  const MOBILE_ID = "copy-skill-nav-mobile";

  async function copySkill(button) {
    const label = button.querySelector("[data-label]");
    const prev = label.textContent;
    label.textContent = "Copying…";
    button.disabled = true;
    try {
      const res = await fetch("/skill.md");
      if (!res.ok) throw new Error(String(res.status));
      await navigator.clipboard.writeText(await res.text());
      label.textContent = "Copied!";
      setTimeout(() => {
        label.textContent = prev;
        button.disabled = false;
      }, 2000);
    } catch {
      label.textContent = "Failed";
      setTimeout(() => {
        label.textContent = prev;
        button.disabled = false;
      }, 2500);
    }
  }

  function makeButton(id, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.id = id;
    button.className = className;
    button.setAttribute("aria-label", "Copy agent skill to clipboard");
    button.innerHTML =
      '<span data-label>Copy skill</span>' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-3.5 shrink-0">' +
      '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>' +
      '<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>' +
      "</svg>";
    button.addEventListener("click", (e) => {
      e.preventDefault();
      copySkill(button);
    });
    return button;
  }

  function inject() {
    const cta = document.getElementById("topbar-cta-button");
    if (!cta || !cta.parentElement) return;

    if (!document.getElementById(BUTTON_ID)) {
      const li = document.createElement("li");
      li.className = "whitespace-nowrap hidden lg:flex";
      li.appendChild(
        makeButton(
          BUTTON_ID,
          "group px-4 py-2 relative inline-flex items-center gap-1.5 text-sm font-medium rounded-xl ring-1 ring-gray-400/30 hover:ring-gray-600/30 dark:ring-gray-600/30 dark:hover:ring-gray-500/30 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white bg-background-light dark:bg-background-dark"
        )
      );
      cta.parentElement.insertBefore(li, cta);
    }

    const mobileConsole = cta.parentElement.querySelector("li.block.lg\\:hidden");
    if (mobileConsole && !document.getElementById(MOBILE_ID)) {
      const li = document.createElement("li");
      li.className = "block lg:hidden";
      const button = makeButton(
        MOBILE_ID,
        "flex items-center gap-1.5 whitespace-nowrap font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
      );
      li.appendChild(button);
      cta.parentElement.insertBefore(li, mobileConsole);
    }
  }

  inject();
  new MutationObserver(inject).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
