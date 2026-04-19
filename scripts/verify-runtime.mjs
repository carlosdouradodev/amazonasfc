const VERSION_20 = [20, 19, 0];
const VERSION_22 = [22, 12, 0];

function parseVersion(value) {
  return String(value)
    .split(".")
    .map((part) => Number.parseInt(part, 10));
}

function compareVersions(left, right) {
  const length = Math.max(left.length, right.length);

  for (let index = 0; index < length; index += 1) {
    const leftPart = left[index] ?? 0;
    const rightPart = right[index] ?? 0;

    if (leftPart > rightPart) return 1;
    if (leftPart < rightPart) return -1;
  }

  return 0;
}

function isSupported(version) {
  const major = version[0] ?? 0;

  if (major === 20) {
    return compareVersions(version, VERSION_20) >= 0;
  }

  if (major === 22) {
    return compareVersions(version, VERSION_22) >= 0;
  }

  return major > 22;
}

const currentVersion = parseVersion(process.versions.node);

if (!isSupported(currentVersion)) {
  console.error(
    [
      `Node.js ${process.versions.node} is not supported by this project.`,
      "Use Node.js 20.19.0+ or 22.12.0+.",
      "The repository now ships .nvmrc with 20.19.0 as the default baseline.",
    ].join("\n"),
  );
  process.exit(1);
}

console.log(`Node.js ${process.versions.node} satisfies the project runtime requirement.`);
