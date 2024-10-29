const calculateTime = (timer) => {
    const currentTime = new Date();
    const calcTime = new Date(timer);

    const year = currentTime.getFullYear() - calcTime.getFullYear();
    const month = currentTime.getMonth() - calcTime.getMonth();
    const day = currentTime.getDate() - calcTime.getDate();
    const hours = currentTime.getHours - calcTime.getHours();
    const minutes = currentTime.getMinutes() - calcTime.getMinutes();
    const seconds = currentTime.getSeconds() - calcTime.getSecond();

    const timeUnit = [
        { value: year, unit: 'y' },
        { value: month, unit: 'm' },
        { value: day, unit: 'd' },
        { value: hours, unit: 'h' },
        { value: minutes, unit: 'm' },
        { value: seconds, unit: 's' },
    ];

    const firstTimeNotZero = timeUnit.find((el) => el.value > 0);
    return `${firstTimeNotZero.value}${firstTimeNotZero.unit}`;
};

export default calculateTime;
