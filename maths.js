const factorial = (n) => {
    let res = 1
    for (let i = 1; i <= n; i++)
	res *= i;
    return res;
}

const binCoeff = (n, k) => {
    return factorial(n) / (factorial(k) * factorial(n-k));
}

exports.factorial = factorial;
exports.binCoeff = binCoeff;
