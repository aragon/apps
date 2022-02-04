# Zaragoza Subgraph

## Quick Start

Ensure the monorepo’s dependencies are installed:

```console
yarn
```

## Build Contracts

make sure the Contracts package is compiled:

```console
yarn build:contracts
```

## Build & deploy the subgraph

Make sure proper env variables are provided as explained bellow:

- `<GRAPH_KEY>`: The Graph key (this is only needed when deploying on The Graph).
- `<THEGRAPH_USERNAME>`: username of your subgraph (usually your GitHub username).
- `<SUBGRAPH_NAME>`: name of the subgraph.
- `<NETWORK_NAME>`: one of the supported networks by subgraph.

You can build and deploy the subgraph using a single `yarn deploy` command:

```console
yarn deploy
```

## Build only

Generate the `subgraph.yaml` file corresponding to your network:

```console
yarn manifest
```

You can now run the `build` command, which will generate the types and compile the subgraph:

```console
yarn build
```

You are now ready to deploy the subgraph using [the `graph deploy` command](https://thegraph.com/docs/deploy-a-subgraph).

### Test the subgraph

build the the contracts as explained above.
build the subgraph as explained above

run tests via docker:

```console
yarn test:docker
```

however due to matchstick not supporting monorepo as of now, using docker for testing might not be practical during developing process, a work arround could be copying the entire /node_modules from stand alone subgraph project and pasting it in packages/subgraph only for development purposes.

### Deploy the subgraph locally

You have the option to deploy your subgraph locally, this is how you can do it.

Clone the Graph node repository somewhere on your computer:

```console
git clone git@github.com:graphprotocol/graph-node.git
```

Edit the file `graph-node/docker/docker-compose.yml` to make the [`ethereum` field](https://github.com/graphprotocol/graph-node/blob/ce9aa01dcc18029122f1cf3e8f6941ffffd7653e/docker/docker-compose.yml#L20) point to the Ethereum node of your choice. Make sure this node is connected to the same Ethereum network than the one expected by your subgraph.

Run the Graph node using docker-compose. It will start the Graph node itself, but also a PostgreSQL database and an IPFS, which are used by the Graph node.

```console
cd graph-node/docker
docker-compose up
```

You are now ready to deploy your subgraph.

Go back to the subgraph directory (`packages/zaragoza-subgraph`), and create the subgraph on your local node:

```console
graph create aragon/aragon-zaragoza-<DESIRED_NETWORK> \
  --node http://localhost:8020
```

Then deploy it:

```console
graph deploy aragon/aragon-zaragoza<DESIRED_NETWORK> \
  --ipfs http://localhost:5001 \
  --node http://localhost:8020
```

To stop the Graph node, go back to its directory and run `docker-compose down`. It will also create a `data` directory: remember to delete it if you want to start again.

See [the Graph documentation](https://thegraph.com/docs/quick-start) for more details on how to run The Graph locally.
