import { DataSourceTemplate } from '@graphprotocol/graph-ts';
import { CollectionCreated as CollectionCreatedEvent } from '../generated/NFTFactory/NFTFactory';
import { CollectionCreated, DataRelation } from '../generated/schema';

export function handleCollectionCreated(event: CollectionCreatedEvent): void {
  DataSourceTemplate.create('NFTCollection', [
    event.params.collectionAddress.toHex(),
  ]);

  let relation = DataRelation.load(event.params.creator);
  if (!relation) {
    relation = new DataRelation(event.params.creator);
    relation.user = event.params.creator;

    relation.save();
  }

  let entity = new CollectionCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  // Link the CollectionCreated table to DataRelation table
  entity.relation = relation.id;
  entity.collectionAddress = event.params.collectionAddress;
  entity.creator = event.params.creator;
  entity.name = event.params.name;
  entity.symbol = event.params.symbol;
  entity.baseURI = event.params.baseURI;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
