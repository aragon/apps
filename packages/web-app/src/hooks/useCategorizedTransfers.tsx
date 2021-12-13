import {getDateSections} from 'utils/date';

export default function useCategorizedTransfers() {
  const sections = getDateSections();

  /**
   * Note: In this Hook we should split the transfer data
   *
   * @params is a list of transfers
   *
   * @return should be a object with params with list of transfers for each section. Also
   * It's possible to save data directly on context api
   *
   */

  return null;
}
