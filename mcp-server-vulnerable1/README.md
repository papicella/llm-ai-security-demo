# Vulnerable MCP Server Demo

This is a demonstration of a vulnerable Model Context Protocol (MCP) server that exposes a tool called `getNpmPackageInfo`.

## Vulnerability

This server contains a command injection vulnerability in the `getNpmPackageInfo` tool. It directly uses user input in a shell command without proper sanitization.

## Setup

```bash
npm install
npm start
```

## Using the Tool

The server exposes a tool called `getNpmPackageInfo` that accepts a `packageName` parameter and returns information about the package from the npm registry.

Example usage via an MCP client:

```javascript
const result = await client.useTools([
  {
    name: 'getNpmPackageInfo',
    parameters: {
      packageName: 'express'
    }
  }
]);
```

## Security Warning

This is intentionally vulnerable for demonstration purposes. Do not use in production environments.
