// externals
import { Request, Response } from 'express';
import express from 'express';
// types
import {
    IZoomMeetingRecordingFileData,
    IZoomMeetingRecordingResponse,
    IZoomMeetingRecordingsResponseItem,
    TZoomMeetingRecordingsResponseData
} from '../../../common/src';
// utils
import { getFormattedTimestamp, getRequest } from '../../../common/src';
import { AccountHelper, getUrl, handleError } from '../utils';

interface IRecordingsRequestQuery {
    search?: string;
    timestamp?: string;
}

export const requestRecordings = async (
    req: Request<null, null, null, IRecordingsRequestQuery>,
    res: Response<TZoomMeetingRecordingsResponseData>
) => {
    try {
        let { search, timestamp } = req.query;
        search = search?.trim();
        timestamp = getFormattedTimestamp(timestamp);
        const accountHelper = await AccountHelper.requestInstanceOf();
        const token = await accountHelper.requestToken();
        const userId = accountHelper.getCurrentUserId();
        const meetingRecordings =
            await getRequest<IZoomMeetingRecordingResponse>({
                method: 'GET',
                token,
                url: getUrl(`users/${userId}/recordings?from=${timestamp}`)
            });
        let recordingsData: TZoomMeetingRecordingsResponseData = [];
        for (const meeting of meetingRecordings.data?.meetings ?? []) {
            const { recording_files, recording_play_passcode, topic } = meeting;
            if (search && !topic.includes(search)) {
                continue;
            }
            for (const recording of recording_files) {
                if (recording.file_type === 'MP4') {
                    const {
                        download_url,
                        play_url,
                        recording_end,
                        recording_start
                    } = recording;
                    const recordingsDataItem: IZoomMeetingRecordingsResponseItem =
                        {
                            download_url: `${download_url}?access_token=${token}`,
                            play_url: !!recording_play_passcode
                                ? `${play_url}?pwd=${recording_play_passcode}`
                                : play_url,
                            recording_end,
                            recording_start,
                            topic
                        };
                    recordingsData = [recordingsDataItem, ...recordingsData];
                }
            }
        }
        recordingsData.sort(
            (
                a: IZoomMeetingRecordingFileData,
                b: IZoomMeetingRecordingFileData
            ) => {
                return (
                    new Date(b.recording_start).getTime() -
                    new Date(a.recording_start).getTime()
                );
            }
        );
        res.send(recordingsData);
    } catch (error) {
        const testError = new EvalError('what what what');
        handleError(testError, res);
    }
};
export const getRecordingRoutes = () => {
    const router = express.Router();
    router.get(
        '/',
        (
            req: Request<null, null, null, IRecordingsRequestQuery>,
            res: Response
        ) => void requestRecordings(req, res)
    );
    return router;
};
