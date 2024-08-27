# @zoom-utilities/common

A common package for simplifying Zoom tasks in the [`@zoom-utilities`](../README.md) monorepo.

## Workspace Setup

1. [Install NodeJS](https://nodejs.org/en/download/ 'https://nodejs.org/en/download/')

2. In a command-line, install dependencies with **`npm ci`**

3. [Install VSCode](https://code.visualstudio.com 'https://code.visualstudio.com')

4. In a command-line and in the project root directory, open VSCode with **`code common.code-workspace`**

5. Install VSCode Extension Recommendations

![VSCode extension recommendations](../documentation/vscode-extension-recommendations.png)

---

## Commands

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
