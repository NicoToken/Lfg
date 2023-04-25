export interface WasmMsg {
  execute?: {
    contract_addr: string;
    msg: any;
    funds?: any;
  };
}

export interface CosmosMsg {
  wasm?: WasmMsg
}