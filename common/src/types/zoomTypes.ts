//#region IZoomMeeting
export type TZoomMeetingStatus = 'available' | 'started' | 'waiting';
export interface IZoomMeetingOccurrence {
    duration: number;
    occurrence_id: string;
    start_time: string;
    status: TZoomMeetingStatus;
}
export interface IZoomMeetingRecurrence {
    end_date_time: string;
    repeat_interval: number;
    type: number;
    weekly_days: string;
}
export interface IZoomMeetingApprovedOrDeniedCountriesOrRegions {
    enable: boolean;
}
export type TZoomMeetingAudio = 'both' | 'telephony' | 'voip';
export type TZoomMeetingAutoRecording = 'cloud' | 'local' | 'none';
export type TZoomMeetingEncryptionType = 'enhanced_encryption' | string;
export interface IZoomMeetingBreakoutRoom {
    enable: boolean;
}
export interface IZoomMeetingGlobalDialInNumber {
    city: string;
    country_name: string;
    country: string;
    number: string;
    type: string;
}
export interface IZoomMeetingSettings {
    allow_multiple_devices: boolean;
    alternative_hosts_email_notification: boolean;
    alternative_hosts: string;
    approval_type: number;
    approved_or_denied_countries_or_regions: IZoomMeetingApprovedOrDeniedCountriesOrRegions;
    audio: TZoomMeetingAudio;
    auto_recording: TZoomMeetingAutoRecording;
    breakout_room: IZoomMeetingBreakoutRoom;
    close_registration: boolean;
    cn_meeting: boolean;
    contact_email?: string;
    contact_name?: string;
    device_testing: boolean;
    encryption_type: TZoomMeetingEncryptionType;
    enforce_login_domains: string;
    enforce_login: boolean;
    global_dial_in_countries: string[];
    global_dial_in_numbers: IZoomMeetingGlobalDialInNumber[];
    host_video: boolean;
    in_meeting: boolean;
    jbh_time: number;
    join_before_host: boolean;
    meeting_authentication: boolean;
    mute_upon_entry: boolean;
    participant_video: boolean;
    registrants_confirmation_email: boolean;
    registrants_email_notification: boolean;
    registration_type?: number;
    request_permission_to_unmute_participants: boolean;
    show_share_button: boolean;
    use_pmi: boolean;
    waiting_room: boolean;
    watermark: boolean;
}
export interface IZoomMeetingBase {
    duration?: number;
    host_email: string;
    host_id: string;
    id: number;
    password?: string;
    start_time?: string;
    timezone: string;
    topic: string;
    type: number;
    uuid: string;
}
export interface IZoomMeeting extends IZoomMeetingBase {
    agenda: string;
    assistant_id: string;
    created_at: string;
    encrypted_password?: string;
    h323_password?: string;
    join_url: string;
    occurrences?: IZoomMeetingOccurrence[];
    pre_schedule?: boolean;
    pstn_password?: string;
    recurrence?: IZoomMeetingRecurrence;
    registration_url?: string;
    settings: IZoomMeetingSettings;
    start_url: string;
    status: TZoomMeetingStatus;
}
//#endregion IZoomMeeting

