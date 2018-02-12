interface Owner{
  username:string;
  realName: string;
}

export class GetInfoResponse{
  owner: Owner;
  farm: number;
  server: number;
  secret: string;
  id: number;
  url: string;
}
