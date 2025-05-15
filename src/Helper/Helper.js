
export const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const isEmpty = (value) => {
    // Check if value is null or undefined
    if (value == null) {
        return true;
    }

    // Check if value is an empty string
    if (typeof value === 'string') {
        return value.trim() === ''; // empty string or string with only spaces
    }

    // Check if value is 0 or NaN (numeric zero or NaN)
    if (typeof value === 'number') {
        return value === 0 || isNaN(value); // 0 or NaN is considered empty
    }

    // Check if value is false (boolean)
    if (typeof value === 'boolean') {
        return !value; // false is considered empty
    }

    // Check if value is an empty array
    if (Array.isArray(value)) {
        return value.length === 0; // empty array
    }

    // Check if value is an empty object
    if (typeof value === 'object') {
        return Object.keys(value).length === 0; // empty object
    }

    // For any other type (e.g., function, date), return false
    return false;
}

export const isIntegerAndBinary = (value) => {
    return typeof value === 'number' && value % 1 === 0 && (value === 0 || value === 1);
}