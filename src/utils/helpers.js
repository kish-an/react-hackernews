export const formatUnixTimestamp = timestamp => {
    const date = new Date(timestamp * 1000);
    
    const dateFormatted = date.toLocaleDateString('en');

    const time = date.toLocaleTimeString('en').split(':');
    const suffix = time[2].replace(/^[\s\d]+/, '');
    const timeFormatted = `${time.splice(0, 2).join(':')} ${suffix}`;

    return [dateFormatted, timeFormatted];
}

