// code under test
import { mapToPatchRequestPayload } from '../zoomUtils';

// types
import { IZoomMeeting } from '../../types';

describe('zoomUtils', () => {
    describe('mapToPatchRequestPayload', () => {
        let meeting: IZoomMeeting;
        beforeEach(() => {
            meeting = {
                agenda: 'test meeting description',
                assistant_id: '',
                created_at: new Date().toISOString(),
                encrypted_password: 'encryptedpassword',
                h323_password: 'testpassword',
                host_email: 'testemail@testemail.com',
                host_id: 'testhostid',
                id: 123456789,
                join_url:
                    'https://us02web.zoom.us/j/ABCDEF123456?pwd=encryptedpassword',
                password: 'testpassword',
                pre_schedule: false,
                pstn_password: 'testpassword',
                settings: {
                    allow_multiple_devices: false,
                    alternative_hosts_email_notification: true,
                    alternative_hosts: '',
                    approval_type: 2,
                    approved_or_denied_countries_or_regions: {
                        enable: false
                    },
                    audio: 'both',
                    auto_recording: 'none',
                    breakout_room: {
                        enable: false
                    },
                    close_registration: false,
                    cn_meeting: false,
                    device_testing: false,
                    encryption_type: 'enhanced_encryption',
                    enforce_login_domains: '',
                    enforce_login: false,
                    global_dial_in_countries: ['US'],
                    global_dial_in_numbers: [],
                    host_video: true,
                    in_meeting: false,
                    jbh_time: 0,
                    join_before_host: false,
                    meeting_authentication: false,
                    mute_upon_entry: true,
                    participant_video: true,
                    registrants_confirmation_email: true,
                    registrants_email_notification: true,
                    request_permission_to_unmute_participants: false,
                    show_share_button: false,
                    use_pmi: false,
                    waiting_room: false,
                    watermark: false
                },
                start_url: 'https://us02web.zoom.us/s/ABCDEF123456',
                status: 'waiting',
                timezone: 'America/New_York',
                topic: 'Test Meeting',
                type: 3,
                uuid: 's/ABCDEF123456'
            };
        });
        it('should map a meeting to a patch request payload', () => {
            const result = mapToPatchRequestPayload(meeting);
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
                },
                start_time,
                timezone,
                topic,
                type
            } = meeting;
            expect(result).toEqual({
                id: id.toString(),
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
            });
        });
        it('should handle a falsy argument', () => {
            meeting = undefined;
            const result = mapToPatchRequestPayload(meeting);
            expect(result).toEqual({
                id: undefined,
                data: {
                    agenda: undefined,
                    duration: undefined,
                    password: undefined,
                    recurrence: undefined,
                    settings: {
                        allow_multiple_devices: undefined,
                        alternative_hosts_email_notification: undefined,
                        alternative_hosts: undefined,
                        approval_type: undefined,
                        audio: undefined,
                        auto_recording: undefined,
                        breakout_room: undefined,
                        close_registration: undefined,
                        cn_meeting: undefined,
                        contact_email: undefined,
                        contact_name: undefined,
                        encryption_type: undefined,
                        enforce_login_domains: undefined,
                        enforce_login: undefined,
                        global_dial_in_countries: undefined,
                        global_dial_in_numbers: undefined,
                        host_video: undefined,
                        in_meeting: undefined,
                        jbh_time: undefined,
                        join_before_host: undefined,
                        meeting_authentication: undefined,
                        mute_upon_entry: undefined,
                        participant_video: undefined,
                        registrants_confirmation_email: undefined,
                        registrants_email_notification: undefined,
                        registration_type: undefined,
                        show_share_button: undefined,
                        use_pmi: undefined,
                        waiting_room: undefined,
                        watermark: undefined
                    },
                    start_time: undefined,
                    timezone: undefined,
                    topic: undefined,
                    type: undefined
                }
            });
        });
    });
});
