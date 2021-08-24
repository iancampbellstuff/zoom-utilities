// code under test
import { hasPassword } from '../zoomUtils';

// types
import { IZoomMeeting } from '../../../../common/src';

describe('zoomUtils', () => {
    describe('hasPassword', () => {
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
                    waiting_room: true,
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
        it('should return true', () => {
            const result = hasPassword(meeting);
            expect(result).toBe(true);
        });
        it('should return false if encrypted_password is falsy', () => {
            delete meeting.encrypted_password;
            const result = hasPassword(meeting);
            expect(result).toBe(false);
        });
        it('should return false if h323_password is falsy', () => {
            delete meeting.h323_password;
            const result = hasPassword(meeting);
            expect(result).toBe(false);
        });
        it('should return false if password is falsy', () => {
            delete meeting.password;
            const result = hasPassword(meeting);
            expect(result).toBe(false);
        });
        it('should return false if pstn_password is falsy', () => {
            delete meeting.pstn_password;
            const result = hasPassword(meeting);
            expect(result).toBe(false);
        });
        it('should handle a falsy argument', () => {
            meeting = undefined;
            const result = hasPassword(meeting);
            expect(result).toBe(false);
        });
    });
});
