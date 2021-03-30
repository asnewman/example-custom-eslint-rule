/**
 * @fileoverview Rule to enforce SC prefixed Styled Components
 * @author Ashley Newman
 */

'use strict'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports.rules = {
  'sc-prefix': {
    meta: {
      type: 'suggestion',

      docs: {
        description: 'prefix styled components with SC',
        category: 'Stylistic Issues',
        recommended: true,
        url: 'https://github.com/imperfectproduce'
      },
      fixable: 'code',
      schema: [] // no options
    },
    create: function (context) {
      return {
        VariableDeclarator: function (node) {
        // Find variables initialized with Styled or styled
          if (node.init.tag &&
              node.init.tag.object &&
              /[Ss]tyled/g.test(node.init.tag.object.name)) {
          // Check to see if prefixed with SC
            if (!/SC\w+/g.test(node.id.name)) {
              context.report({
                node,
                message: 'Styled Component variable found but not prefixed with SC',
                fix: function (fixer) {
                  return fixer.insertTextBefore(node, 'SC')
                }
              })
            }
          }
        }
      }
    }
  }
}
