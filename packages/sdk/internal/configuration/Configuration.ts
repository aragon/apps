import { DAO_FACTORY_ADDRESS } from './ConfigDefaults'

export interface ConfigurationObject {
  subgraphURL?: string
  daoFactoryAddress?: string
}

let defaultConfig: Configuration
const subgraphURL = ''

/**
 * @class Configuration
 */
export default class Configuration {
  /**
   * Holds the validated configuration object
   *
   * @var config
   *
   * @private
   */
  private config: {
    subgraphURL: string
    daoFactoryAddress: string
  }

  /**
   * @param {Object} config
   *
   * @constructor
   */
  constructor(config: any) {
    this.setConfig(config)
  }

  /**
   * TODO: Use a ConfigurationError object
   *
   * Does set and parse the given configuration object
   *
   * @method setConfig
   *
   * @returns {void}
   *
   * @private
   */
  private setConfig(config: any): void {
    if (!config.subgraphURL) {
      throw new Error('Missing subgraph URL!')
    }

    if (!config.daoFactoryAddress) {
      throw new Error('Missing DAO factory address!')
    }

    this.config = {
      subgraphURL: config.subgraphURL,
      daoFactoryAddress: config.daoFactoryAddress
    }
  }

  /**
   * Getter for subgraphURL
   *
   * @var subgraphURL
   *
   * @returns {string}
   *
   * @public
   */
  get subgraphURL(): string {
    return this.config.subgraphURL
  }

  /**
   * Getter for daoFactoryAddress property
   *
   * @var daoFactoryAddress
   *
   * @returns {string}
   *
   * @public
   */
  get daoFactoryAddress(): string {
    return this.config.daoFactoryAddress
  }

  /**
   * Static setter/factory method of the Configuration class
   *
   * @method set
   *
   * @param {ConfigurationObject} config
   *
   * @returns {void}
   *
   * @public
   */
  static set(config?: ConfigurationObject): void {
    if (!config) {
      config = {}
    }

    if (!config.subgraphURL) {
      config.subgraphURL = subgraphURL
    }

    if (!config.daoFactoryAddress) {
      config.daoFactoryAddress = DAO_FACTORY_ADDRESS
    }

    defaultConfig = new Configuration(config)
  }

  /**
   * Static getter for the defaultConfig (used in the public API layer)
   *
   * @method get
   *
   * @returns {Configuration}
   *
   * @public
   */
  static get(): Configuration {
    if (typeof defaultConfig !== 'undefined') {
      return defaultConfig
    }

    Configuration.set()

    return defaultConfig
  }
}
