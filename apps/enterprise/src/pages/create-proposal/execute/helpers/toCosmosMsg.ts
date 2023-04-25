import { Msg, MsgExecuteContract } from "@terra-money/terra.js";
import { CosmosMsg } from "chain/cosmos/CosmosMsg";
import { fromBase64 } from "chain/utils/fromBase64";

interface ToCosmosMsgParams {
  sender: string
  msg: string
}

export const toCosmosMsg = ({ sender, msg }: ToCosmosMsgParams): Msg | undefined => {
  const cosmosMsg = JSON.parse(msg) as CosmosMsg

  if (cosmosMsg?.wasm?.execute) {
    const { contract_addr, msg, funds } = cosmosMsg.wasm.execute

    return new MsgExecuteContract(sender, contract_addr, fromBase64(msg), funds)
  }
}