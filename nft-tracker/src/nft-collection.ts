import { NFTMinted as NFTMintedEvent } from '../generated/NFTCollection/NFTCollection';
import { DataRelation, NFTMinted } from '../generated/schema';

export function handleNFTMinted(event: NFTMintedEvent): void {
  let relation = DataRelation.load(event.params.recipient);
  if (!relation) {
    relation = new DataRelation(event.params.recipient);
    relation.user = event.params.recipient;

    relation.save();
  }

  let entity = new NFTMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.relation = relation.id;
  entity.recipient = event.params.recipient;
  entity.tokenId = event.params.tokenId;
  entity.metadataCID = event.params.metadataCID;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
