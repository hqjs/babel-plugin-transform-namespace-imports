module.exports = function({ types: t }) {
  const objectKeys = t.memberExpression(
    t.identifier('Object'),
    t.identifier('keys')
  );
  const length = t.identifier('length');
  const one = t.numericLiteral(1);

  return {
    visitor: {
      ImportDeclaration(nodePath, stats) {
        const { include = [], exclude = [] } = stats.opts;
        const { specifiers, source } = nodePath.node;

        const spcs = [];
        for (const spec of specifiers) {
          if (t.isImportNamespaceSpecifier(spec) && include.includes(source.value)) {
            spcs.push(t.importDefaultSpecifier(spec.local));
          } else if (t.isImportNamespaceSpecifier(spec) && !exclude.includes(source.value)) {
            const name = nodePath.scope.generateUidIdentifierBasedOnNode('namespace');
            spcs.push(t.importNamespaceSpecifier(name));
            const exportDefault = t.memberExpression(
              name,
              t.identifier('default')
            );
            const assignment = t.variableDeclaration(
              'const',
              [t.variableDeclarator(
                spec.local,
                t.conditionalExpression(
                  t.logicalExpression(
                    '&&',
                    t.binaryExpression(
                      '===',
                      t.memberExpression(
                        t.callExpression(
                          objectKeys,
                          [name]
                        ),
                        length
                      ),
                      one
                    ),
                    exportDefault
                  ),
                  exportDefault,
                  name
                )
              )]
            );
          nodePath.insertAfter(assignment);
          } else {
            spcs.push(spec);
          }
        }
        nodePath.node.specifiers = spcs;
      },
    },
  };
};