//#region IZoomMeetingPatch
export interface IZoomMeetingTrackingFieldsPatch {
    field?: string;
    value?: string;
}
export interface IZoomMeetingRecurrencePatch {
    end_date_time?: string;
    end_times?: number;
    monthly_day?: number;
    monthly_week_day?: number;
    monthly_week?: number;
    repeat_interval?: number;
    type?: number;
    weekly_days?: string;
}
export interface IZoomMeetingGlobalDialInNumbersPatch {
    city?: string;
    country_name?: string;
    country?: string;
    number?: string;
    type?: string;
}
export interface IZoomMeetingApprovedOrDeniedCountriesOrRegionsPatch {
    approved_list?: string[];
    denied_list?: string[];
    enable?: boolean;
    method?: string;
}
export interface IZoomMeetingAuthenticationExceptionPatch {
    email?: string;
    name?: string;
}
export interface IZoomMeetingBreakoutRoomParticipantsPatch {
    name?: string;
    participants?: string[];
}
export interface IZoomMeetingBreakoutRoomPatch {
    enable?: boolean;
}
export interface IZoomMeetingLanguageInterpretationInterpretersPatch {
    email?: string;
    languages?: string;
}
export interface IZoomMeetingLanguageInterpretationPatch {
    enable?: boolean;
    interpreters?: IZoomMeetingLanguageInterpretationInterpretersPatch[];
}
export interface IZoomMeetingCustomKeysPatch {
    key?: string;
    value?: string;
}
export interface IZoomMeetingSettingsPatch {
    allow_multiple_devices?: boolean;
    alternative_hosts_email_notification?: boolean;
    alternative_hosts?: string;
    approval_type?: number;
    approved_or_denied_countries_or_regions?: IZoomMeetingApprovedOrDeniedCountriesOrRegionsPatch[];
    audio?: TZoomMeetingAudio;
    authentication_domains?: string;
    authentication_exception?: IZoomMeetingAuthenticationExceptionPatch[];
    authentication_name?: string;
    authentication_option?: string;
    auto_recording?: TZoomMeetingAutoRecording;
    breakout_room?: IZoomMeetingBreakoutRoomPatch;
    close_registration?: boolean;
    cn_meeting?: boolean;
    contact_email?: string;
    contact_name?: string;
    custom_keys?: IZoomMeetingCustomKeysPatch[];
    encryption_type?: string;
    enforce_login_domains?: string;
    enforce_login?: boolean;
    global_dial_in_countries?: string[];
    global_dial_in_numbers?: IZoomMeetingGlobalDialInNumbersPatch[];
    host_video?: boolean;
    in_meeting?: boolean;
    jbh_time?: number;
    join_before_host?: boolean;
    language_interpretation?: IZoomMeetingLanguageInterpretationPatch;
    meeting_authentication?: boolean;
    mute_upon_entry?: boolean;
    participant_video?: boolean;
    registrants_confirmation_email?: boolean;
    registrants_email_notification?: boolean;
    registration_type?: number;
    show_share_button?: boolean;
    use_pmi?: boolean;
    waiting_room?: boolean;
    watermark?: boolean;
}
export interface IZoomMeetingPatch {
    agenda?: string;
    duration?: number;
    password?: string;
    recurrence?: IZoomMeetingRecurrencePatch;
    schedule_for?: string;
    settings?: IZoomMeetingSettingsPatch;
    start_time?: string;
    template_id?: string;
    timezone?: string;
    topic?: string;
    tracking_fields?: IZoomMeetingTrackingFieldsPatch[];
    type?: number;
}
export interface IZoomMeetingPatchRequestPayload {
    id: string;
    data: IZoomMeetingPatch;
}
//#endregion IZoomMeetingPatch

//#region IZoomMeetingPost
export interface IZoomMeetingPostRequestData {
    password: string;
    recordToTheCloud: boolean;
    topic: string;
    userId: string;
}
export interface IZoomMeetingPost {
    agenda: string;
    auto_recording?: 'cloud';
    default_password: false;
    password?: string;
    pre_schedule: false;
    schedule_for: string;
    topic: string;
    type: 3;
}
export interface IZoomMeetingPostRequestPayload {
    userId: string;
    data: IZoomMeetingPost;
}
//#endregion IZoomMeetingPost

//#region IZoomMeetingRecording
export type TZoomMeetingRecordingFileType = 'M4A' | 'MP4';
export type TZoomMeetingRecordingFileStatus = 'completed';
export type TZoomMeetingRecordingType =
    | 'audio_only'
    | 'shared_screen_with_speaker_view';
export interface IZoomMeetingRecordingFileData {
    download_url: string;
    recording_end: string;
    recording_start: string;
}
export interface IZoomMeetingRecordingFile
    extends IZoomMeetingRecordingFileData {
    file_extension: TZoomMeetingRecordingFileType;
    file_size: number;
    file_type: TZoomMeetingRecordingFileType;
    id: string;
    meeting_id: string;
    play_url: string;
    recording_type: TZoomMeetingRecordingType;
    status: TZoomMeetingRecordingFileStatus;
}
export interface IZoomMeetingRecording extends IZoomMeetingBase {
    account_id: string;
    recording_count: number;
    recording_files: IZoomMeetingRecordingFile[];
    recording_play_passcode: string;
    share_url: string;
    total_size: number;
}
export interface IZoomMeetingRecordingResponse {
    from: string;
    meetings: IZoomMeetingRecording[];
    next_page_token: string;
    page_count: number;
    page_size: number;
    to: string;
    total_records: number;
}
export interface IZoomMeetingRecordingsResponseItem
    extends IZoomMeetingRecordingFileData {
    play_url: string;
    topic: string;
}
export type TZoomMeetingRecordingsResponseData =
    IZoomMeetingRecordingFileData[];
//#endregion IZoomMeetingRecording
