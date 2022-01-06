// - - - - - - - - - - - - - - - - - - - //
// FUNCTIONS RELATED TO ENV VAR
// - - - - - - - - - - - - - - - - - - - //

const trueStrings = [
  'y',
  'yes',
  'Yes',
  'YES',
  'Y',
  'o',
  'oui',
  'Oui',
  'OUI',
  'O',
  't',
  'true',
  'True',
  'TRUE',
  'T'
]
// const falseStrings = [
//   'no',
//   'No',
//   'NO',
//   'NON',
//   'Non',
//   'non',
//   'n',
//   'N',
//   'false',
//   'False',
//   'FALSE',
//   'f',
//   'F'
// ]
export const chooseBooleanMode = (ARG) => {
  if (trueStrings.includes(ARG)) {
    return true
  } else {
    return false
  }
}

export const defaultLoc = 'fr'
export const defaultLocs = [
  {
    code: 'fr',
    name: 'Français',
    file: 'fr-FR.js'
  }
]

export const buildLocales = (localesString) => {
  if (localesString) {
    const locales = []
    const tempLocales = localesString.split(',')
    for (const loc of tempLocales) {
      const loc_ = loc.split(':')
      const obj = {
        code: loc_[0],
        name: loc_[1],
        iso: loc_[2],
        file: `${loc_[2]}.js`
      }
      locales.push(obj)
    }
    return locales
  }
}


export const logAllowed = ['preprod', 'dev', 'mockup']

export const choosePort = (ENVPROD, env) => {
  const NUXT_ENV_PORT_DEV = parseInt(env.NUXT_ENV_PORT_DEV) || 50050
  const NUXT_ENV_PORT_PREPROD =
    parseInt(env.NUXT_ENV_PORT_PREPROD) || 50051
  const NUXT_ENV_PORT_PROD = parseInt(env.NUXT_ENV_PORT_PROD) || 50052
  if (ENVPROD === 'dev') {
    return NUXT_ENV_PORT_DEV
  } else if (ENVPROD === 'preprod') {
    return NUXT_ENV_PORT_PREPROD
  } else if (ENVPROD === 'prod') {
    return NUXT_ENV_PORT_PROD
  }
}


export class configApp {
  constructor (RUN_MODE, env) {
    this.appVersion = env.npm_package_version
    this.appTitle = env.NUXT_ENV_APP_TITLE
  
    // DEV MODE - PORT - HOST ...
    this.mode = RUN_MODE
    this.host = env.NUXT_ENV_HOST
    this.port = choosePort(RUN_MODE, env)
    
    // CONFIG
    this.contentRepo = env.NUXT_ENV_REPO_CONTENTS
    this.configFile = env.NUXT_ENV_SITE_CONFIG

    // LOADING
    this.loadingColor = env.NUXT_ENV_LOADING_COLOR || '#fff'
    this.loadingHeight = `${ env.NUXT_ENV_LOADING_HEIGHT || 3 }px`
    this.loadingContinuous = env.NUXT_ENV_APP_LOADING_CONTINUOUS || true

    // INTERNATIONALIZATION
    this.defaultLocale = env.NUXT_ENV_LANG_DEFAULT_LOCALE || defaultLoc
    this.localesBuild =
      buildLocales(env.NUXT_ENV_LANG_DEFAULT_LOCALES) || defaultLocs

    // this.vuetifyThemes = {
    //   light : {
    //     primary: env.NUXT_ENV_THEME_LIGHT_primary || "#bc85ff",
    //     accent: env.NUXT_ENV_THEME_LIGHT_accent || "#572a99",
    //     secondary: env.NUXT_ENV_THEME_LIGHT_secondary || "#6fdcbf",
    //     info: env.NUXT_ENV_THEME_LIGHT_info || "#53657D",
    //     warning: env.NUXT_ENV_THEME_LIGHT_warning || "#ff9947",
    //     error: env.NUXT_ENV_THEME_LIGHT_error || "#D1335B",
    //     success: env.NUXT_ENV_THEME_LIGHT_success || "#03BD5B",
    //     white: '#fff'
    //   },
    //   dark : {
    //     primary: env.NUXT_ENV_THEME_DARK_primary || "#bc85ff",
    //     accent: env.NUXT_ENV_THEME_DARK_accent || "#572a99",
    //     secondary: env.NUXT_ENV_THEME_DARK_secondary || "#6fdcbf",
    //     info: env.NUXT_ENV_THEME_DARK_info || "#53657D",
    //     warning: env.NUXT_ENV_THEME_DARK_warning || "#ff9947",
    //     error: env.NUXT_ENV_THEME_DARK_error || "#D1335B",
    //     success: env.NUXT_ENV_THEME_DARK_success || "#03BD5B",
    //     white: '#fff'
    //   }
    // }
  }

}
