import { gql } from 'graphql-request';

export const getUserInfo = gql`
  query {
    self {
      id
      name
      gender
    }
  }
`;

export const getUserMembershipInfo = gql`
  query ($urlname: String!) {
    groupByUrlname(urlname: $urlname) {
      id
      name
      isMember
      isOrganizer
    }
  }
`;

export const getUserHostedEvents = gql`
  query ($connectionInput: ConnectionInput!) {
    self {
      id
      hostedEvents(input: $connectionInput) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        count
        edges {
          node {
            title
            group {
              id
            }
          }
        }
      }
    }
  }
`;

export const getPastGroupEvents = gql`
  query ($urlname: String!, $connectionInput: ConnectionInput!) {
    groupByUrlname(urlname: $urlname) {
      id
      pastEvents(input: $connectionInput) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        count
        edges {
          node {
            title
            going
            maxTickets
            dateTime
            hosts {
              id
              name
            }
            status
            tickets(input: { first: 200 }) {
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              count
              edges {
                node {
                  status
                  user {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
