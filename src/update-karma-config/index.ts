import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  noop,
  mergeWith,
  apply,
  url,
  move
} from '@angular-devkit/schematics'
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks'
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType
} from '@schematics/angular/utility/dependencies'

import { Schema as UpdateKarmaConfigOptions } from './schema'

export default function(options: UpdateKarmaConfigOptions): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([
      (_tree: Tree, context: SchematicContext) => {
        !options.skipInstall ? context.addTask(new NodePackageInstallTask()) : noop()
      },
      addDependencies(),
      updateKarmaConfig(),
      updateTsConfigSpec()
    ])
  }
}

function addDependencies(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      { name: 'jasmine-given', version: '*', type: NodeDependencyType.Dev },
      { name: 'karma-jasmine-given', version: '*', type: NodeDependencyType.Dev },
      { name: '@types/jasmine-given', version: '*', type: NodeDependencyType.Dev },
      { name: 'karma-mocha-reporter', version: '*', type: NodeDependencyType.Dev },
      { name: 'karma-jasmine-diff-reporter', version: '*', type: NodeDependencyType.Dev }
    ]
    dependencies.forEach(dependency => addPackageJsonDependency(tree, dependency))
  }
}

function updateKarmaConfig(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    if (tree.exists('./src/karma.conf.js')) tree.delete('./src/karma.conf.js')
    return mergeWith(apply(url('./files'), [move('./')]))
  }
}

function updateTsConfigSpec(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const json = JSON.parse(tree.read('./src/tsconfig.spec.json')!.toString('utf-8'))
    const types: string[] = json.compilerOptions.types

    if (!types.includes('jasmine-given')) {
      types.push('jasmine-given')
      tree.overwrite('./src/tsconfig.spec.json', JSON.stringify(json, null, 2))
    }
  }
}
