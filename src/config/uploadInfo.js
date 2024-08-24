import { RatioIcon, ResolutionIcon, CameraVideoIcon, VideoFileIcon } from '~/components/Icons';

//Uppercase first to render like react element
const UploadInfo = [
    {
        icon: <CameraVideoIcon width="2.4rem" height="2.4rem" />,
        header: 'Size and duration',
        desc: 'Maximum size: 10 GB, video duration: 60 minutes.',
    },
    {
        icon: <VideoFileIcon width="2rem" height="2rem" />,
        header: 'File formats',
        desc: 'Recommended: “.mp4”. Other major formats are supported.',
    },
    {
        icon: <ResolutionIcon width="2.4rem" height="2.4rem" />,
        header: 'Video resolutions',
        desc: 'Minimum resolution: 720p. 2K and 4K are supported.',
    },
    {
        icon: <RatioIcon width="2rem" height="2rem" />,
        header: 'Aspect ratios',
        desc: 'Recommended: 16:9 for landscape, 9:16 for vertical.',
    },
];

export default UploadInfo;
