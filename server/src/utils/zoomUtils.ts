// types
import { IZoomMeeting } from '../../../common/src/types';

export const hasPassword = (meeting: IZoomMeeting): boolean => {
    const { encrypted_password, h323_password, password, pstn_password } =
        meeting || {};
    const hasPassword = [
        encrypted_password,
        h323_password,
        password,
        pstn_password
    ].every((passwordProperty: string | undefined) => {
        return !!passwordProperty?.trim();
    });
    return hasPassword;
};
