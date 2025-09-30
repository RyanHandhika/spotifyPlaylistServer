const filter = () => {
    return "*"
}

const ambilData = (data, next) => {
    try {
        throw new Error
    } catch (error) {
        return next(error)
    }
}

console.info(ambilData('anj', filter));
