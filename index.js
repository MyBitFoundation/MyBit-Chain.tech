var fs = require("fs");
var path = require('path');
var appRoot = path.resolve(__dirname);

module.exports = (function (){
  var addresses = require('./addresses.json');

  return {
    MyBit: function(){
      return addresses.MyBit;
    },

    ERC20Burner: function(){
      return addresses.ERC20Burner;
    },

    Database: function(){
      return addresses.Database;
    },

    ContractManager: function(){
      return addresses.ContractManager;
    },

    API: function(){
      return addresses.API;
    },

    SingleOwned: function(){
      return addresses.SingleOwned;
    },

    Pausible: function(){
      return addresses.Pausible;
    },

    AccessHierarchy: function(){
      return addresses.AccessHierarchy;
    },

    PlatformFunds: function(){
      return addresses.PlatformFunds;
    },

    Operators: function(){
      return addresses.Operators;
    },

    BrokerEscrow: function(){
      return addresses.BrokerEscrow;
    },

    CrowdsaleETH: function(){
      return addresses.CrowdsaleETH;
    },

    CrowdsaleGeneratorETH: function(){
      return addresses.CrowdsaleGeneratorETH;
    },

    CrowdsaleERC20: function(){
      return addresses.CrowdsaleERC20;
    },

    CrowdsaleGeneratorERC20: function(){
      return addresses.CrowdsaleGeneratorERC20;
    },

    AssetGenerator: function(){
      return addresses.AssetGenerator;
    },

    AssetExchange: function(){
      return addresses.AssetExchange;
    }
  }
})();
