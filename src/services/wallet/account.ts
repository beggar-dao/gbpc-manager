import { request } from "@umijs/max";
import { AccountTransactionParams, AccountTransactionResponse } from "../types/account";

/**
 * Get account transaction list
 * @params AccountTransactionParams - Account transaction list params
 * @returns Promise<AccountTransactionResponse>
 */
export function getAccountTransactionList(params: AccountTransactionParams): Promise<AccountTransactionResponse> {
  return request<AccountTransactionResponse>(`/wallet/account/transaction`, {
    method: 'GET',
    params,
  });
}
