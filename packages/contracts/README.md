# Aragon V2 DAO Contract Framework

This project contains the Aragon V2 DAO Contracts.

It uses hardhat to compile, build, deploy and test contracts.

```shell
npx hardhat compile
REPORT_GAS=true npx hardhat test
```

# Etherscan verification

To use etherscan contract verification service, you need to get the ethersacn api key and set it in the hardhat.config.ts file

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Aragon!"
```

