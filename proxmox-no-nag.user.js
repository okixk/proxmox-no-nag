// ==UserScript==
// @name         Proxmox Auto Detector & No-Nag
// @namespace    local.proxmox.detector
// @version      1.0.0
// @description  Detect Proxmox VE and dismiss its subscription warning
// @homepageURL  https://github.com/okixk/proxmox-no-nag
// @updateURL    https://raw.githubusercontent.com/okixk/proxmox-no-nag/main/proxmox-no-nag.user.js
// @downloadURL  https://raw.githubusercontent.com/okixk/proxmox-no-nag/main/proxmox-no-nag.user.js
// @match        *://*/*
// @run-at       document-idle
// @noframes
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    // Identify the actual Proxmox VE application.
    const isProxmox = Boolean(
        document.querySelector(
            'script[src*="/pve2/js/pvemanagerlib.js"]'
        ) &&
        document.querySelector(
            'link[href*="/pve2/css/ext6-pve.css"]'
        )
    );

    // Exit immediately on unrelated websites.
    if (!isProxmox) return;

    console.info('[Proxmox Detector] Proxmox VE detected!');

    function dismissWarning() {
        const dialogs = document.querySelectorAll('.x-message-box');

        for (const dialog of dialogs) {
            if (!/no valid subscription/i.test(dialog.textContent)) {
                continue;
            }

            const okButton = [...dialog.querySelectorAll('.x-btn')]
                .find(button => button.textContent.trim() === 'OK');

            if (okButton) {
                okButton.click();
                console.info('[Proxmox Detector] Warning dismissed.');
            }
        }
    }

    // Watch for the warning after login.
    const observer = new MutationObserver(dismissWarning);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    dismissWarning();
})();
