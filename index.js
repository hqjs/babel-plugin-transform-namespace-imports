module.exports = function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(nodePath, stats) {
        const { packages } = stats.opts;
        const { specifiers } = nodePath.node;

        const spcs = [];
        for (const spec of specifiers) {
          console.log(t.isImportNamespaceSpecifier(spec));
          if (t.isImportNamespaceSpecifier(spec) && packages.includes(spec.local.name)) {
          	spcs.push(t.importDefaultSpecifier(spec.local));
          } else {
            spcs.push(spec);
          }
        }
        console.log(spcs);
        nodePath.node.specifiers = spcs;
      },
    },
  };
};
