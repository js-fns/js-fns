import { readdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const srcDir = resolve(process.cwd(), 'src')

const exportLines = readdirSync(srcDir)
  .filter((file) => file !== 'index.ts')
  .reduce<string[]>(
    (acc, file) =>
      acc.concat(
        `export * from './${file}/index'`,
        `export { default as ${file} } from './${file}/index'`
      ),
    []
  )

writeFileSync(resolve(srcDir, 'index.ts'), exportLines.join('\n'))
