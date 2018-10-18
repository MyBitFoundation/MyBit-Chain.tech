<p align="center">
  <a href="https://mybit.io/">
    <img alt="MyBit Logo" src="https://files.mybit.io/favicons/favicon-96x96.png" width="70">
  </a>
</p>

# MyBit-Chain.tech
A pre-deployed Ethereum blockchain containing all the core contract of the MyBit Network.

## Set up
To start the blockchain, first install dependencies:
```bash
npm install
```
Then run:
```bash
yarn start
```
You should see a response that looks like the following:
```
err null
blockchain { vmErrorsOnRPCResponse: true,
  verbose: false,
  asyncRequestProcessing: false,
  logger: { log: [Function: log] },
  ws: true,
  network_id: 70,
  total_accounts: 20,
  db_path: '~/MyBit/MyBit-Chain.tech/chain',
  mnemonic: 'myth like bonus scare over problem client lizard pioneer submit female collect',
  seed: 'hCJFiW7pWu',
  gasPrice: '0x77359400',
  default_balance_ether: 100,
  unlocked_accounts: [],
  hdPath: 'm/44\'/60\'/0\'/0/',
  gasLimit: '0x6691b7',
  defaultTransactionGasLimit: '0x15f90',
  time: null,
  debug: false,
  allowUnlimitedContractSize: false }
```

Now you have a working blockchain running on port 8545!


## Accounts
The chain has 20 accounts seeded with ~100 Eth each. For convenience, we've included a list of the accounts at [accounts.json](https://github.com/MyBitFoundation/MyBit-Chain.tech/blob/master/accounts.json).

All MyBit Network contracts have accounts[0] as their owner. The platform owner is the account that receives platform fees from crowdsales, has the right to pause contracts, create contracts that can interact with the database, sets burn fees, and onboard operators.

