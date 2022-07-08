function isUndefined(variable) {
    return typeof variable === 'undefined';
}

function isDefined(variable) {
    return !isUndefined(variable);
}

function hasItems(array) {
    return isDefined(array) && array.length > 0;
}

export { isUndefined, isDefined, hasItems };