export interface ITab {
    icon: string;
    label: string;
    name: string;
    route: string;
}

export const tabs: ITab[] = [
    {
        icon: 'home',
        label: 'Home',
        name: 'home',
        route: '/home'
    },
    {
        icon: 'lock',
        label: 'Passcode',
        name: 'passcode',
        route: '/passcode'
    },
    {
        icon: 'groups',
        label: 'Meetings',
        name: 'meetings',
        route: '/meetings'
    },
    {
        icon: 'videocam',
        label: 'Recordings',
        name: 'recordings',
        route: '/recordings'
    },
    {
        icon: 'login',
        label: 'Accounts',
        name: 'accounts',
        route: '/accounts'
    }
];
