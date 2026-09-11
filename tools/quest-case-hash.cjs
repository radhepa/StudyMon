/* One provenance definition shared by generation, application and validation. */
const crypto = require('crypto');
function hashCase(quest, source, test) {
  return crypto.createHash('sha256').update(JSON.stringify({
    contract: quest.implementationContract,
    mode: quest.grading.mode,
    harness: quest.grading.harness || '',
    source, input: test.input || '', files: test.files || {},
    abi: 'wasm32-wasi-c11',
    flags: ['-Wall', '-Wextra', '-Werror', '-pedantic-errors', '-O0']
  })).digest('hex');
}
module.exports = { hashCase };
