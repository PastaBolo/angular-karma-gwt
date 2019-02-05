import { Rule, SchematicContext } from '@angular-devkit/schematics'
import { Tree } from '@angular-devkit/schematics/src/tree/interface'
import {
  getPackageJsonDependency,
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType
} from '@schematics/angular/utility/dependencies'

import { getJson } from './json-utils'

export function addPackageJsonDependencies(dependencies: NodeDependency[]): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    dependencies.forEach(dependency => addPackageJsonDependency(tree, dependency))
  }
}

export function movePackageToDevDependencies(name: string): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageDependency = getPackageJsonDependency(tree, name)
    if (packageDependency) {
      addPackageJsonDependency(tree, { ...packageDependency, type: NodeDependencyType.Dev })
      removePackageJsonDependency(tree, packageDependency.name)
    }
  }
}

function removePackageJsonDependency(
  tree: Tree,
  name: string,
  type: NodeDependencyType = NodeDependencyType.Default
) {
  const packageJson = getJson(tree)
  delete packageJson[type][name]
  tree.overwrite('./package.json', JSON.stringify(packageJson, null, 2))
}
