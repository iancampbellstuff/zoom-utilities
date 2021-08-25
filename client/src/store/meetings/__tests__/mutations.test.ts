// code under test
import mutations from '../mutations';

// types
import { IMeetingsState } from '../state';

describe('mutations', () => {
    let state: IMeetingsState;
    beforeEach(() => {
        state = {
            currentUserId: 'testemail@testemail.com',
            meetings: [
                {
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
                }
            ],
            search: 'Test',
            userIds: ['testemail@testemail.com']
        };
    });
    describe('resetAll', () => {
        it('should reset all state values', () => {
            (mutations as any).resetAll(state);
            expect(state).toEqual({});
        });
    });
    describe('resetCurrentUserId', () => {
        it('should reset state value', () => {
            (mutations as any).resetCurrentUserId(state);
            expect(state.currentUserId).toBeUndefined();
        });
    });
    describe('resetMeetings', () => {
        it('should reset state value', () => {
            (mutations as any).resetMeetings(state);
            expect(state.meetings).toBeUndefined();
        });
    });
    describe('resetSearch', () => {
        it('should reset state value', () => {
            (mutations as any).resetSearch(state);
            expect(state.search).toBeUndefined();
        });
    });
    describe('resetUserIds', () => {
        it('should reset state value', () => {
            (mutations as any).resetUserIds(state);
            expect(state.userIds).toBeUndefined();
        });
    });
    describe('setCurrentUserId', () => {
        let currentUserId: number;
        beforeEach(() => {
            currentUserId = 2;
        });
        it('should set state value', () => {
            expect(state.currentUserId).not.toEqual(currentUserId);
            (mutations as any).setCurrentUserId(state, currentUserId);
            expect(state.currentUserId).toEqual(currentUserId);
        });
    });
    describe('setMeetings', () => {
        let meetings: number;
        beforeEach(() => {
            meetings = 2;
        });
        it('should set state value', () => {
            expect(state.meetings).not.toEqual(meetings);
            (mutations as any).setMeetings(state, meetings);
            expect(state.meetings).toEqual(meetings);
        });
    });
    describe('setSearch', () => {
        let search: number;
        beforeEach(() => {
            search = 2;
        });
        it('should set state value', () => {
            expect(state.search).not.toEqual(search);
            (mutations as any).setSearch(state, search);
            expect(state.search).toEqual(search);
        });
    });
});
