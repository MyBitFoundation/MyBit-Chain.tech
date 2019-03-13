var fs = require("fs");
var path = require('path');
var appRoot = path.resolve(__dirname);

module.exports = (function (){
  var addresses = require('./contracts.json');

  return {
    MyBit: function(){
      return addresses.MyBitToken;
    },

    ERC20Burner: function(){
      return addresses.ERC20Burner;
    },

    Database: function(){
      return addresses.Database;
    },

    Events: function(){
      return addresses.Events;
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

    /*AccessHierarchy: function(){
      return addresses.AccessHierarchy;
    },*/

    Platform: function(){
      return addresses.Platform;
    },

    Operators: function(){
      return addresses.Operators;
    },

    AssetGovernance: function(){
      return addresses.AssetGovernance;
    },

    AssetManagerEscrow: function(){
      return addresses.AssetManagerEscrow;
    },

    AssetManagerFunds: function(){
      return addresses.AssetManagerFunds;
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
