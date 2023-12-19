import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Owner = {
  __typename?: 'Owner';
  login: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  repositories?: Maybe<Array<Maybe<Repository>>>;
  repositoryDetails?: Maybe<Repository>;
};


export type QueryRepositoriesArgs = {
  token: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryRepositoryDetailsArgs = {
  repoName: Scalars['String']['input'];
  token: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Repository = {
  __typename?: 'Repository';
  activeWebhooks?: Maybe<Scalars['Int']['output']>;
  diskUsage?: Maybe<Scalars['String']['output']>;
  fileCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: Owner;
  url: Scalars['String']['output'];
  visibility?: Maybe<Scalars['String']['output']>;
  ymlFileContent?: Maybe<Scalars['String']['output']>;
};

export type RepositoriesQueryVariables = Exact<{
  username: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type RepositoriesQuery = { __typename?: 'Query', repositories?: Array<{ __typename?: 'Repository', id: string, name: string, url: string, diskUsage?: string | null, visibility?: string | null, owner: { __typename?: 'Owner', login: string } } | null> | null };


export const RepositoriesDocument = gql`
    query Repositories($username: String!, $token: String!) {
  repositories(username: $username, token: $token) {
    id
    name
    url
    diskUsage
    visibility
    owner {
      login
    }
  }
}
    `;

/**
 * __useRepositoriesQuery__
 *
 * To run a query within a React component, call `useRepositoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRepositoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRepositoriesQuery({
 *   variables: {
 *      username: // value for 'username'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRepositoriesQuery(baseOptions: Apollo.QueryHookOptions<RepositoriesQuery, RepositoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RepositoriesQuery, RepositoriesQueryVariables>(RepositoriesDocument, options);
      }
export function useRepositoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepositoriesQuery, RepositoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RepositoriesQuery, RepositoriesQueryVariables>(RepositoriesDocument, options);
        }
export function useRepositoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RepositoriesQuery, RepositoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RepositoriesQuery, RepositoriesQueryVariables>(RepositoriesDocument, options);
        }
export type RepositoriesQueryHookResult = ReturnType<typeof useRepositoriesQuery>;
export type RepositoriesLazyQueryHookResult = ReturnType<typeof useRepositoriesLazyQuery>;
export type RepositoriesSuspenseQueryHookResult = ReturnType<typeof useRepositoriesSuspenseQuery>;
export type RepositoriesQueryResult = Apollo.QueryResult<RepositoriesQuery, RepositoriesQueryVariables>;