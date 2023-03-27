export interface PaginationInput {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
  reverse?: boolean;
}

interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface PaginatedData<TData> {
  count: number;
  edges: {
    node: TData;
  }[];
  pageInfo: PageInfo;
}

export interface GetUserInfoResponse {
  self: {
    gender: string;
    id: string;
    name: string;
  };
}

export interface GetUserMembershipInfoResponse {
  groupByUrlname: {
    id: string;
    isMember: boolean;
    isOrganizer: boolean;
    name: string;
  };
}

interface PastEvent {
  dateTime: string;
  going: number;
  hosts: {
    id: string;
    name: string;
  }[];
  maxTickets: number;
  title: string;
}

export interface GetPastEventsResponse {
  groupByUrlname: {
    id: string;
    pastEvents: PaginatedData<PastEvent>;
  };
}

export interface GetPastEventsInput {
  connectionInput: PaginationInput;
  urlname: string;
}
