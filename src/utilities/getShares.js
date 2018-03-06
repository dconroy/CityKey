import CityCardContract from "../utilities/CityCardContract";

async function getShares(addr, actions) {
  actions.getCurrentSharesREQUEST();
  CityCardContract.getIdentity.call(addr, (error, card) => {
    if (error) {
      actions.getCurrentSharesERROR(error);
      throw error;
    }
    console.log(card);
    actions.getCurrentSharesSUCCESS(card);
    return card;
  });
}

export default getShares;

// 0x06942e70D50485be7eb0F65f998C65E899A2BFA5
// "12345", "Zach Gollwitzer", "393 Pine Way", "St. Louis", 63547, "02/15/1995"
