import { Rule, SchematicContext, Tree, chain, schematic } from '@angular-devkit/schematics'

import { Schema as UpdateKarmaConfigOptions } from '../update-karma-config/schema'
import { movePackageToDevDependencies } from '../utility/dependencies'
import { packageName } from '../utility/utils'

export default function(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([
      schematic<UpdateKarmaConfigOptions>('update-karma-config', {}),
      movePackageToDevDependencies(packageName('../../package.json'))
    ])
  }
}
