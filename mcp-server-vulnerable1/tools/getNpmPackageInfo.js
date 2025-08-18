const { exec } = require('child_process');
const { z } = require('zod');
const util = require('util');
const execPromise = util.promisify(exec);

// Define the schema for the tool parameters
const getNpmPackageInfoParams = z.object({
  packageName: z.string().describe('The name of the npm package to look up')
});

// Create the vulnerable tool that executes shell commands directly with user input
const getNpmPackageInfo = {
  name: 'getNpmPackageInfo',
  description: 'Get information about an npm package from the registry',
  parameters: getNpmPackageInfoParams,
  execute: async ({ packageName }) => {
    try {
      // VULNERABLE: Directly using user input in a shell command without sanitization
      const { stdout, stderr } = await execPromise(`npm view ${packageName}`);
      
      if (stderr) {
        return {
          error: stderr
        };
      }
      
      return {
        success: true,
        packageInfo: stdout
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};

module.exports = { getNpmPackageInfo };
