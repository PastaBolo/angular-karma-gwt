# Angular-karma-gwt Schematics

Add automatically useful testing packages in an Angular workspace

- [jasmine-given](https://github.com/searls/jasmine-given) : write your test with jasmine in BDD style with `Given, When, Then` functions
- [karma-mocha-reporter](https://github.com/litixsoft/karma-mocha-reporter) : change the cli reporter

## 1 - Go in the Angular workspace

Go in the Angular workspace if it already exists

Or create a new one :

```
ng new <my-workspace>
```

## 2 - Install the Schematics

```
npm i -D angular-karma-gwt
```

## 3 - Usage

```
ng generate angular-karma-gwt:update-karma-config
```

---

## This schematic makes these steps automatically

**NB** : This will replace the entire `karma.conf.js` file

1 - install packages

- jasmine-given
- karma-jasmine-given
- @types/jasmine-given
- karma-mocha-reporter
- karma-jasmine-diff-reporter

```
npm i -D jasmine-given karma-jasmine-given @types/jasmine-given karma-mocha-reporter karma-jasmine-diff-reporter
```

2 - Add plugins in karma.conf.js

- `require('karma-jasmine-given')`
- `require('karma-mocha-reporter')`
- `require('karma-jasmine-diff-reporter')`

3 - Add frameworks `jasmine-given` in karma.conf.js

4 - Change reporters array in karma.conf.js

- `reporters: ['jasmine-diff', 'mocha']`

5 - Add jasmine-diff-reporter config

```javascript
{
  jasmineDiffReporter: {
    color: {
      expectedBg: 'bgMagenta',
      expectedWhitespaceBg: 'bgMagenta',
      actualBg: 'bgBlue',
      actualWhitespaceBg: 'bgBlue'
    },
    legacy: true
  }
}
```

6 - Add mocha-reporter config

```javascript
{
  mochaReporter: {
    output: 'minimal'
  }
}
```

7 - Remove kjhtml reporter

- remove `'karma-jasmine-html-reporter'` in plugins array
- remove `'kjhtml'` in reporters array

8 - Add `"jasmine-given"` to types array in tsconfig.spec.json file
