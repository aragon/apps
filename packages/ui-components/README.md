# Zaragoza UI package

## What

This package contains the building block for the Zaragoza web-app. It is directly based on Aragon's design system.

The package is written in typescript and powered by TSDX. The repository also contains a storybook. This allows us to publish the components in isolation, in order to visually present and document them.

## How

Developing the component library in isolation is simple. Make changes, run tests, build the library.

### Storybook

Storybook helps to develop the components, as it allows to visually inspect and document them. Storybook can be run in development mode using `yarn storybook`. This provides the usual hot-reload development environment. To get a deployable version of the Storybook, one can do `yarn-build`, which creates a static build of the story book web-app.

### Workspace

This package is used in the `web-app` package of the `zaragoza` mono-repo. In situations where one needs to work on both at the same time, one can do `yarn watch` in this package. This will launch `tsdx` in watch mode, which rebuilds the `dist` folder (holding the compiled and exported code) on changes to the source code. The changes will therefore be immediately available in the `web-app` package.

## Github Automatic NPM releases

This packages supports the automatic creation of NPM releases based on labels set on the pull request merged.  
This tables shows how the labels are mapped to the NPM release type.
| Label | Release type |
| ------ | ------------ |
| `ui-components:major` | `major` |
| `ui-components:minor` | `minor` |
| `ui-components:patch` | `patch` |

After the merge a new github tag gets created and this tag triggers the publishing workflow.  
To release a new version manually just create a git tag in this format:  
`MAJOR.MINOR.PATCH-ui-components`

Be aware that this way the version in package.json will **not** be updated and this have to happend manually before creating the git tag.
