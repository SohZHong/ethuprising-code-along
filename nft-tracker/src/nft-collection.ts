import { NFTMinted as NFTMintedEvent } from '../generated/NFTCollection/NFTCollection';
import { NFTMinted } from '../generated/schema';

export function handleNFTMinted(event: NFTMintedEvent): void {
  let entity = new NFTMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.recipient = event.params.recipient;
  entity.tokenId = event.params.tokenId;
  entity.metadataCID = event.params.metadataCID;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
