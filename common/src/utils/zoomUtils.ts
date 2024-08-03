// types
import {
    IZoomMeeting,
    IZoomMeetingPatchRequestPayload,
    IZoomMeetingPostRequestData,
    IZoomMeetingPostRequestPayload
} from '../types';

export const mapToPatchRequestPayload = (
    meeting: IZoomMeeting = {} as IZoomMeeting
): IZoomMeetingPatchRequestPayload => {
    const {
        agenda,
        duration,
        id,
        password,
        recurrence,
        settings: {
            allow_multiple_devices,
            alternative_hosts_email_notification,
            alternative_hosts,
            approval_type,
            audio,
            auto_recording,
            breakout_room,
            close_registration,
            cn_meeting,
            contact_email,
            contact_name,
            encryption_type,
            enforce_login_domains,
            enforce_login,
            global_dial_in_countries,
            global_dial_in_numbers,
            host_video,
            in_meeting,
            jbh_time,
            join_before_host,
            meeting_authentication,
            mute_upon_entry,
            participant_video,
            registrants_confirmation_email,
            registrants_email_notification,
            registration_type,
            show_share_button,
            use_pmi,
            waiting_room,
            watermark
        } = {},
        start_time,
        timezone,
        topic,
        type
    } = meeting;
    const patchRequestPayload: IZoomMeetingPatchRequestPayload = {
        id: id?.toString(),
        data: {
            agenda,
            duration,
            password,
            recurrence,
            settings: {
                allow_multiple_devices,
                alternative_hosts_email_notification,
                alternative_hosts,
                approval_type,
                audio,
                auto_recording,
                breakout_room,
                close_registration,
                cn_meeting,
                contact_email,
                contact_name,
                encryption_type,
                enforce_login_domains,
                enforce_login,
                global_dial_in_countries,
                global_dial_in_numbers,
                host_video,
                in_meeting,
                jbh_time,
                join_before_host,
                meeting_authentication,
                mute_upon_entry,
                participant_video,
                registrants_confirmation_email,
                registrants_email_notification,
                registration_type,
                show_share_button,
                use_pmi,
                waiting_room,
                watermark
            },
            start_time,
            timezone,
            topic,
            type
        }
    };
    return patchRequestPayload;
};
export const mapToPostRequestPayload = (
    meetingPostRequestData: IZoomMeetingPostRequestData
): IZoomMeetingPostRequestPayload => {
    const { topic, password, recordToTheCloud, userId } =
        meetingPostRequestData;
    const postRequestPayload: IZoomMeetingPostRequestPayload = {
        userId,
        data: {
            agenda: topic,
            auto_recording: 'none',
            default_password: false,
            pre_schedule: false,
            schedule_for: userId,
            topic,
            type: 3
        }
    };
    if (password) {
        postRequestPayload.data.password = password;
        postRequestPayload.data.waiting_room = false;
    } else {
        postRequestPayload.data.waiting_room = true;
    }
    if (recordToTheCloud) {
        postRequestPayload.data.auto_recording = 'cloud';
    }
    return postRequestPayload;
};
export const getFormattedMeetingId = (
    meetingId: string | number
): string | null => {
    meetingId = meetingId?.toString()?.trim();
    if (!meetingId || meetingId.length !== 11) {
        return null;
    }
    const formattedMeetingId = `${meetingId.substring(
        0,
        3
    )} ${meetingId.substring(3, 7)} ${meetingId.substring(7)}`;
    return formattedMeetingId;
};
