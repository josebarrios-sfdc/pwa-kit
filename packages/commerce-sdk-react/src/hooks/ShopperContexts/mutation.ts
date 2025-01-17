/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {ApiClients, ApiMethod, Argument, CacheUpdateGetter, DataType, MergedOptions} from '../types'
import {useMutation} from '../useMutation'
import {UseMutationResult} from '@tanstack/react-query'
import {NotImplementedError} from '../utils'
import useCommerceApi from '../useCommerceApi'
import {cacheUpdateMatrix} from './cache'

type Client = ApiClients['shopperContexts']

/** Mutations available for Shopper Contexts. */
export const ShopperContextsMutations = {
    /**
     * Creates the shopper's context based on shopperJWT.
     * @returns A TanStack Query mutation hook for interacting with the Shopper Contexts `createShopperContext` endpoint.
     * @see {@link https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-contexts?meta=createShopperContext| Salesforce Developer Center} for more information about the API endpoint.
     * @see {@link https://salesforcecommercecloud.github.io/commerce-sdk-isomorphic/classes/shoppercontexts.shoppercontexts-1.html#createshoppercontext | `commerce-sdk-isomorphic` documentation} for more information on the parameters and returned data type.
     * @see {@link https://tanstack.com/query/latest/docs/react/reference/useMutation | TanStack Query `useMutation` reference} for more information about the return value.
     */
    CreateShopperContext: 'createShopperContext',
    /**
     * Gets the shopper's context based on the shopperJWT.
     * @returns A TanStack Query mutation hook for interacting with the Shopper Contexts `deleteShopperContext` endpoint.
     * @see {@link https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-contexts?meta=deleteShopperContext| Salesforce Developer Center} for more information about the API endpoint.
     * @see {@link https://salesforcecommercecloud.github.io/commerce-sdk-isomorphic/classes/shoppercontexts.shoppercontexts-1.html#deleteshoppercontext | `commerce-sdk-isomorphic` documentation} for more information on the parameters and returned data type.
     * @see {@link https://tanstack.com/query/latest/docs/react/reference/useMutation | TanStack Query `useMutation` reference} for more information about the return value.
     */
    DeleteShopperContext: 'deleteShopperContext',
    /**
     * Updates the shopper's context based on the Shopper JWT. If the shopper context exists, it's updated with the patch body. If a customer qualifier or an `effectiveDateTime` is already present in the existing shopper context, its value is replaced by the corresponding value from the patch body. If a customer qualifers' value is set to `null` it's deleted from existing shopper context. If `effectiveDateTime` value is set to set to an empty string (\"\"), it's deleted from existing shopper context. If `effectiveDateTime` value is set to `null` it's ignored. If an `effectiveDateTime` or customer qualifiiers' value is new, it's added to the existing Shopper context.
     * @returns A TanStack Query mutation hook for interacting with the Shopper Contexts `updateShopperContext` endpoint.
     * @see {@link https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-contexts?meta=updateShopperContext| Salesforce Developer Center} for more information about the API endpoint.
     * @see {@link https://salesforcecommercecloud.github.io/commerce-sdk-isomorphic/classes/shoppercontexts.shoppercontexts-1.html#updateshoppercontext | `commerce-sdk-isomorphic` documentation} for more information on the parameters and returned data type.
     * @see {@link https://tanstack.com/query/latest/docs/react/reference/useMutation | TanStack Query `useMutation` reference} for more information about the return value.
     */
    UpdateShopperContext: 'updateShopperContext'
} as const

/** Mutation for Shopper Contexts. */
export type ShopperContextsMutation =
    (typeof ShopperContextsMutations)[keyof typeof ShopperContextsMutations]

export function useShopperContextsMutation<Mutation extends ShopperContextsMutation>(
    mutation: Mutation
): UseMutationResult<DataType<Client[Mutation]>, unknown, Argument<Client[Mutation]>> {
    const getCacheUpdates = cacheUpdateMatrix[mutation]
    // TODO: Remove this check when all mutations are implemented.
    if (!getCacheUpdates) throw new NotImplementedError(`The '${mutation}' mutation`)

    // The `Options` and `Data` types for each mutation are similar, but distinct, and the union
    // type generated from `Client[Mutation]` seems to be too complex for TypeScript to handle.
    // I'm not sure if there's a way to avoid the type assertions in here for the methods that
    // use them. However, I'm fairly confident that they are safe to do, as they seem to be simply
    // re-asserting what we already have.
    const {shopperContexts: client} = useCommerceApi()
    type Options = Argument<Client[Mutation]>
    type Data = DataType<Client[Mutation]>
    return useMutation({
        client,
        method: (opts: Options) => (client[mutation] as ApiMethod<Options, Data>)(opts),
        getCacheUpdates: getCacheUpdates as CacheUpdateGetter<MergedOptions<Client, Options>, Data>
    })
}
