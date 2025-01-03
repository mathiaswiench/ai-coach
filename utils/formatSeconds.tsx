import { intervalToDuration } from "date-fns";

const formatSeconds = (seconds: number): string => {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 })
    // { minutes: 30, seconds: 7 }

    const zeroPad = (num: number | undefined) => String(num).padStart(2, '0')

    return`${zeroPad(duration.minutes)}:${duration.seconds ? zeroPad(duration.seconds) : '00'}`
    // 30:07
};

export default formatSeconds;