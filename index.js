module.exports = function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(nodePath, stats) {
        const { packages } = stats.opts;
        const { specifiers } = nodePath.node;

        const spcs = [];
        for (const spec of specifiers) {
          if (t.isImportNamespaceSpecifier(spec) && packages.includes(spec.local.name)) {
          	spcs.push(t.importDefaultSpecifier(spec.local));
          } else {
            spcs.push(spec);
          }
        }
        nodePath.node.specifiers = spcs;
      },
    },
  };
};
