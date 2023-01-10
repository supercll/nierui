// @ts-nocheck
import fs from 'fs'
import { baseParse } from '@vue/compiler-core'

export function VitePluginVueDemo() {
  return {
    name: 'vite-plugin-demo',
    transform(code, id) {
      if (
        !/\/src\/demos\/.*\.demo\.vue/.test(id) ||
        !/vue&type=demo/.test(id)
      ) {
        return
      }

      let path = `.${id.match(/\/src\/demos\/.*\.demo\.vue/)[0]}`
      const file = fs.readFileSync(path).toString()
      const parsed = baseParse(file).children.find(n => n.tag === 'demo')
      const title = parsed.children[0].content
      const main = file.split(parsed.loc.source).join('').trim()

      return `export default function (Component) {
  Component.__sourceCode = ${JSON.stringify(main)}
  Component.__sourceCodeTitle = ${JSON.stringify(title)}
}`.trim()
    },
  }
}
