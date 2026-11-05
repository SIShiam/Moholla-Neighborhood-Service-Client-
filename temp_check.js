const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const clientDir = path.resolve(__dirname, '../../client');
const files = getFiles(path.join(clientDir, 'src'));
let missingImports = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const importRegex = /import\s+(?:(?:[\w*\s{},]*)\s+from\s+)?['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith('.')) {
      const dir = path.dirname(file);
      const resolved = path.resolve(dir, importPath);
      const exists = fs.existsSync(resolved) ||
                     fs.existsSync(resolved + '.js') ||
                     fs.existsSync(resolved + '.jsx') ||
                     fs.existsSync(resolved + '.json') ||
                     fs.existsSync(path.join(resolved, 'index.js')) ||
                     fs.existsSync(path.join(resolved, 'index.jsx')) ||
                     fs.existsSync(resolved + '.css');
      if (!exists) {
        missingImports.push({ file: path.relative(clientDir, file), importPath });
      }
    } else if (importPath.startsWith('@/')) {
      const sub = importPath.slice(2);
      const resolved = path.resolve(clientDir, 'src', sub);
      const exists = fs.existsSync(resolved) ||
                     fs.existsSync(resolved + '.js') ||
                     fs.existsSync(resolved + '.jsx') ||
                     fs.existsSync(resolved + '.json') ||
                     fs.existsSync(path.join(resolved, 'index.js')) ||
                     fs.existsSync(path.join(resolved, 'index.jsx')) ||
                     fs.existsSync(resolved + '.css');
      if (!exists) {
        missingImports.push({ file: path.relative(clientDir, file), importPath });
      }
    }
  }
}

console.log('Total files checked:', files.length);
console.log('Missing local/aliased imports:', missingImports);
