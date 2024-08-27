# @zoom-utilities/server

An Express app for simplifying Zoom tasks in the [`@zoom-utilities`](../README.md) monorepo.

## Worspace Setup

1. [Install NodeJS](https://nodejs.org/en/download/ 'https://nodejs.org/en/download/')

2. In a command-line, install dependencies with **`npm ci`**

3. [Install VSCode](https://code.visualstudio.com 'https://code.visualstudio.com')

4. In a command-line and in the project root directory, open VSCode with **`code server.code-workspace`**

5. Install VSCode Extension Recommendations

![VSCode extension recommendations](../documentation/vscode-extension-recommendations.png)

## Project Setup

1. Follow the [Zoom documentation for "Internal apps (Server-to-server)"](https://developers.zoom.us/docs/internal-apps/ 'https://developers.zoom.us/docs/internal-apps/') to create and register a server-to-server OAuth app.

2. Copy your account ID, client ID, and client secret values from your server-to-server OAuth Zoom app, and paste those values into [`config.json`](./config.json).

> :warning: **Do not commit changes to this file!** :warning:
>
> See [`config.example.json`](./config.example.json) for example formatting to follow.

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
