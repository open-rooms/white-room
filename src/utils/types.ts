export enum StorageKeys {
  PRIVATE_KEY = 'private_key',
  PUBLIC_KEY = 'public_key',
}
export interface IStorageContext {
  accountConnected: boolean;
  publicKey: string;
  privateKey: string;
}
export interface IButtonProps {
  title: string;
  onPress(): void;
  buttonColor: string;
  titleColor: string;
  buttonStyle: any;
  disabled?: boolean;
  isLoading?: boolean;
}
export interface IBackButton {
  color: string;
  style?: object;
}
export interface IRoom {
  id: string;
  name: string;
  about: string;
  creator: IUser; // is the id generated by nostr event when creating username
  start_date: number;
  members: string[]; // is the id generated by nostr event when creating username
}

export interface IProposal {
  id: string;
  proposal: string;
  start_date: Date;
  duration: number;
  status: ProposalStatus;
  room: string;
  creator: string;
}
export enum ProposalStatus {
  LIVE = 'Live',
  PASSED = 'Passed',
  REJECTED = 'Rejected',
}
export interface IUser {
  id: string; // is the id generated by nostr event
  pubKey: string;
  profilePicUrl: string;
  username: string;
  damus?: string;
}

export interface IEvent {
  id: string;
  content: string;
  tags: string[][];
}
export interface EditRoomProps {
  room: IRoom;
  onUpdate: (updatedRoom: IRoom) => void;
}
export type RootStackParamList = {
  Welcome: undefined;
  Eula: undefined;
  CreateAccount: undefined;
  Login: undefined;
  Rooms: undefined;
  Room: {roomId: string};
  Profile: undefined;
  Proposal: {proposal: any};
  EditRoom: {
    room: IRoom;
    onUpdate: (updatedRoom: IRoom) => void;
  };
  EditProfile: undefined;
  GenerateKeys: undefined;
};