## Contracts
All contract addresses are located in [addresses.json](https://github.com/MyBitFoundation/MyBit-Chain.tech/blob/master/addresses.json). The contract addresses are exported for use in [index.js](https://github.com/MyBitFoundation/MyBit-Chain.tech/blob/master/index.js). If you're using the chain in a node.js project, you must simply import this package ([@mybit/chain](https://www.npmjs.com/package/@mybit/chain)) to get the deployed contract's addresses.

What follows is the current state of the chain and how each contract interacts with others:

### [MyBitToken](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/tokens/erc20/BurnableToken.sol)
This contract represents the [MyB token](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/tokens/erc20/BurnableToken.sol) that MyBit Network runs on. Many functions require MyB tokens to be burnt in order to access their services. Burning of tokens is handled by [ERC20Burner](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/access/ERC20Burner.sol).

### [ERC20Burner](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/access/ERC20Burner.sol)
The ERC20Burner contract works by receiving approval from a user to burn a certain amount of the user's tokens (this amount is set by the user). Any function that requires burning must then call ERC20Burner.burn() before providing any functionality. For security, only approved contracts may access ERC20Burner's burn() function. All burning functions currently charge 250 MyB, although that is subject to change. Here are the functions that currently require MyB burning:

- CrowdsaleGeneratorETH.createAssetOrderETH()
- CrowdsaleETH.buyAssetOrderETH()
- CrowdsaleGeneratorERC20.createAssetOrderERC20()
- CrowdsaleERC20.buyAssetOrderERC20()
- AssetExchange.buyAsset()
- AssetExchange.createBuyOrder()

### [Database](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/database/Database.sol)
The database is the hub of the MyBit Network. All variables are stored in the database as bytes32 hashes. This way, we can upgrade and replace contracts without losing any user or asset data. Only approved contracts may write to the database. The approval of contracts is controlled by [ContractManager](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/database/ContractManager.sol).

### [ContractManager](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/database/ContractManager.sol)
The contract manager is the contract that adds or removes write privileges for all other contracts in the MyBit Network. Additionally, it protects user's MyB tokens from being burned or transferred away in a security breach. By requiring that users approve the current state of network, any contracts that get added to the network also require a renewal of user's burning approval.

### [API](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/database/API.sol)
The [API](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/database/API.sol) provides getter functions to access important values from the database. There are too many functions to list here, so please review the contract at the link provided.

### [SingleOwned](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/ownership/SingleOwned.sol)
MyBit-Chain currently only allows a single owner to control the platform. Although, this won't be the case on the MyBit Go platform which will either have a multi-sig or DAO structure. However, for testing the features of the MyBit Network, one owner is perfectly sufficient. The SingleOwned contract simply gives one the ability to change ownership to another account or contract.

### [Pausible](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/ownership/Pausible.sol)
The Pausible contract gives the owner the ability to stop the functions of any contract. This is useful when upgrading or if a flaw is found in a contract, the owner has the ability to act quickly to protect user's assets.

### [PlatformFunds](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/ecosystem/PlatformFunds.sol)
PlatformFunds contract just sets the platform token and platform wallet. Currently, these are set to our MyB token and the accounts[0], respectively.

### [Operators](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/roles/Operators.sol)
This contract is used by the owner to onboard new operators. The owner passes a URI and address to Operators.registerOperator() and receives an operatorID which is used for the creation of assets in the crowdsale contracts. By restricting who can become an operator, platform owners are able to carefully vet who will be receiving investment and ensure they are a trustworthy third party.

### [AssetManagerEscrow](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/roles/AssetManagerEscrow.sol)
Asset manager escrow is a contract that can optionally be implemented at the start of a crowdsale. It allows an asset manager to stake MyB tokens on the successful return of investment on the asset they are trying to fund. This means that an asset manager will (hopefully) stay beholden to his/her investors because investors can vote to burn the manager's escrow if they do not fulfill their duties. Although not required, it is encouraged that asset managers stake tokens as its a good sign to investors that they have 'skin in the game' and will ensure that the operators issue dividends via the asset token.

### [CrowdsaleGeneratorETH](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/crowdsale/CrowdsaleGeneratorETH.sol) & [CrowdsaleGeneratorERC20](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/crowdsale/CrowdsaleGeneratorERC20.sol)
The crowdsale generator contracts are used by the asset manager to begin a crowdsale to invest in an asset. They set the funding goal, deadline, their fee (as a percentage), operatorID, and asset URI. There are two contracts with very similar functionality, their only difference is one accepts funding in Ether and the other accepts funding in any ERC-20 token. So, for example, if an operator needs funds in USD, the asset manager may choose to fund the asset in Dai to avoid any uncertainties caused by price fluctuations. However, by accepting funds in an ERC-20, it is assumed that dividends will be paid out in the same ERC-20 token.

On creation of a crowdsale, a unique DividenToken is created by this contract. The tokens are ERC-20 compatible, so they can be transferred to other accounts or sold on an exchange. All profits from an asset are meant to be paid directly to this token and they will be distributed according to the number of tokens held by a user.

### [CrowdsaleETH](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/crowdsale/CrowdsaleETH.sol) & [CrowdsaleERC20](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/crowdsale/CrowdsaleERC20.sol)
The two crowdsale contracts (ETH & ERC20) are used by investors to fund an asset. Users pay to fund an asset and are immediately minted an equal amount of dividend tokens that represent the asset. Upon completion of a crowdsale, additional dividend tokens are minted to cover the asset manager's fees. Now, as dividends are issued to the asset token, investors and the asset manager will receive their shares which they can withdraw by calling the withdraw() function of their asset token.

If a crowdsale fails, user funds are return to the users via their recently minted tokens - just as if they we dividend payments. After the refund() function is called on the crowdsale contract, a user can withdraw their funds by calling their token's withdraw() function.

### [AssetExchange](https://github.com/MyBitFoundation/MyBit-Network.tech/blob/master/contracts/ecosystem/AssetExchange.sol)
If an investor wants to buy and sell assets that have already been funded, they can do so with the AssetExchange contract. A user can create a buy or sell order and any other user can fill that order. All assets are bought and sold with Ether, regardless of what they were originally funded with, or what they pay out with.
