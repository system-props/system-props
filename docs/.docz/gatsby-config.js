const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Docz Example Typescript',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: true,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/Users/rfarrer/repos/system-props/docs/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Docz Example Typescript',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/rfarrer/repos/system-props/docs',
          templates:
            '/Users/rfarrer/repos/system-props/docs/node_modules/docz-core/dist/templates',
          docz: '/Users/rfarrer/repos/system-props/docs/.docz',
          cache: '/Users/rfarrer/repos/system-props/docs/.docz/.cache',
          app: '/Users/rfarrer/repos/system-props/docs/.docz/app',
          appPackageJson: '/Users/rfarrer/repos/system-props/docs/package.json',
          appTsConfig: '/Users/rfarrer/repos/system-props/docs/tsconfig.json',
          gatsbyConfig:
            '/Users/rfarrer/repos/system-props/docs/gatsby-config.js',
          gatsbyBrowser:
            '/Users/rfarrer/repos/system-props/docs/gatsby-browser.js',
          gatsbyNode: '/Users/rfarrer/repos/system-props/docs/gatsby-node.js',
          gatsbySSR: '/Users/rfarrer/repos/system-props/docs/gatsby-ssr.js',
          importsJs:
            '/Users/rfarrer/repos/system-props/docs/.docz/app/imports.js',
          rootJs: '/Users/rfarrer/repos/system-props/docs/.docz/app/root.jsx',
          indexJs: '/Users/rfarrer/repos/system-props/docs/.docz/app/index.jsx',
          indexHtml:
            '/Users/rfarrer/repos/system-props/docs/.docz/app/index.html',
          db: '/Users/rfarrer/repos/system-props/docs/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
