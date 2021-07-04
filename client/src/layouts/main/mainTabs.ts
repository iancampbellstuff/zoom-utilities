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
    }
];
