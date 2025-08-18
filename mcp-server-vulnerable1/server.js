const { createServer } = require('@modelcontextprotocol/sdk');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { getNpmPackageInfo } = require('./tools/getNpmPackageInfo');

// Create MCP server with our vulnerable tool
const server = createServer({
  tools: [getNpmPackageInfo]
});

// Use STDIO transport instead of HTTP
const transport = new StdioServerTransport();

// Connect the server to the transport
(async () => {
  console.error('MCP server starting with STDIO transport');
  console.error('Exposed tools:');
  console.error('- getNpmPackageInfo: Fetches package information from npm registry');
  
  await server.connect(transport);
})().catch(err => {
  console.error('Error starting MCP server:', err);
  process.exit(1);
});
