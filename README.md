# Proxmox No-Nag

Proxmox No-Nag is a browser userscript that dismisses the Proxmox VE subscription warning. It saves a click when the reminder appears after signing in.

## Install and update

1. Install [Violentmonkey](https://violentmonkey.github.io/get-it/), the supported userscript manager. Tampermonkey and Greasemonkey are untested with this script.
2. Open the [direct installation link](https://raw.githubusercontent.com/okixk/proxmox-no-nag/main/proxmox-no-nag.user.js) and confirm the installation in Violentmonkey.
3. In the Violentmonkey dashboard, open **Settings** and enable a schedule under **Check for script updates**. In the script’s settings, keep **Allow update** enabled.

Violentmonkey checks the raw script on `main` for a higher `@version` and downloads updates from the same URL. Future releases increment `@version` using semantic versioning. [Violentmonkey metadata reference](https://violentmonkey.github.io/api/metadata-block/)

## How it works

Proxmox VE can run on custom hostnames, IP addresses, and ports, so the script matches all HTTP and HTTPS sites in top-level pages. At document idle, it looks for both `pvemanagerlib.js` under `/pve2/js/` and `ext6-pve.css` under `/pve2/css/`. If either is missing, the script exits immediately, before it watches the page or clicks anything.

On a matching page, the script checks existing dialogs and watches for child elements added or removed after login. It looks for an Ext JS message box containing `No valid subscription`, ignoring case, then clicks the button labeled `OK` inside that dialog.

## Limitations

- Detection requires the English warning text and an `OK` button.
- A dialog already present but revealed only through a class or style change may be missed because the observer watches child-list changes.
- Changes to Proxmox VE asset paths or dialog markup may stop detection. Compatibility has not been verified on a live Proxmox VE instance.

The script only hides the warning in the browser. It does not modify Proxmox licensing, subscription status, or repository configuration.

## License

GNU Affero General Public License v3.0. See [LICENSE](LICENSE).
