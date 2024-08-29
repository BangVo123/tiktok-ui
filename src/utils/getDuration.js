const getDuration = (file) =>
    new Promise((resolve, reject) => {
        var video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function () {
            window.URL.revokeObjectURL(file);

            resolve(video.duration);
        };

        video.src = URL.createObjectURL(
            new Blob([file], { type: 'video/mp4' }),
        );
    });

const convertDuration = (duration) => {
    if (duration < 60) return `${Math.floor(duration)}s`;
    else {
        const minute = Math.floor(duration / 60);
        const second = Math.floor(duration - minute * 60);
        return `${minute}m ${second}s`;
    }
};

export { getDuration, convertDuration };
