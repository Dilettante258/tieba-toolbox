/* eslint-disable @typescript-eslint/no-explicit-any */


/**
 * 创建一个防抖函数，该函数在指定的延迟时间内只执行最后一次调用。
 * @param func 要防抖的函数。
 * @param delay 延迟时间（毫秒）。
 * @returns 防抖后的函数。
 */
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
            timer = null;
        }, delay);
    };
}

/**
 * 创建一个节流函数，该函数在指定的时间间隔内只执行一次。
 * @param func 要节流的函数。
 * @param limit 时间间隔（毫秒）。
 * @returns 节流后的函数。
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

