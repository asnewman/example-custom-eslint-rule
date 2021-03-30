import { rules } from './index'
import { RuleTester } from 'eslint'

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } })

const prefixErrors = ['Styled Component variable found but not prefixed with SC']

const prefixCheckRule = rules['sc-prefix']

ruleTester.run('prefix-check', prefixCheckRule, {
  valid: [
    {
      code: 'const SCHello = styled.div`width: 50px`;',
      filename: 'foo.tsx'
    },
    {
      code: 'const SCHello = Styled.div`width: 50px`;',
      filename: 'foo.tsx'
    },
    {
      code: 'const SCWorld = styled.p`font-size: 50px`;',
      filename: 'foo.tsx'
    },
    {
      code: 'const SCWorld = styled(SCHello)`width: 100px`;',
      filename: 'foo.tsx'
    }
  ],
  invalid: [{
    code: 'const Hello = styled.div``;',
    filename: 'foo.tsx',
    errors: prefixErrors
  },
  {
    code: 'const Hello = Styled.div``;',
    filename: 'foo.tsx',
    errors: prefixErrors
  }
  ]
})
