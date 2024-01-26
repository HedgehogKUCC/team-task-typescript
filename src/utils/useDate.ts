// 計算住宿天數
export const calculateNight = (
    checkInDate: string,
    checkOutDate: string,
): number => {
    const startDate: Date = new Date(checkInDate);
    const endDate: Date = new Date(checkOutDate);
    const timeDifference: number = endDate.getTime() - startDate.getTime();

    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
};

// 日期格式化
export const dateTimeFormate = (datetime: string) => {
    return new Date(datetime).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        weekday: "long",
        year: "numeric",
    });
};
