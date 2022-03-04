import Context, { ContextConfiguration } from "../context/Context";

/**
 * @class Upload - Is used to upload simple strings or JSON objects to IPFS
 */
export default class Upload {
    /**
     * Holds the global config that probably got manipulated based on the passed config object in the constructor
     * 
     * @var {Configuration} config
     * 
     * @private
     */
    private config: Context;

    /**
     * Holds the value to be uploaded to IPFS
     * 
     * @var {string} data 
     * 
     * @private
     */
    private data: string;

    /**
     * @param {string | object} data - Data to upload to IPFS. Can be a object or string.
     * @param {ContextConfiguration} config - The optional config object to pass in case specific configuration properties have to be overwritten for this case 
     * 
     * @constructor
     */
    constructor(data: string | object, config?: ContextConfiguration) {
        this.config = Context.get(config);
        this.setData(data);
    }

    /**
     * Setter for the data property that stringifies the given object and otherwise just sets the value as expected
     * 
     * @method setData
     * 
     * @private 
     * 
     * @param {string | object} data - The data that later on will get uploaded to IPFS 
     * 
     * @returns {void}
     */
    private setData(data: string | object): void {
        if (typeof data === 'object') {
            this.data = JSON.stringify(data);
        
            return;
        }

        this.data = data;
    }

    /**
     * Uploads the given data to IPFS
     * 
     * @method upload
     * 
     * @public
     * 
     * @returns {Promise<AddResult>} - Object returning the CID, data size, path, mode, and timestamp
     */
    public upload(): Promise<AddResult> {
        return this.config.ipfs.add(this.data);
    }
}