# @zoom-utilities/client

A Quasar app for simplifying Zoom tasks in the [`@zoom-utilities`](../README.md) monorepo.

## Workspace Setup

1. [Install NodeJS](https://nodejs.org/en/download/ 'https://nodejs.org/en/download/')

2. In a command-line, install dependencies with **`npm ci`**

3. [Install VSCode](https://code.visualstudio.com 'https://code.visualstudio.com')

4. In a command-line and in the project root directory, open VSCode with **`code client.code-workspace`**

5. Install VSCode Extension Recommendations

![VSCode extension recommendations](../documentation/vscode-extension-recommendations.png)

## Project Setup

1. Change the `npm start` target script in [`package.json`](./package.json) to one of these options:

| Script           | Description               |
| ---------------- | ------------------------- |
| `start-electron` | Starts an electron client |
| `start-pwa`      | Starts a web client       |

---

## Commands

<details>
<summary>Local Testing</summary>
<p>
Start the application in development mode (hot-code reloading, error reporting, etc.)

```bash
npm start
```

</p>
</details>

<details>
<summary>QA</summary>
<p>
Run unit tests

```bash
npm test
```

Run linting

```bash
npm run lint
```

</p>
</details>

<details>
<summary>Deployment</summary>
<p>
Build the app for production

```bash
npm run build
```

Delete the build

```bash
npm run clean
```

</p>
</details>

---

## Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
