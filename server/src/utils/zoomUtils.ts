// types
import { IZoomMeeting } from '@zoom-utilities/common/src/types';

export const hasPassword = (meeting: IZoomMeeting): boolean => {
    const { encrypted_password, h323_password, password, pstn_password } =
        meeting || {};
    const hasPassword = [
        encrypted_password,
        h323_password,
        password,
        pstn_password
    ].every((passwordProperty: string) => {
        return !!passwordProperty?.trim();
    });
    return hasPassword;
};
